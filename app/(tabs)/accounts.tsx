import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';

interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

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
const AccountItem = styled.View`
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
const AccountName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #222;
`;
const AccountDetails = styled.Text`
  font-size: 14px;
  color: #888;
`;

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Expanded mock data for UI testing
    setTimeout(() => {
      setAccounts([
        { id: 1, name: 'Checking', type: 'Bank', balance: 1234.56, currency: 'USD' },
        { id: 2, name: 'Savings', type: 'Bank', balance: 5678.90, currency: 'USD' },
        { id: 3, name: 'Credit Card', type: 'Credit', balance: -345.67, currency: 'USD' },
        { id: 4, name: 'Investment', type: 'Investment', balance: 25000.00, currency: 'USD' },
        { id: 5, name: 'PayPal', type: 'E-wallet', balance: 0.00, currency: 'USD' },
        { id: 6, name: 'Joint Account', type: 'Bank', balance: 500.00, currency: 'EUR' },
        { id: 7, name: 'Travel Card', type: 'Prepaid', balance: 123.45, currency: 'GBP' },
        { id: 8, name: 'Business', type: 'Bank', balance: 8000.00, currency: 'USD' },
        { id: 9, name: 'Crypto Wallet', type: 'Crypto', balance: 2.5, currency: 'BTC' },
        { id: 10, name: 'Student Loan', type: 'Loan', balance: -12000.00, currency: 'USD' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <ScreenWrapper>
      <CenterContent>
        <SectionTitle>Account List</SectionTitle>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 32 }} />
        ) : (
          <FlatList
            data={accounts}
            keyExtractor={(item: Account) => item.id.toString()}
            renderItem={({ item }: { item: Account }) => (
              <AccountItem>
                <View>
                  <AccountName>{item.name}</AccountName>
                  <AccountDetails>{item.type} | {item.currency}</AccountDetails>
                </View>
                <AccountName style={{ color: item.balance < 0 ? '#FF6384' : '#007AFF' }}>
                  {item.balance < 0 ? '-' : ''}${Math.abs(item.balance).toFixed(2)}
                </AccountName>
              </AccountItem>
            )}
            ListEmptyComponent={<Text>No accounts found.</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </CenterContent>
    </ScreenWrapper>
  );
}
