import React, { useEffect, useState, useMemo } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject as ChartInject,
  LineSeries,
  DateTime,
  Tooltip,
  Legend,
} from "@syncfusion/ej2-react-charts";

import { customersGrid } from "../data/dummy";
import { getCustomers, getTransactions } from "../services/api";
import { Header } from "../components";
import Loading from "../components/Loading";

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dailyTransactions, setDailyTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerData, transactionData] = await Promise.all([
          getCustomers(),
          getTransactions()
        ]);
        setCustomers(customerData);
        setTransactions(transactionData);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const transactionPerCustomer = useMemo(() => {
    if (customers.length > 0 && transactions.length > 0) {
      return transactions.map((transaction) => {
        const customer = customers.find(
          (cust) => cust.CustomerID === transaction.Customer_ID
        );
        return { ...transaction, ...customer };
      });
    }
    return [];
  }, [customers, transactions]);

  console.log(transactionPerCustomer)


  useEffect(() => {
    if (selectedCustomer) {
      const selectedCustomerId = selectedCustomer.Customer_ID;
      const selectedCustomerTransactions = transactions.filter(
        (trans) => trans.Customer_ID === selectedCustomerId
      );

      const transactionsPerDay = selectedCustomerTransactions.reduce(
        (acc, curr) => {
          const date = new Date(curr.TransactionDate).toLocaleDateString();
          acc[date] = (acc[date] || 0) + curr.TransactionAmount;
          return acc;
        },
        {}
      );

      const dailyData = Object.keys(transactionsPerDay).map((date) => ({
        date: new Date(date),
        totalAmount: transactionsPerDay[date],
      }));

      setDailyTransactions(dailyData);
    } else {
      setDailyTransactions([]);
    }
  }, [selectedCustomer, transactions]);

  const handleRowSelected = (args) => {
    setSelectedCustomer(args.data);
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={transactionPerCustomer}
        rowSelected={handleRowSelected}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Search, Page, Selection, Toolbar, Edit, Sort, Filter]}
        />
      </GridComponent>

      {selectedCustomer && dailyTransactions.length > 0 &&(
        <div className="mt-10">
          <Header
            category="Transaction Amount Per Day for"
            title={selectedCustomer.CustomerName}
          />
          <ChartComponent
            primaryXAxis={{ valueType: "DateTime", labelFormat: "yy MMM dd" }}
            // eslint-disable-next-line no-template-curly-in-string
            primaryYAxis={{ labelFormat: "${value}" }}
            tooltip={{ enable: true }}
          >
            <ChartInject services={[LineSeries, DateTime, Tooltip, Legend]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={dailyTransactions}
                xName="date"
                yName="totalAmount"
                type="Line"
                name="Total Amount"
                marker={{ visible: true }}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      )}
    </div>
  );
};

export default Customers;
