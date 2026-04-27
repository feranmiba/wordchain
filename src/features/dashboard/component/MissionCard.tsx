import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '@/src/shared/constant/theme';
import { Mission } from '../../auth/types';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

interface MissionCardProps {
  mission: Mission;
  index: number;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, index }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  const progress = (mission.progress / mission.max_progress) * 100;

  return (
    <MotiView
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: index * 100 }}
      style={[styles.container, { backgroundColor: theme.bgSecondary }]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: mission.completed ? Colors.successMuted : Colors.primaryMuted }]}>
          <Ionicons 
            name={mission.completed ? "checkmark-circle" : "flag"} 
            size={20} 
            color={mission.completed ? Colors.success : Colors.primary} 
          />
        </View>
        <View style={styles.info}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>{mission.title}</Text>
          <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={1}>
            {mission.description}
          </Text>
        </View>
        <View style={styles.reward}>
          <Text style={[styles.rewardText, { color: Colors.highlight }]}>+{mission.reward.amount} XP</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={[styles.progressBarBg, { backgroundColor: theme.bgTertiary }]}>
          <MotiView
            from={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 15 }}
            style={[styles.progressBarFill, { backgroundColor: mission.completed ? Colors.success : Colors.primary }]}
          />
        </View>
        <Text style={[styles.progressText, { color: theme.textTertiary }]}>
          {mission.progress}/{mission.max_progress}
        </Text>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  description: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  reward: {
    alignItems: 'flex-end',
  },
  rewardText: {
    fontSize: FontSize.xs,
    fontWeight: '800',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '700',
    minWidth: 35,
    textAlign: 'right',
  },
});
