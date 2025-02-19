import React, { useState } from "react";
import { Alert } from "react-native";
import { resendSignUpCode } from "aws-amplify/auth";
import { CustomConfirmSignUp } from "./CustomConfirmSignUp";
import { CustomSignUp } from "./CustomSignUp";
import { CustomSignIn } from "./CustomSignIn";
import { PreLogin } from "./CustomPreLogin";

type AuthState = 'preLogin' | 'signIn' | 'signUp' | 'confirmSignUp';

export interface CustomAuthFlowProps {
  onAuthComplete: () => void;
}

export default function CustomAuthFlow({ onAuthComplete }: CustomAuthFlowProps) {
  const [authState, setAuthState] = useState<AuthState>('preLogin');
  const [emailForConfirmation, setEmailForConfirmation] = useState('');
  const [history, setHistory] = useState<AuthState[]>(['preLogin']);

  function goToState(next: AuthState) {
    setHistory(prev => [...prev, next]);
    setAuthState(next);
  }

  function goBack() {
    setHistory(prev => {
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        const newState = newHistory[newHistory.length - 1];
        setAuthState(newState);
        return newHistory;
      }
      return prev;
    })
  }

  const handleSignUpSuccess = (email: string) => {
    setEmailForConfirmation(email);
    goToState('confirmSignUp');
  };

  const handleConfirmSuccess = () => {
    goToState('signIn');
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({username: emailForConfirmation});
      Alert.alert('Success', 'Nowy kod weryfikacyjny został wysłany.');
    } catch (err) {
      Alert.alert('Error', (err as any).message || 'Error resending code');
    }
  };

  if (authState === 'preLogin') {
    return (
      <PreLogin
        onSignInPress={() => goToState('signIn')}
        onSignUpPress={() => goToState('signUp')}
      />
    );
  }

  return (
    <>
      {authState === 'signIn' && (
        <CustomSignIn
          onSwitchToSignUp={() => goToState('signUp')}
          onSignInSuccess={onAuthComplete}
          onBackPress={goBack}
        />
      )}
      {authState === 'signUp' && (
        <CustomSignUp
          onSwitchToSignIn={() => goToState('signIn')}
          onSignUpSuccess={handleSignUpSuccess}
          onBackPress={goBack}
        />
      )}
      {authState === 'confirmSignUp' && (
        <CustomConfirmSignUp
          email={emailForConfirmation}
          onConfirmSuccess={handleConfirmSuccess}
          onResendCode={handleResendCode}
        />
      )}
    </>
  );
}