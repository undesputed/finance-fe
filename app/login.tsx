import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  Link,
  LinkText,
  ResetPassword,
  ResetPasswordText
} from '@/components/Form';

const SERVER_URL = Platform.select({
  ios: 'http://localhost:8000',
  android: 'http://10.0.2.2:8000',
});

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
    setLoading(true);
    try {
      router.replace('/dashboard');
      const formBody = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
      const response = await fetch(`${SERVER_URL}/v1/login/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody,
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        router.replace('/dashboard');
      } else {
        Alert.alert('Login Failed', data.detail || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        placeholder="Enter your username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        editable={!loading}
        placeholderTextColor="#0B1B36"
      />
      <Input
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
        placeholderTextColor="#0B1B36"
      />
      <Button onPress={handleLogin} disabled={loading}>
        <ButtonText>{loading ? 'Logging in...' : 'Login'}</ButtonText>
      </Button>
      <ResetPassword onPress={() => Alert.alert('Reset Password', 'Password reset functionality coming soon.')} disabled={loading}>
        <ResetPasswordText>Forgot password?</ResetPasswordText>
      </ResetPassword>
      <Link onPress={() => router.replace('/register')}>
        <LinkText>Don't have an account? Register</LinkText>
      </Link>
    </Container>
  );
}
