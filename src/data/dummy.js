import React from "react";
import { RiContactsLine} from "react-icons/ri";


// Customer Grid
const CustomerGridName = (customers) => (
  <div>
      <p>{customers.CustomerName}</p>

  </div>
);

const TransactionAmountGrid = (transaction) => (
  <div>
    <p>{transaction.TransactionAmount}</p>
  </div>
);

const TransactionDateGrid = (transaction) => (
  <div>
    <p>{transaction.TransactionDate}</p>
  </div>
);

export const customersGrid = [
  {
    field: "Customer_ID",
    headerText: "ID",
    width: "50",
    textAlign: "Center",
    isPrimaryKey: true,
  },
  {
    field: "CustomerName",
    headerText: "Name",
    width: "100",
    template: CustomerGridName,
    textAlign: "Center",
  },
  {
    field: "TransactionAmount",
    headerText: "Trans Amount",
    width: "100",
    template: TransactionAmountGrid,
    textAlign: "Center",
  },
  {
    field: "TransactionDate",
    headerText: "Trans Date",
    width: "100",
    template: TransactionDateGrid,
    textAlign: "Center",
  },
];

export const links = [
  {
    title: "Pages",
    links: [
      {
        name: "customers",
        icon: <RiContactsLine />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];
