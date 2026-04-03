import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import AnimatedWordChain from '../../src/shared/components/AnimatedWordChain'; // Updated to not redirect
import { Button } from '../../src/shared/components/ui/Button';
import { Colors, FontSize, Spacing, Radius } from '../../src/shared/constant/theme';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  return (
    <View style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      
      {/* 1. THE ANIMATED LOGO AREA */}
      <View style={styles.logoSection}>
        {/* Note: Ensure AnimatedWordChain doesn't have router.replace inside if used here */}
        <AnimatedWordChain /> 
      </View>

      {/* 2. DESCRIPTION & BUTTONS */}
      <MotiView 
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 2500 }} // Wait for logo animation
        style={styles.content}
      >
        <View style={styles.description}>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Master the dictionary, chain the words, dominate the leaderboard and earn while playing.
          </Text>
        </View>

        <View style={styles.buttons}>
          <Button
            title="Get Started"
            onPress={() => router.push('/login')}
            style={styles.primaryButton}
          />
          
          <TouchableOpacity 
            onPress={() => router.push('/login')}
            style={styles.loginTrigger}
          >
            <Text style={styles.loginText}>
              Already a Chainer? <Text style={{ color: Colors.primary, fontWeight: '800' }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoSection: {
    flex: 0.6, // Gives more room to the animation
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 0.4,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  description: {
    marginBottom: Spacing['2xl'],
  },
  subtitle: {
    fontSize: FontSize.md,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    maxWidth: 320,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
  },
  loginTrigger: {
    marginTop: Spacing.lg,
  },
  loginText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});