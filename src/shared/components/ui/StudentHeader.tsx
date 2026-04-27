import React from 'react';
import { StyleSheet, Text, View, useColorScheme, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../../features/auth/store/authStore';
import { useUser } from '../../context/UserContext';
import { Colors, FontSize, Radius, Spacing } from '../../constant/theme';

export const StudentHeader = () => {
  const { user } = useAuthStore();
  const { userData } = useUser();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  return (
    <View style={[styles.container, { backgroundColor: Colors.primary }]}>
      <View style={styles.userInfo}>
        <View style={styles.textContainer}>
            <Text style={[styles.greeting, { color: 'rgba(255,255,255,0.8)' }]}>Welcome back,</Text>
            <Text style={[styles.name, { color: '#FFFFFF' }]}>
            {userData?.display_name || user?.first_name || 'Student'}
            </Text>
        </View>
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="sparkles" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>{userData?.current_xp || 0} XP</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="game-controller" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>{userData?.games_played || 0} Played</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconDecoration}>
         <Ionicons name="flash" size={120} color="rgba(255,255,255,0.15)" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['3xl'],
    paddingTop: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    overflow: 'hidden',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  iconDecoration: {
    position: 'absolute',
    right: -10,
    bottom: -5,
    zIndex: 1,
  },
});
