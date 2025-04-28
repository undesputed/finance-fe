import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';

const ScreenWrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: #f7f7f7;
`;
const CenterContent = styled.View`
  width: 100%;
  max-width: 480px;
  align-self: center;
  padding-top: 24px;
  padding-bottom: 24px;
  flex: 1;
`;
const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #222;
`;
const TransactionItem = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 14px;
  shadow-color: #000;
  shadow-opacity: 0.03;
  shadow-radius: 4px;
  elevation: 2;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const TransactionMain = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #222;
`;
const TransactionDetails = styled.Text`
  font-size: 13px;
  color: #888;
  margin-left: 8px;
`;
const TransactionAmount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

interface Transaction {
  id: number;
  description: string;
  date: string;
  category: string;
  amount: number;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTransactions([
        { id: 1, description: 'Grocery Shopping', date: '2025-04-25', category: 'Groceries', amount: -54.23 },
        { id: 2, description: 'Salary', date: '2025-04-24', category: 'Income', amount: 1500.00 },
        { id: 3, description: 'Coffee', date: '2025-04-24', category: 'Food', amount: -3.50 },
        { id: 4, description: 'Internet Bill', date: '2025-04-23', category: 'Utilities', amount: -45.99 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <ScreenWrapper>
      <CenterContent>
        <SectionTitle>Transaction List</SectionTitle>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 32 }} />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item: Transaction) => item.id.toString()}
            renderItem={({ item }: { item: Transaction }) => (
              <TransactionItem>
                <View style={{ flex: 2 }}>
                  <TransactionMain>{item.description}</TransactionMain>
                  <TransactionDetails>{item.date} | {item.category}</TransactionDetails>
                </View>
                <TransactionAmount style={{ color: item.amount < 0 ? '#FF6384' : '#007AFF' }}>
                  {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
                </TransactionAmount>
              </TransactionItem>
            )}
            ListEmptyComponent={<Text>No transactions found.</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </CenterContent>
    </ScreenWrapper>
  );
}
