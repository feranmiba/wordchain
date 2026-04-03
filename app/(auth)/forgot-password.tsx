import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthHeader } from '../../src/features/auth/components/AuthHeader';
import { ForgotPasswordForm } from '../../src/features/auth/components/ForgotPasswordForm';
import { Colors, Spacing } from '../../src/shared/constant/theme';

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AuthHeader
          title="Reset Password"
          subtitle="Forgot your password? No worries!"
        />

        <ForgotPasswordForm />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Remember your password? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  linkText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});