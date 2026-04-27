import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '@/src/shared/constant/theme';
import { DashboardResponse } from '../../auth/types';
import { MotiView } from 'moti';

interface StatsGridProps {
  stats: DashboardResponse;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  const statItems = [
    { label: 'Words Mastered', value: stats.words_mastered, color: Colors.primary },
    { label: 'Win Streak', value: stats.current_win_streak, color: Colors.secondary },
    { label: 'Total XP', value: stats.total_xp, color: Colors.highlight },
    { label: 'Global Rank', value: `#${stats.global_rank}`, color: Colors.info },
  ];

  return (
    <View style={styles.grid}>
      {statItems.map((item, index) => (
        <MotiView
          key={item.label}
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: index * 100 }}
          style={[styles.statCard, { backgroundColor: theme.bgSecondary }]}
        >
          <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{item.label}</Text>
        </MotiView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '47%',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textAlign: 'center',
  },
});
