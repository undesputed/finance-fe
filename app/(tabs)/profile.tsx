import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, Switch, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

const ScreenWrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: #f7f7f7;
`;
const CenterContent = styled.View`
  width: 100%;
  max-width: 480px;
  align-self: center;
  padding-top: 32px;
  padding-bottom: 32px;
`;
const ProfileSection = styled.View`
  align-items: center;
  margin-bottom: 32px;
`;
const Avatar = styled.View`
  width: 88px;
  height: 88px;
  border-radius: 44px;
  background-color: #d1e4fd;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;
const AvatarText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: #007AFF;
`;
const Name = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color: #222;
`;
const Email = styled.Text`
  font-size: 15px;
  color: #888;
  margin-bottom: 6px;
`;
const SettingsCard = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 0 8px 0;
  margin-bottom: 24px;
  width: 100%;
  shadow-color: #000;
  shadow-opacity: 0.03;
  shadow-radius: 6px;
  elevation: 2;
`;
const SettingsList = styled.View`
  width: 100%;
`;
const SettingsItem = styled.TouchableOpacity`
  padding: 16px 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;
const SettingsLabel = styled.Text`
  font-size: 16px;
  color: #222;
`;
const LogoutButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #FF6384;
  padding: 16px 0;
  border-radius: 12px;
  width: 100%;
  align-items: center;
`;
const LogoutText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <CenterContent>
          <ProfileSection>
            <Avatar>
              <AvatarText>JD</AvatarText>
            </Avatar>
            <Name>John Doe</Name>
            <Email>john.doe@email.com</Email>
          </ProfileSection>

          <SettingsCard>
            <SettingsList>
              <SettingsItem activeOpacity={0.7} onPress={() => Alert.alert('Edit Profile')}>
                <SettingsLabel>Edit Profile</SettingsLabel>
              </SettingsItem>
              <SettingsItem activeOpacity={1}>
                <SettingsLabel>Dark Mode</SettingsLabel>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#ccc', true: '#007AFF' }}
                  thumbColor={darkMode ? '#007AFF' : '#eee'}
                />
              </SettingsItem>
              <SettingsItem activeOpacity={1} style={{ borderBottomWidth: 0 }}>
                <SettingsLabel>Notifications</SettingsLabel>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#ccc', true: '#007AFF' }}
                  thumbColor={notifications ? '#007AFF' : '#eee'}
                />
              </SettingsItem>
            </SettingsList>
          </SettingsCard>

          <LogoutButton onPress={handleLogout} activeOpacity={0.8}>
            <LogoutText>Logout</LogoutText>
          </LogoutButton>
        </CenterContent>
      </ScrollView>
    </ScreenWrapper>
  );
}
