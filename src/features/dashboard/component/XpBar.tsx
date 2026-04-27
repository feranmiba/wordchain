import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '@/src/shared/constant/theme';
import { MotiView } from 'moti';

interface XpBarProps {
  currentXp: number;
  xpToNextLevel: number;
  level: number;
}

export const XpBar: React.FC<XpBarProps> = ({ currentXp, xpToNextLevel, level }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  const totalXpRequired = currentXp + xpToNextLevel;
  const progress = (currentXp / totalXpRequired) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.levelText, { color: theme.textPrimary }]}>Level {level}</Text>
        <Text style={[styles.xpText, { color: theme.textSecondary }]}>
          {currentXp} / {totalXpRequired} XP
        </Text>
      </View>
      <View style={[styles.barBg, { backgroundColor: theme.bgTertiary }]}>
        <MotiView
          from={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', damping: 15 }}
          style={[styles.barFill, { backgroundColor: Colors.primary }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.xs,
  },
  levelText: {
    fontSize: FontSize.md,
    fontWeight: '800',
  },
  xpText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  barBg: {
    height: 10,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});
