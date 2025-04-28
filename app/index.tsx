import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

const SplashContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #F5F7FA;
`;
const Logo = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;
const AppTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #0B1B36;
`;

export default function SplashScreenIndex() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.replace('/login');
    }, 2000); // Show splash for 2 seconds
    return () => clearTimeout(timer);
  }, [router]);

  if (showSplash) {
    return (
      <SplashContainer>
        <Logo source={require('@/assets/images/logo.png')} />
        <AppTitle>Finance App</AppTitle>
        <ActivityIndicator size="large" color="#FFD700" />
      </SplashContainer>
    );
  }

  // Fallback (shouldn't render, since we route away)
  return null;
}
