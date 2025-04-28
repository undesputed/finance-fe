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
  LinkText
} from '@/components/Form';
import { SERVER_URL } from '@/constants';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/v1/login/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok && data.username) {
        Alert.alert('Success', 'Registration successful! Please login.');
        router.replace('/login');
      } else {
        Alert.alert('Registration Failed', data.detail || 'Could not register.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <Input
        placeholder="Enter your username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        editable={!loading}
        placeholderTextColor="#0B1B36"
      />
      <Input
        placeholder="Enter your email address"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
        placeholderTextColor="#0B1B36"
      />
      <Input
        placeholder="Create a password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
        placeholderTextColor="#0B1B36"
      />
      <Input
        placeholder="Confirm your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        editable={!loading}
        placeholderTextColor="#0B1B36"
      />
      <Button onPress={handleRegister} disabled={loading}>
        <ButtonText>{loading ? 'Registering...' : 'Register'}</ButtonText>
      </Button>
      <Link onPress={() => router.replace('/login')}>
        <LinkText>Already have an account? Login</LinkText>
      </Link>
    </Container>
  );
}
