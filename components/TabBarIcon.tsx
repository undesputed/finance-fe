import React from 'react';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

interface TabBarIconProps {
  name: string;
  color: string;
  focused: boolean;
}

export default function TabBarIcon({ name, color, focused }: TabBarIconProps) {
  switch (name) {
    case 'dashboard':
      return <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={color} />;
    case 'accounts':
      return <MaterialCommunityIcons name={focused ? 'bank' : 'bank-outline'} size={26} color={color} />;
    case 'transactions':
      return <FontAwesome5 name="exchange-alt" size={24} color={color} />;
    case 'incomes':
      return <MaterialCommunityIcons name={focused ? 'cash' : 'cash-multiple'} size={26} color={color} />;
    case 'profile':
      return <Ionicons name={focused ? 'person' : 'person-outline'} size={26} color={color} />;
    default:
      return <Ionicons name="ellipse" size={24} color={color} />;
  }
}
