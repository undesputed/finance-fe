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
const IncomeItem = styled.View`
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
const IncomeMain = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #222;
`;
const IncomeDetails = styled.Text`
  font-size: 13px;
  color: #888;
  margin-left: 8px;
`;
const IncomeAmount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: right;
  color: #36A2EB;
`;

interface Income {
  id: number;
  source: string;
  date: string;
  amount: number;
}

export default function Incomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIncomes([
        { id: 1, source: 'Salary', date: '2025-04-25', amount: 1500.00 },
        { id: 2, source: 'Freelance', date: '2025-04-22', amount: 300.00 },
        { id: 3, source: 'Gift', date: '2025-04-20', amount: 100.00 },
        { id: 4, source: 'Investment', date: '2025-04-18', amount: 50.00 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <ScreenWrapper>
      <CenterContent>
        <SectionTitle>Income List</SectionTitle>
        {loading ? (
          <ActivityIndicator size="large" color="#36A2EB" style={{ marginTop: 32 }} />
        ) : (
          <FlatList
            data={incomes}
            keyExtractor={(item: Income) => item.id.toString()}
            renderItem={({ item }: { item: Income }) => (
              <IncomeItem>
                <View style={{ flex: 2 }}>
                  <IncomeMain>{item.source}</IncomeMain>
                  <IncomeDetails>{item.date}</IncomeDetails>
                </View>
                <IncomeAmount>
                  +${item.amount.toFixed(2)}
                </IncomeAmount>
              </IncomeItem>
            )}
            ListEmptyComponent={<Text>No incomes found.</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </CenterContent>
    </ScreenWrapper>
  );
}
