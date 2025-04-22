import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { ThemeColors } from '@/constants/ThemeColors';

// Define tab types for better type safety
export type PersonTabType = 'data' | 'activities';

interface PersonTabsProps {
  activeTab: PersonTabType;
  onTabChange: (tab: PersonTabType) => void;
}

export const PersonTabs: React.FC<PersonTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'data' && styles.activeTabButton
        ]}
        onPress={() => onTabChange('data')}
      >
        <Text 
          style={[
            styles.tabText,
            activeTab === 'data' && styles.activeTabText
          ]}
        >
          Dane
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'activities' && styles.activeTabButton
        ]}
        onPress={() => onTabChange('activities')}
      >
        <Text 
          style={[
            styles.tabText,
            activeTab === 'activities' && styles.activeTabText
          ]}
        >
          Zajęcia
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: scale(2),
    marginBottom: scale(10),
    marginTop: scale(10),
  },
  tabButton: {
    flex: 1,
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
    backgroundColor: '#F5F5F5',
    marginHorizontal: scale(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  activeTabButton: {
    backgroundColor: ThemeColors.GOLD,
  },
  tabText: {
    fontSize: scale(16),
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
}); 