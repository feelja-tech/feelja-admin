require("dotenv").config();
const express = require("express");
const postgraphile = require("postgraphile").postgraphile;
const path = require("path");
const app = express();
const basicAuth = require("express-basic-auth");

const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");
const PgConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const PostGraphileFulltextFilterPlugin = require("postgraphile-plugin-fulltext-filter");

const makeWrapResolversPlugin = require("graphile-utils")
  .makeWrapResolversPlugin;

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: "eu-west-1",
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const S3PresignedPlugin = makeWrapResolversPlugin(
  (context) => {
    if (context.scope.fieldName.includes("userFile")) {
      return { scope: context.scope };
    }
    return null;
  },
  ({ scope }) => async (resolver, user, args, context, _resolveInfo) => {
    let tmp = await resolver();

    if (tmp.data)
      tmp.data = tmp.data.map((d) => {
        const val = d["@nodes"];

        return {
          "@nodes": {
            ...val,
            id: s3.getSignedUrl("getObject", {
              Bucket: "sophia-user-media-prod",
              Key: val.id,
              Expires: 60, //seconds
            }),
          },
        };
      });

    return tmp;
  }
);

const options = {
  pgSettings(req) {
    return {
      "graphile.test.x-user-id":
        req.headers["x-user-id"] ||
        (req.normalizedConnectionParams &&
          req.normalizedConnectionParams["x-user-id"]),
    };
  },
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  subscriptions: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  allowExplain: true,
  legacyRelations: "omit",
  exportGqlSchemaPath: `${__dirname}/schema.graphql`,
  sortExport: true,
  appendPlugins: [
    PgSimplifyInflectorPlugin,
    PgConnectionFilterPlugin,
    PostGraphileFulltextFilterPlugin,
    S3PresignedPlugin,
  ],
};

app.use(
  basicAuth({
    users: { [process.env.AUTH_USERNAME]: process.env.AUTH_PASSWORD },
    challenge: true,
    realm: "nudge-admin",
    unauthorizedResponse: () => {
      return "No no no";
    },
  })
);

app.use(express.static(path.join(__dirname, "build")));

app.use(postgraphile(process.env.DATABASE_URL, ["public"], options));

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 9000;
app.listen(port, () => {
  console.log("Running on http://localhost:" + port);
});
