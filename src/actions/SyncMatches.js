import * as React from "react";
import { TopToolbar, Button, sanitizeListRestProps } from "react-admin";
import SyncIcon from "@material-ui/icons/Sync";

const handleSync = () => {};

export const SyncMatches = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;

  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      <Button onClick={handleSync} label="Sync Matches">
        <SyncIcon />
      </Button>
    </TopToolbar>
  );
};
