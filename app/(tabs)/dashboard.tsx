import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ScrollView, TouchableOpacity, View, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import Card from '../../components/Card';
import AddDialog from '../../components/AddDialog';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Field } from '../../components/Field';

// interface Field {
//   key: string;
//   label: string;
//   type: string;
//   required?: boolean;
// }

interface DataPoint {
  date: string;
  amount: number;
  category?: string;
  source?: string;
}
interface Transaction {
  id: number;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  account_id: number;
}
interface Income {
  id: number;
  amount: number;
  date: string;
  source?: string;
  account_id: number;
}
interface Account {
  id: number;
  name: string;
  type?: string;
  balance?: number;
  currency?: string;
  prev_balance?: number;
}
interface MonthlyPayment {
  id?: number;
  account_id?: number;
  amount: number;
  due_date?: string;
  description?: string;
}

const SERVER_URL = 'http://localhost:8000';

const PIE_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#00C49A', '#FF6B6B'];

const transactionFields: Field[] = [
  { key: 'account_id', label: 'Account ID', type: 'number', required: true },
  { key: 'amount', label: 'Amount', type: 'number', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'currency', label: 'Currency', type: 'text' },
];
const incomeFields: Field[] = [
  { key: 'account_id', label: 'Account ID', type: 'number', required: true },
  { key: 'amount', label: 'Amount', type: 'number', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'source', label: 'Source', type: 'text' },
  { key: 'currency', label: 'Currency', type: 'text' },
];
const accountFields: Field[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'type', label: 'Type', type: 'text' },
  { key: 'balance', label: 'Balance', type: 'number' },
  { key: 'currency', label: 'Currency', type: 'text' },
];
const monthlyPaymentFields: Field[] = [
  { key: 'account_id', label: 'Account ID', type: 'number', required: true },
  { key: 'amount', label: 'Amount', type: 'number', required: true },
  { key: 'due_date', label: 'Due Date', type: 'date', required: true },
  { key: 'description', label: 'Description', type: 'text' },
];

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
  margin-bottom: 8px;
  color: #222;
`;
const BalanceCardsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const BalanceCard = styled(Card)`
  flex: 1;
  min-width: 140px;
  max-width: 180px;
  margin-right: 10px;
  margin-bottom: 10px;
  align-items: center;
  padding-vertical: 10px;
`;
const BalanceCardContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;
const IconCol = styled.View`
  margin-right: 10px;
`;
const BalanceCol = styled.View`
  align-items: flex-start;
`;
const BalanceAmount = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #222;
`;
const BalancePercent = styled.Text`
  font-size: 14px;
  color: #4BC0C0;
  font-weight: 600;
`;
const BalanceLabel = styled.Text`
  font-size: 14px;
  color: #888;
  margin-top: 2px;
  max-width: 120px;
`;
const ScrollContent = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  padding-bottom: 32px;
`;
const TabRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  margin-top: 0;
`;
const Tab = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 10px;
  border-bottom-width: 2px;
  border-bottom-color: transparent;
  align-items: center;
`;
const TabActive = styled.View`
  border-bottom-color: #007AFF;
`;
const TabText = styled.Text`
  font-size: 17px;
  color: #888;
  font-weight: 500;
`;
const TabTextActive = styled.Text`
  color: #007AFF;
  font-weight: bold;
`;
const SectionHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;
const ListItem = styled.View`
  background-color: #f6f6f6;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ListMain = styled.Text`
  flex: 2;
  font-size: 16px;
  font-weight: 500;
`;
const ListSub = styled.Text`
  flex: 2;
  color: #888;
  font-size: 13px;
  margin-left: 8px;
`;
const Amount = styled.Text`
  flex: 1;
  font-weight: bold;
  font-size: 16px;
  text-align: right;
`;
const EmptyText = styled.Text`
  color: #aaa;
  font-style: italic;
  margin-bottom: 8px;
  text-align: center;
