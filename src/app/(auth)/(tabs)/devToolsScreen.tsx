import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { logState, logAuthState, logProfileState, devLog } from '../../../utils/devTools';
import { useAppSelector } from '../../../store';

/**
 * Developer tools screen that provides access to various debugging tools
 * You can use this during development to inspect app state
 */
const DevToolsScreen: React.FC = () => {
  const [stateLoggerVisible, setStateLoggerVisible] = useState(false);
  const [watchChanges, setWatchChanges] = useState(false);
  
  // Subscribe to auth state to show in the UI
  const authState = useAppSelector(state => state.auth);
  const profileState = useAppSelector(state => state.profile);
  
  useEffect(() => {
    // Log state when screen mounts
    devLog('DevToolsScreen mounted');
    logState({ label: 'Initial state on DevTools screen mount' });
    
    return () => {
      devLog('DevToolsScreen unmounted');
    };
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Development Tools</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>State Logging</Text>
        <View style={styles.buttonRow}>
          <Button 
            title="Log All State" 
            onPress={() => logState({ label: 'Manual state log' })} 
          />
          <Button 
            title="Log Auth State" 
            onPress={() => logAuthState()} 
          />
          <Button 
            title="Log Profile State" 
            onPress={() => logProfileState()} 
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>State Logger Component</Text>
        <View style={styles.buttonRow}>
          <Button 
            title={stateLoggerVisible ? "Hide State Logger" : "Show State Logger"} 
            onPress={() => setStateLoggerVisible(!stateLoggerVisible)} 
          />
          {stateLoggerVisible && (
            <Button 
              title={watchChanges ? "Stop Watching Changes" : "Watch State Changes"} 
              onPress={() => setWatchChanges(!watchChanges)} 
            />
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current State Summary</Text>
        <View style={styles.stateBox}>
          <Text style={styles.stateLabel}>Auth State:</Text>
          <Text>User: {authState.user ? authState.user.username || authState.user.email : 'Not logged in'}</Text>
          <Text>Session: {authState.session ? 'Active' : 'None'}</Text>
          <Text>Loading: {authState.isLoading ? 'Yes' : 'No'}</Text>
          <Text>Error: {authState.error ? authState.error.message : 'None'}</Text>
        </View>
        
        {profileState && (
          <View style={styles.stateBox}>
            <Text style={styles.stateLabel}>Profile State:</Text>
            <Text>Available Properties: {Object.keys(profileState).join(', ')}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.footer}>
        Note: All state logs appear in the console. Open your dev tools to view them.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  stateBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  stateLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    marginBottom: 24,
  },
});

export default DevToolsScreen; 