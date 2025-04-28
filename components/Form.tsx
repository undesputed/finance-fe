import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #F5F7FA;
`;
export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 32px;
  color: #0B1B36;
`;
export const Input = styled.TextInput`
  width: 100%;
  height: 48px;
  border: 1px solid #0B1B36;
  border-radius: 8px;
  padding-horizontal: 16px;
  margin-bottom: 16px;
  font-size: 18px;
  background-color: #FFFFFF;
  color: #0B1B36;
`;
export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  background-color: #FFD700;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  shadow-color: #0B1B36;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;
export const ButtonText = styled.Text`
  color: #0B1B36;
  font-size: 20px;
  font-weight: bold;
`;
export const Link = styled.TouchableOpacity`
  margin-top: 18px;
`;
export const LinkText = styled.Text`
  color: #FFD700;
  text-align: center;
  margin-top: 8px;
  text-decoration: underline;
  font-weight: bold;
`;
export const ResetPassword = styled.TouchableOpacity`
  margin-top: 16px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 8px;
`;
export const ResetPasswordText = styled.Text`
  color: #FFD700;
  font-size: 16px;
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
`;
