import React from 'react';
import { StyleSheet, View, Text, useColorScheme, ScrollView } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../../src/shared/constant/theme';
import { StudentHeader } from '../../src/shared/components/ui/StudentHeader';
import { MotiView } from 'moti';

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  const stats = [
    { label: 'Games Played', value: '0', color: Colors.primary },
    { label: 'Words Chained', value: '0', color: Colors.secondary },
    { label: 'Win Rate', value: '0%', color: Colors.highlight },
    { label: 'Highest Score', value: '0', color: Colors.info },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      <StudentHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Performance Stats</Text>
        
        <View style={styles.grid}>
          {stats.map((stat, index) => (
            <MotiView
              key={stat.label}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100 }}
              style={[styles.statCard, { backgroundColor: theme.bgSecondary }]}
            >
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
            </MotiView>
          ))}
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
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '47%',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  statValue: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textAlign: 'center',
  },
});
