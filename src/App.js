import { useApolloClient } from "@apollo/client";
import FaceIcon from "@material-ui/icons/Face";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import MapIcon from "@material-ui/icons/Map";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonIcon from "@material-ui/icons/Person";
import pgDataProvider from "ra-postgraphile";
import React, { useEffect, useState } from "react";
import { Admin, Resource, ShowGuesser } from "react-admin";
import { MatchesEdit, MatchesList } from "./resources/Matches";
import { UserList } from "./resources/User";
import { MeetingsList, MeetingsEdit } from "./resources/Meetings";

import { UserfileList } from "./resources/UserFile";
import { UserprofileEdit, UserprofileList } from "./resources/UserProfile";

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    pgDataProvider(client)
      .then((dataProvider) => {
        setDataProvider(() => dataProvider);
      })
      .catch(console.error);
  }, []);

  return dataProvider ? (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="users"
        list={UserList}
        show={ShowGuesser}
        icon={PersonIcon}
      />
      <Resource
        name="userProfiles"
        list={UserprofileList}
        edit={UserprofileEdit}
        icon={FaceIcon}
      />
      <Resource
        name="userFiles"
        list={UserfileList}
        icon={InsertDriveFileIcon}
      />
      <Resource
        name="matches"
        list={MatchesList}
        edit={MatchesEdit}
        icon={PeopleAltIcon}
      />
      <Resource
        name="meetings"
        list={MeetingsList}
        show={ShowGuesser}
        icon={MapIcon}
        edit={MeetingsEdit}
      />
    </Admin>
  ) : (
    "Loading"
  );
};
export default App;
