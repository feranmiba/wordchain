import React from 'react';
import { StyleSheet, View, Text, useColorScheme, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Colors, FontSize, Spacing, Radius, Shadow } from '../../src/shared/constant/theme';
import { useAuthStore } from '../../src/features/auth/store/authStore';
import { useUser } from '../../src/shared/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { logout } = useAuthStore();
  const { userData, loading } = useUser();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  if (loading && !userData) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.bgPrimary }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const menuItems = [
    { icon: 'wallet-outline', label: `Wallet (₦${((userData?.wallet_balance_kobo || 0) / 100).toFixed(2)})`, route: '/wallet' },
    { icon: 'person-outline', label: 'Personal Information' },
    { icon: 'notifications-outline', label: 'Notifications' },
    { icon: 'shield-checkmark-outline', label: 'Security' },
    { icon: 'help-circle-outline', label: 'Help & Support' },
    { icon: 'information-circle-outline', label: 'About WordChain' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.profileHeaderBg, { backgroundColor: Colors.primary }]}>
            <View style={styles.header}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Text style={[styles.avatarText, { color: '#FFFFFF' }]}>
                    {userData?.display_name?.charAt(0).toUpperCase() || userData?.email?.charAt(0).toUpperCase() || 'S'}
                </Text>
            </View>
            <Text style={[styles.name, { color: '#FFFFFF' }]}>
                    {userData?.display_name || 'Student'}
            </Text>
            <Text style={[styles.email, { color: 'rgba(255,255,255,0.8)' }]}>
                    {userData?.email}
            </Text>
            
            <View style={styles.statsOverview}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: '#FFFFFF' }]}>{userData?.games_played || 0}</Text>
                        <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.7)' }]}>Games</Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: '#FFFFFF' }]}>{((userData?.win_rate || 0) * 100).toFixed(0)}%</Text>
                        <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.7)' }]}>Win Rate</Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: '#FFFFFF' }]}>{userData?.current_xp || 0}</Text>
                        <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.7)' }]}>XP</Text>
                    </View>
            </View>
            </View>
        </View>

        <View style={styles.menuWrapper}>
            <View style={[styles.menuContainer, { backgroundColor: theme.bgSecondary }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.menuItem, { borderBottomColor: theme.border }]}
              onPress={() => item.route && router.push(item.route as any)}
            >
              <Ionicons name={item.icon as any} size={22} color={theme.textSecondary} />
              <Text style={[styles.menuLabel, { color: theme.textPrimary }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: isDark ? Colors.dark.bgSecondary : '#FFF' }]} 
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color={Colors.error} />
          <Text style={[styles.logoutText, { color: Colors.error }]}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeaderBg: {
    paddingTop: 80,
    paddingBottom: 40,
    borderBottomLeftRadius: Radius.xl * 1.5,
    borderBottomRightRadius: Radius.xl * 1.5,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: FontSize['3xl'],
    fontWeight: '800',
  },
  name: {
    fontSize: FontSize.xl,
    fontWeight: '800',
  },
  email: {
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  statsOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xl,
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: FontSize.md,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 20,
  },
  menuWrapper: {
    paddingHorizontal: Spacing.lg,
    marginTop: -20,
  },
  menuContainer: {
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    ...Shadow.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing['2xl'],
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.errorMuted,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
});
