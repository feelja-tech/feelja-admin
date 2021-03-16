import React, { cloneElement } from "react";
import {
  TopToolbar,
  Button,
  sanitizeListRestProps,
  useListContext,
} from "react-admin";

export const UserActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;

  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = useListContext();

  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button",
        })}
    </TopToolbar>
  );
};
