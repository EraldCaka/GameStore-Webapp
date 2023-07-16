import { useState, useEffect } from "react";
import styled from "styled-components";
import { NavbarLine } from "../index";
import { apiCall } from "../../../axios/axios";

const TransactionsWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TransactionCard = styled.div`
  margin-left: 35px;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 0 0 300px;
  margin-right: 16px;
`;

const TransactionGameName = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`;

const TransactionPrice = styled.p`
  color: #888;
  margin-bottom: 8px;
`;

const TransactionDate = styled.p`
  color: #888;
  margin-bottom: 0;
`;
const HeadingWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  & h1 {
    font-size: 2.5rem;
    font-weight: bold;
    font-family: Bahnschrift;
  }
`;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0); // Initialize amount with 0

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiCall("/transactions").fetchAll();

        setTransactions(response.data);

        // Calculate the total amount by summing up the prices
        const totalAmount = response.data.reduce(
          (accumulator, transaction) => accumulator + transaction.price,
          0
        );

        setAmount(totalAmount);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <div>
      <NavbarLine />
      <HeadingWrapper>
        <h1>Transactions </h1>
        <h2>(Amount Spent: ${amount})</h2>
      </HeadingWrapper>
      <TransactionsWrapper>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionCard key={transaction.id}>
              <TransactionPrice>
                Transaction Id: {transaction.id}
              </TransactionPrice>
              <TransactionGameName>{transaction.game_name}</TransactionGameName>
              <TransactionPrice>Price: {transaction.price}$</TransactionPrice>
              <TransactionDate>
                Date: {formatDateTime(transaction.date)}
              </TransactionDate>
            </TransactionCard>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </TransactionsWrapper>
    </div>
  );
};

export default Transactions;
