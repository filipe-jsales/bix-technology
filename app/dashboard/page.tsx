"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import transactionsData from "./transactions.json";
import SummaryCard from "../components/summaryCard";
import StackedBarChart from "../components/charts/stackedBarChart";
import LineChart from "../components/charts/rowBarChart";
import StackedBarChartByState from "../components/charts/StackedBarChartByState";
import DoughnutChartByIndustry from "../components/charts/DoughnutChartByIndustry";
import HorizontalBarChartByAccount from "../components/charts/HorizontalBarChartByAccount";

const DashboardPage = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState(0);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    account: "",
    industry: "",
    state: "",
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/login");
    } else {
      setTransactions(transactionsData); 
      setFilteredTransactions(transactionsData); 
    }
  }, [router]);

  useEffect(() => {
    calculateSummary(transactionsData);
  }, []);

  const calculateSummary = (transactions) => {
    const income = transactions
      .filter((transaction) => transaction.transaction_type === "deposit")
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const expenses = transactions
      .filter((transaction) => transaction.transaction_type === "withdraw")
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const pending = transactions.length;

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setBalance(income - expenses);
    setPendingTransactions(pending);
  };

  const barData = {
    labels: ["Deposits", "Withdrawals"],
    datasets: [
      {
        label: "Deposits",
        data: [totalIncome],
        backgroundColor: "#4CAF50",
      },
      {
        label: "Withdrawals",
        data: [totalExpenses],
        backgroundColor: "#F44336",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Stacked Bar Chart" },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  const lineData = {
    labels: filteredTransactions.map((t) =>
      new Date(t.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Amount",
        data: filteredTransactions.map((t) => t.amount),
        fill: false,
        backgroundColor: "#2196F3",
        borderColor: "#2196F3",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Line Chart" },
    },
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    if (filters.startDate) {
      filtered = filtered.filter(
        (transaction) =>
          new Date(transaction.date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) <= new Date(filters.endDate)
      );
    }

    if (filters.account) {
      filtered = filtered.filter((transaction) =>
        transaction.account
          .toLowerCase()
          .includes(filters.account.toLowerCase())
      );
    }

    if (filters.industry) {
      filtered = filtered.filter((transaction) =>
        transaction.industry
          .toLowerCase()
          .includes(filters.industry.toLowerCase())
      );
    }

    if (filters.state) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.state.toLowerCase() === filters.state.toLowerCase()
      );
    }

    setFilteredTransactions(filtered);
  };

  const getWithdrawalsDepositsByState = (transactions) => {
    const groupedData = {};
  
    transactions.forEach((transaction) => {
      if (!groupedData[transaction.state]) {
        groupedData[transaction.state] = { deposits: 0, withdrawals: 0 };
      }
  
      if (transaction.transaction_type === 'deposit') {
        groupedData[transaction.state].deposits += parseFloat(transaction.amount);
      } else if (transaction.transaction_type === 'withdraw') {
        groupedData[transaction.state].withdrawals += parseFloat(transaction.amount);
      }
    });
  
    return groupedData;
  };
  
  const stateData = getWithdrawalsDepositsByState(transactionsData);
  
  const barDataByState = {
    labels: Object.keys(stateData),
    datasets: [
      {
        label: 'Deposits',
        data: Object.values(stateData).map((item) => item.deposits),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Withdrawals',
        data: Object.values(stateData).map((item) => item.withdrawals),
        backgroundColor: '#F44336',
      },
    ],
  };

  const getWithdrawalsDepositsByIndustry = (transactions) => {
    const groupedData = {};
  
    transactions.forEach((transaction) => {
      if (!groupedData[transaction.industry]) {
        groupedData[transaction.industry] = { deposits: 0, withdrawals: 0 };
      }
  
      if (transaction.transaction_type === 'deposit') {
        groupedData[transaction.industry].deposits += parseFloat(transaction.amount);
      } else if (transaction.transaction_type === 'withdraw') {
        groupedData[transaction.industry].withdrawals += parseFloat(transaction.amount);
      }
    });
  
    return groupedData;
  };
  
  const industryData = getWithdrawalsDepositsByIndustry(transactionsData);
  
  const doughnutDataByIndustry = {
    labels: Object.keys(industryData),
    datasets: [
      {
        label: 'Deposits',
        data: Object.values(industryData).map((item) => item.deposits),
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'],
      },
      {
        label: 'Withdrawals',
        data: Object.values(industryData).map((item) => item.withdrawals),
        backgroundColor: ['#F44336', '#03A9F4', '#FF9800', '#795548', '#8BC34A'],
      },
    ],
  };
  
  const doughnutOptionsByIndustry = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Withdrawals and Deposits by Industry' },
    },
  };

  
  const getWithdrawalsDepositsByAccount = (transactions) => {
    const groupedData = {};
  
    transactions.forEach((transaction) => {
      if (!groupedData[transaction.account]) {
        groupedData[transaction.account] = { deposits: 0, withdrawals: 0 };
      }
  
      if (transaction.transaction_type === 'deposit') {
        groupedData[transaction.account].deposits += parseFloat(transaction.amount);
      } else if (transaction.transaction_type === 'withdraw') {
        groupedData[transaction.account].withdrawals += parseFloat(transaction.amount);
      }
    });
  
    return groupedData;
  };
  
  const accountData = getWithdrawalsDepositsByAccount(transactionsData);
  
  const horizontalBarDataByAccount = {
    labels: Object.keys(accountData),
    datasets: [
      {
        label: 'Deposits',
        data: Object.values(accountData).map((item) => item.deposits),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Withdrawals',
        data: Object.values(accountData).map((item) => item.withdrawals),
        backgroundColor: '#F44336',
      },
    ],
  };
  
  const horizontalBarOptionsByAccount = {
    indexAxis: 'y', 
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Withdrawals and Deposits by Account' },
    },
  };
  
  
  const barOptionsByState = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Withdrawals and Deposits by State' },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <h2>Menu</h2>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                localStorage.removeItem("loggedIn");
                router.push("/login");
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </Sidebar>

      <MainContent>
        <h1>Dashboard</h1>

        {/* Filtros Globais */}
        <FilterContainer>
          <h3>Filters</h3>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              className="text-red"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Account:
            <input
              type="text"
              name="account"
              value={filters.account}
              onChange={handleFilterChange}
              placeholder="Account name"
            />
          </label>
          <label>
            Industry:
            <input
              type="text"
              name="industry"
              value={filters.industry}
              onChange={handleFilterChange}
              placeholder="Industry"
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              placeholder="State (e.g., TX)"
            />
          </label>
          <button onClick={applyFilters}>Apply Filters</button>
        </FilterContainer>

        <CardContainer>
          <SummaryCard
            title="Total Income"
            value={`${formatCurrency(totalIncome)}`}
            color="#4CAF50"
          />
          <SummaryCard
            title="Total Expenses"
            value={`${formatCurrency(totalExpenses)}`}
            color="#F44336"
          />
          <SummaryCard
            title="Balance"
            value={`${formatCurrency(balance)}`}
            color="#2196F3"
          />
          <SummaryCard
            title="Pending Transactions"
            value={pendingTransactions}
            color="#FF9800"
          />
        </CardContainer>

        {/* Gráficos */}
        <ChartContainer>
        <Row>
          <ChartWrapper>
            <StackedBarChart data={barData} options={barOptions} />
          </ChartWrapper>
          <ChartWrapper>
            <LineChart data={lineData} options={lineOptions} />
          </ChartWrapper>
          <ChartWrapper>
            <StackedBarChartByState data={barDataByState} options={barOptionsByState} />
          </ChartWrapper>
        </Row>

        <Row>
          <ChartWrapper>
            <DoughnutChartByIndustry data={doughnutDataByIndustry} options={doughnutOptionsByIndustry} />
          </ChartWrapper>
          <ChartWrapper>
            <HorizontalBarChartByAccount data={horizontalBarDataByAccount} options={horizontalBarOptionsByAccount} />
          </ChartWrapper>
          <ChartWrapper>
            <HorizontalBarChartByAccount data={horizontalBarDataByAccount} options={horizontalBarOptionsByAccount} />
          </ChartWrapper>
        </Row>
      </ChartContainer>

      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin: 1rem 0;

      a {
        text-decoration: none;
        color: #0070f3;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;

  label {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;

    input {
      margin-left: 1rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #0070f3;
      }

      &[type="date"] {
        color: #0070f3;
      }
    }
  }

  button {
    padding: 0.7rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    width: 150px;
    margin-top: 1rem;
    align-self: flex-start;

    &:hover {
      background-color: #005bb5;
    }
  }
`;


const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
  margin-top: 5rem;
`;

const ChartWrapper = styled.div`
  flex: 1;
  margin: 0 10px;
  width: 33%;
  

`;