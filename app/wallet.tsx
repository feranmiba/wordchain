import React from 'react';
import { StyleSheet, View, Text, useColorScheme, ScrollView } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../src/shared/constant/theme';
import { StudentHeader } from '../src/shared/components/ui/StudentHeader';
import { MotiView } from 'moti';

export default function WalletScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  return (
    <View style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      <StudentHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <MotiView 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={[styles.balanceCard, { backgroundColor: Colors.primary }]}
        >
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₦0.00</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardId}>WordChain Wallet</Text>
          </View>
        </MotiView>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <View style={[styles.actionItem, { backgroundColor: theme.bgSecondary }]}>
              <Text style={[styles.actionText, { color: theme.textPrimary }]}>Deposit</Text>
            </View>
            <View style={[styles.actionItem, { backgroundColor: theme.bgSecondary }]}>
              <Text style={[styles.actionText, { color: theme.textPrimary }]}>Withdraw</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  balanceCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    height: 180,
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  balanceAmount: {
    color: '#FFF',
    fontSize: FontSize['4xl'],
    fontWeight: '800',
  },
  cardFooter: {
    marginTop: Spacing.lg,
    opacity: 0.7,
  },
  cardId: {
    color: '#FFF',
    fontSize: FontSize.xs,
  },
  section: {
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionItem: {
    flex: 1,
    height: 80,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontWeight: '600',
  },
});
