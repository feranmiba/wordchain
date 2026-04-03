import { Link } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SignUpForm } from '../../src/features/auth/components/SignUpForm';
import { Colors, FontSize, Spacing } from '../../src/shared/constant/theme';
// Importing your new tools
import { KeyboardAvoid } from '@/src/shared/components/layout/KeyboardAvoid';
import { ScreenWrapper } from '@/src/shared/components/layout/ScreenWrapper';

const { height } = Dimensions.get('window');

const FloatingNode = ({ delay, color, size, top, left }: any) => (
  <MotiView
    from={{ translateY: 0, opacity: 0.1 }}
    animate={{ translateY: -30, opacity: 0.2 }}
    transition={{ type: 'timing', duration: 4000, loop: true, repeatReverse: true, delay }}
    style={[styles.node, { backgroundColor: color, width: size, height: size, top, left, borderRadius: size / 2 }]}
  />
);

export default function SignupScreen() {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  return (
    <ScreenWrapper>
      {/* 1. Background Flair stays outside the keyboard scroll */}
      <FloatingNode color={Colors.primary} size={200} top={-40} left={-60} delay={0} />
      <FloatingNode color={Colors.secondary} size={120} top={height * 0.8} left={280} delay={1000} />

      {/* 2. KeyboardAvoid handles the centering and scrolling */}
      <KeyboardAvoid 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <MotiView 
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.header}
          >
            <Text style={[styles.title, { color: theme.textPrimary }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Join the WordChain community
            </Text>
          </MotiView>

          {/* Step 1 & 2 logic lives inside here */}
          <SignUpForm />

          <MotiView 
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1000 }}
            style={styles.footer}
          >
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
              Already have an account?{" "}
            </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </MotiView>
        </View>
      </KeyboardAvoid>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  node: { position: 'absolute', zIndex: -1 },
  // This ensures the form is centered vertically even if there's extra space
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['3xl'],
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize['4xl'],
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: FontSize.md,
    fontWeight: '500',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: { fontSize: FontSize.md },
  linkText: { color: Colors.primary, fontSize: FontSize.md, fontWeight: '800' },
});