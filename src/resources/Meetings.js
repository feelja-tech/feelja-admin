import { default as React } from "react";
import {
  Datagrid,
  DateField,
  Edit,
  List,
  required,
  SimpleForm,
  TextField,
} from "react-admin";
import { JsonInput } from "react-admin-json-view";

export const MeetingsList = (props) => (
  <List {...props} perPage={25} sort={{ field: "updated_at", order: "ASC" }}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="happensAt" />
      <TextField source="finalizedAt" />
      <DateField source="location" />
      <DateField source="videoCall" />
      <DateField source="insertedAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

export const MeetingsEdit = ({ onCancel, ...props }) => (
  <Edit title=" " {...props}>
    <SimpleForm>
      <JsonInput
        helperText="Required keys: name: string, latitude: string, longitude: string, image: string"
        source="location"
        validate={[required()]}
        jsonString={false} // Set to true if the value is a string, default: false
        reactJsonOptions={{
          // Props passed to react-json-view
          name: null,
          collapsed: true,
          enableClipboard: true,
          displayDataTypes: true,
        }}
      />
    </SimpleForm>
  </Edit>
);