`;

const ChartSection = styled.View`
  width: 100%;
  max-width: 480px;
  align-self: center;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 16px 24px 16px;
  margin-bottom: 24px;
  margin-top: 10px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  elevation: 2;
`;

const ChartTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
  text-align: center;
`;

const CardSpacer = styled.View`
  height: 16px;
`;

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tab, setTab] = useState<'expense' | 'income'>('expense');
  const [expensePie, setExpensePie] = useState<any[]>([]);
  const [incomePie, setIncomePie] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [recentIncomes, setRecentIncomes] = useState<Income[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [monthlyPayments, setMonthlyPayments] = useState<MonthlyPayment[]>([]);
  const [secondaryLoading, setSecondaryLoading] = useState<boolean>(true);

  const [showTxDialog, setShowTxDialog] = useState(false);
  const [showIncomeDialog, setShowIncomeDialog] = useState(false);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showMonthlyDialog, setShowMonthlyDialog] = useState(false);

  const handleAddTransaction = async (values: Record<string, any>) => {
    try {
      await fetch(`${SERVER_URL}/v1/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setShowTxDialog(false);
      // Optionally refresh list
    } catch {}
  };
  const handleAddIncome = async (values: Record<string, any>) => {
    try {
      await fetch(`${SERVER_URL}/v1/income`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setShowIncomeDialog(false);
    } catch {}
  };
  const handleAddAccount = async (values: Record<string, any>) => {
    try {
      await fetch(`${SERVER_URL}/v1/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setShowAccountDialog(false);
    } catch {}
  };
  const handleAddMonthlyPayment = async (values: Record<string, any>) => {
    try {
      await fetch(`${SERVER_URL}/v1/monthly-payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setShowMonthlyDialog(false);
    } catch {}
  };

  useEffect(() => {
    async function fetchPieData() {
      setLoading(true);
      try {
        // Pie for Expenses by Category
        const expRes = await fetch(`${SERVER_URL}/v1/transactions?limit=100`);
        const expData: Transaction[] = await expRes.json();
        const expenseCategories: {[cat: string]: number} = {};
        expData.forEach(tx => {
          const cat = tx.category || 'Other';
          expenseCategories[cat] = (expenseCategories[cat] || 0) + Math.abs(tx.amount);
        });
        const expPie = Object.keys(expenseCategories).map((cat, idx) => ({
          name: cat,
          amount: expenseCategories[cat],
          color: PIE_COLORS[idx % PIE_COLORS.length],
          legendFontColor: '#222',
          legendFontSize: 14,
        }));
        setExpensePie(expPie);
        // Pie for Incomes by Source
        const incRes = await fetch(`${SERVER_URL}/v1/income?limit=100`);
        const incData: Income[] = await incRes.json();
        const incomeSources: {[src: string]: number} = {};
        incData.forEach(tx => {
          const src = tx.source || 'Other';
          incomeSources[src] = (incomeSources[src] || 0) + Math.abs(tx.amount);
        });
        const incPie = Object.keys(incomeSources).map((src, idx) => ({
          name: src,
          amount: incomeSources[src],
          color: PIE_COLORS[idx % PIE_COLORS.length],
          legendFontColor: '#222',
          legendFontSize: 14,
        }));
        setIncomePie(incPie);
      } catch (e) {
        setExpensePie([]);
        setIncomePie([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPieData();
  }, []);

  useEffect(() => {
    async function fetchLists() {
      setSecondaryLoading(true);
      try {
        const [txRes, incRes, accRes, mpRes] = await Promise.all([
          fetch(`${SERVER_URL}/v1/transactions?limit=5&offset=0`),
          fetch(`${SERVER_URL}/v1/income?limit=5&offset=0`),
          fetch(`${SERVER_URL}/v1/accounts?limit=5&offset=0`),
          fetch(`${SERVER_URL}/v1/monthly-payments?limit=5&offset=0`),
        ]);
        const txData: Transaction[] = await txRes.json();
        const incData: Income[] = await incRes.json();
        const accData: Account[] = await accRes.json();
        const mpData: MonthlyPayment[] = await mpRes.json();
        setRecentTransactions(txData);
        setRecentIncomes(incData);
        setAccounts(accData);
        setMonthlyPayments(mpData);
      } catch (e) {
        setRecentTransactions([]);
        setRecentIncomes([]);
        setAccounts([]);
        setMonthlyPayments([]);
      } finally {
        setSecondaryLoading(false);
      }
    }
    fetchLists();
  }, []);

  function getAccountIcon(type: string | undefined) {
    switch ((type || '').toLowerCase()) {
      case 'savings':
        return <MaterialCommunityIcons name="bank" size={32} color="#2196F3" />;
      case 'cash':
        return <FontAwesome5 name="money-bill-wave" size={28} color="#4BC0C0" />;
      case 'credit':
        return <MaterialCommunityIcons name="credit-card" size={32} color="#FF6384" />;
      case 'investment':
        return <MaterialCommunityIcons name="chart-line" size={32} color="#FFCE56" />;
      default:
        return <MaterialCommunityIcons name="wallet" size={32} color="#888" />;
    }
  }

  function getBalanceChangePercent(current: number, prev: number | undefined) {
    if (!prev || prev === 0) return 0;
    return ((current - prev) / prev) * 100;
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;

  return (
    <ScreenWrapper>
      <CenterContent>
        <ScrollView contentContainerStyle={{ paddingVertical: 18 }}>
          <ChartSection>
            <ChartTitle>Spending & Income Breakdown</ChartTitle>
            <TabRow>
              <Tab style={tab === 'expense' ? TabActive : {}} onPress={() => setTab('expense')}>
                <TabText style={tab === 'expense' ? TabTextActive : {}}>Expense</TabText>
              </Tab>
              <Tab style={tab === 'income' ? TabActive : {}} onPress={() => setTab('income')}>
                <TabText style={tab === 'income' ? TabTextActive : {}}>Income</TabText>
              </Tab>
            </TabRow>
            <View style={{ alignItems: 'center', marginTop: 16, minHeight: 220 }}>
              {tab === 'expense' ? (
                expensePie.length > 0 ? (
                  <PieChart
                    data={expensePie.map(({ name, amount, color, legendFontColor, legendFontSize }) => ({
                      name,
                      population: amount,
                      color,
                      legendFontColor,
                      legendFontSize,
                    }))}
                    width={Dimensions.get('window').width - 64}
                    height={220}
                    chartConfig={pieChartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="16"
                    absolute
                  />
                ) : <EmptyText>No expense data.</EmptyText>
              ) : (
                incomePie.length > 0 ? (
                  <PieChart
                    data={incomePie.map(({ name, amount, color, legendFontColor, legendFontSize }) => ({
                      name,
                      population: amount,
                      color,
                      legendFontColor,
                      legendFontSize,
                    }))}
                    width={Dimensions.get('window').width - 64}
                    height={220}
                    chartConfig={pieChartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="16"
                    absolute
                  />
                ) : <EmptyText>No income data.</EmptyText>
              )}
            </View>
          </ChartSection>
          <CardSpacer />
          {secondaryLoading ? (
            <ActivityIndicator style={{ marginTop: 32 }} size="large" color="#007AFF" />
          ) : (
            <>
              <Card style={{ marginBottom: 16 }}>
                <SectionHeaderRow>
                  <SectionTitle>Recent Transactions</SectionTitle>
                  <TouchableOpacity onPress={() => setShowTxDialog(true)}>
                    <Ionicons name="add-circle" size={24} color="#2196F3" />
                  </TouchableOpacity>
                </SectionHeaderRow>
                <FlatList
                  data={recentTransactions}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <ListItem>
                      <ListMain>{item.description || 'No Description'}</ListMain>
                      <ListSub>{item.date} | {item.category || 'No Category'}</ListSub>
                      <Amount style={{ color: '#FF6384' }}>-${item.amount.toFixed(2)}</Amount>
                    </ListItem>
                  )}
                  ListEmptyComponent={<EmptyText>No recent transactions.</EmptyText>}
                  scrollEnabled={false}
                />
              </Card>
              <CardSpacer />
              <Card style={{ marginBottom: 16 }}>
                <SectionHeaderRow>
                  <SectionTitle>Recent Incomes</SectionTitle>
                  <TouchableOpacity onPress={() => setShowIncomeDialog(true)}>
                    <Ionicons name="add-circle" size={24} color="#2196F3" />
                  </TouchableOpacity>
                </SectionHeaderRow>
                <FlatList
                  data={recentIncomes}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <ListItem>
                      <ListMain>{item.source || 'No Source'}</ListMain>
                      <ListSub>{item.date}</ListSub>
                      <Amount style={{ color: '#36A2EB' }}>+${item.amount.toFixed(2)}</Amount>
                    </ListItem>
                  )}
                  ListEmptyComponent={<EmptyText>No recent incomes.</EmptyText>}
                  scrollEnabled={false}
                />
              </Card>
              <CardSpacer />
              <Card style={{ marginBottom: 16 }}>
                <SectionHeaderRow>
                  <SectionTitle>List of Accounts</SectionTitle>
                  <TouchableOpacity onPress={() => setShowAccountDialog(true)}>
                    <Ionicons name="add-circle" size={24} color="#2196F3" />
                  </TouchableOpacity>
                </SectionHeaderRow>
                <FlatList
                  data={accounts}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <ListItem>
                      <ListMain>{item.name}</ListMain>
                      <ListSub>{item.type || 'No Type'} | {item.currency || 'USD'}</ListSub>
                      <Amount style={{ color: '#007AFF' }}>${item.balance?.toFixed(2) ?? '0.00'}</Amount>
                    </ListItem>
                  )}
                  ListEmptyComponent={<EmptyText>No accounts found.</EmptyText>}
                  scrollEnabled={false}
                />
              </Card>
              <CardSpacer />
              <Card style={{ marginBottom: 16 }}>
                <SectionHeaderRow>
                  <SectionTitle>Monthly Payments</SectionTitle>
                  <TouchableOpacity onPress={() => setShowMonthlyDialog(true)}>
                    <Ionicons name="add-circle" size={24} color="#2196F3" />
                  </TouchableOpacity>
                </SectionHeaderRow>
                <FlatList
                  data={monthlyPayments}
                  keyExtractor={item => item.id?.toString() ?? Math.random().toString()}
                  renderItem={({ item }) => (
                    <ListItem>
                      <ListMain>{item.description || 'No Description'}</ListMain>
                      <ListSub>{item.due_date || 'No Due Date'}</ListSub>
                      <Amount style={{ color: '#FF9F40' }}>-${item.amount.toFixed(2)}</Amount>
                    </ListItem>
                  )}
                  ListEmptyComponent={<EmptyText>No monthly payments found.</EmptyText>}
                  scrollEnabled={false}
                />
              </Card>
            </>
          )}
        </ScrollView>
      </CenterContent>
      <AddDialog
        visible={showTxDialog}
        onClose={() => setShowTxDialog(false)}
        onSubmit={handleAddTransaction}
        fields={transactionFields}
        title="Add Transaction"
      />
      <AddDialog
        visible={showIncomeDialog}
        onClose={() => setShowIncomeDialog(false)}
        onSubmit={handleAddIncome}
        fields={incomeFields}
        title="Add Income"
      />
      <AddDialog
        visible={showAccountDialog}
        onClose={() => setShowAccountDialog(false)}
        onSubmit={handleAddAccount}
        fields={accountFields}
        title="Add Account"
      />
      <AddDialog
        visible={showMonthlyDialog}
        onClose={() => setShowMonthlyDialog(false)}
        onSubmit={handleAddMonthlyPayment}
        fields={monthlyPaymentFields}
        title="Add Monthly Payment"
      />
    </ScreenWrapper>
  );
}

const pieChartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#fff',
  },
  decimalPlaces: 2,
};
