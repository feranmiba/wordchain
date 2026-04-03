import { useRouter } from 'expo-router';
import { MotiView, MotiText } from 'moti';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View, useColorScheme } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useAuthStore } from '../../features/auth/store/authStore';
import { Colors } from '../constant/theme';

const { width, height } = Dimensions.get('window');
const TAIL = 'ordchain';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  // Theme Detection
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  useEffect(() => {
    // Increased duration to 4500ms so students can actually feel the "steeze"
    const timer = setTimeout(() => {
      router.replace(isAuthenticated ? '/(tabs)' : '/(auth)/login');
    }, 45000); 
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  // Helper for dynamic colors
  const tailColor = (i: number): string => {
    const ratio = i / (TAIL.length - 1);
    // In dark mode, we use the lighter variants so they "pop"
    const startColor = isDark ? Colors.primaryLight : Colors.primary;
    const endColor = isDark ? Colors.secondaryLight : Colors.secondary;
    return ratio < 0.5 ? startColor : endColor;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      
      {/* ── Background Glow Blobs (Lower opacity for Dark Mode) ── */}
      <MotiView
        from={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: isDark ? 0.12 : 0.18, scale: 1.2 }}
        transition={{ type: 'timing', duration: 1500 }}
        style={[styles.blob1, { backgroundColor: Colors.primary }]}
      />
      <MotiView
        from={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: isDark ? 0.08 : 0.12, scale: 1.1 }}
        transition={{ type: 'timing', duration: 1800, delay: 300 }}
        style={[styles.blob2, { backgroundColor: Colors.secondary }]}
      />

      <View style={styles.wordRow}>
        {/* ── Bouncy W ── */}
        <MotiView
          from={{ translateY: -80, opacity: 0, scale: 0.5 }}
          animate={{ translateY: 0, opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 6,
            stiffness: 180,
            mass: 0.8,
          }}
          style={styles.wContainer}
        >
          <MotiView
            from={{ translateY: 0 }}
            animate={{ translateY: [0, -22, 0, -14, 0, -7, 0] }}
            transition={{
              type: 'timing',
              duration: 1100, // Slightly slower bounce
              delay: 400,
              easing: Easing.out(Easing.quad),
            }}
          >
            <Animated.Text style={[styles.wLetter, { color: isDark ? Colors.primaryLight : Colors.primary }]}>
              W
            </Animated.Text>
          </MotiView>
        </MotiView>

        {/* ── "ordchain" slides in ── */}
        {TAIL.split('').map((char, i) => (
          <MotiView
            key={i}
            from={{ translateX: 60, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              damping: 14,
              stiffness: 160,
              delay: 850 + i * 60, // Staggered slightly more
            }}
          >
            <Animated.Text style={[styles.tailLetter, { color: tailColor(i) }]}>
              {char}
            </Animated.Text>
          </MotiView>
        ))}
      </View>

      {/* ── Tagline ── */}
      <MotiView
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 1800 }}
      >
        <Animated.Text style={[styles.tagline, { color: theme.textTertiary }]}>
          Level up your vocabulary
        </Animated.Text>
      </MotiView>

      {/* ── Bottom dots loader ── */}
      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ opacity: 0.2, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'timing',
              duration: 600,
              delay: 2200 + i * 200,
              loop: true,
              repeatReverse: true,
            }}
            style={[
              styles.dot, 
              { backgroundColor: i === 1 ? (isDark ? Colors.secondaryLight : Colors.secondary) : (isDark ? Colors.primaryLight : Colors.primary) }
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blob1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    top: height * 0.05,
    left: -100,
    filter: 'blur(40px)', // If your environment supports blur
  },
  blob2: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    bottom: height * 0.1,
    right: -80,
    filter: 'blur(40px)',
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  wContainer: {
    marginRight: 1,
  },
  wLetter: {
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 72,
  },
  tailLetter: {
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 72,
  },
  tagline: {
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: '600',
    marginTop: 8,
    textTransform: 'uppercase', // Makes it look cleaner
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 12,
    position: 'absolute',
    bottom: 80,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});