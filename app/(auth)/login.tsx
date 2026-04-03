import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, useColorScheme } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { LoginForm } from '../../src/features/auth/components/LoginForm';
import { Colors, Spacing, FontSize, Shadow } from '../../src/shared/constant/theme';

const { height, width } = Dimensions.get('window');

const FloatingNode = ({ delay, color, size, top, left }: any) => (
  <MotiView
    from={{ translateY: 0, opacity: 0.1 }}
    animate={{ translateY: -30, opacity: 0.2 }}
    transition={{ type: 'timing', duration: 4000, loop: true, repeatReverse: true, delay }}
    style={[styles.node, { backgroundColor: color, width: size, height: size, top, left, borderRadius: size / 2 }]}
  />
);

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Theme selection logic
  const theme = isDark ? Colors.dark : Colors;
  const bgColor = isDark ? theme.bgPrimary : Colors.bgSecondary;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* 1. Background Nodes adapt to theme */}
      <FloatingNode color={Colors.primary} size={250} top={-60} left={-80} delay={0} />
      <FloatingNode color={isDark ? Colors.secondaryDark : Colors.secondaryLight} size={150} top={height * 0.75} left={width * 0.7} delay={1000} />

      <View style={styles.content}>
        <View style={styles.header}>
          <MotiView
            from={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            style={[styles.logoCircle, { backgroundColor: Colors.primaryMuted, borderColor: isDark ? Colors.primary : '#FFF' }]}
          >
            <Ionicons name="link" size={40} color={Colors.primary} />
          </MotiView>
          
          <MotiText 
            style={[styles.brandTitle, { color: theme.textPrimary }]}
          >
            WordChain
          </MotiText>
          <MotiText 
            style={[styles.brandSubtitle, { color: theme.textSecondary }]}
          >
            Connect words, connect minds
          </MotiText>
        </View>

        <LoginForm />

        <MotiView 
          from={{ opacity: 0, translateY: 20 }} 
          animate={{ opacity: 1, translateY: 0 }} 
          transition={{ type: 'timing', duration: 600, delay: 900 }}
          style={styles.footer}
        >
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>New Student? </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.linkText}>Create Account</Text>
            </TouchableOpacity>
          </Link>
        </MotiView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  node: { position: 'absolute', zIndex: -1 },
  content: { flex: 1, paddingHorizontal: Spacing.xl, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: Spacing['3xl'] },
  logoCircle: {
     width: 80, height: 80, borderRadius: 40,
     justifyContent: 'center', alignItems: 'center',
     marginBottom: Spacing.md, borderWidth: 2,
  },
  brandTitle: { fontSize: FontSize['5xl'], fontWeight: '900', letterSpacing: -1.5 },
  brandSubtitle: { fontSize: FontSize.md, fontWeight: '200', marginTop: Spacing.xs },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing['2xl'] },
  footerText: { fontSize: FontSize.md },
  linkText: { color: Colors.primary, fontSize: FontSize.md, fontWeight: '800' },
});