import React from "react";
import { DataTable, DataTableValueArray } from "primereact/datatable";
import type {  DataTableProps } from "primereact/datatable";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export interface PDatatable {
  children?: React.ReactNode;
  value : DataTableValueArray | undefined
}

const Datatable: React.FC<PDatatable> = ({value , children}) => {
  return (
    <React.Fragment>
      <DataTable className='text-xs w-full' value={value}>
        {children}
      </DataTable>
    </React.Fragment>
  );
};

export default Datatable;
