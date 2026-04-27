import React from 'react';
import { StyleSheet, View, Text, useColorScheme, TouchableOpacity } from 'react-native';
import { Colors, FontSize, Spacing, Radius, Shadow } from '@/src/shared/constant/theme';
import { MyPosition } from '../../auth/types';
import { Ionicons } from '@expo/vector-icons';

interface UserPositionCardProps {
  position: MyPosition;
  onViewAll: () => void;
}

export const UserPositionCard: React.FC<UserPositionCardProps> = ({ position, onViewAll }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? Colors.dark.bgSecondary : '#FFFFFF' }]}>
      <View style={styles.content}>
        <View style={styles.rankInfo}>
          <View style={[styles.rankBadge, { backgroundColor: Colors.highlightMuted }]}>
            <Ionicons name="trophy" size={20} color={Colors.highlight} />
          </View>
          <View>
            <Text style={[styles.rankText, { color: theme.textPrimary }]}>
                Rank <Text style={{ color: Colors.primary }}>#{position.rank}</Text>
            </Text>
            <Text style={[styles.percentileText, { color: theme.textSecondary }]}>
                Top {position.percentile}% Globally
            </Text>
          </View>
        </View>

        <View style={styles.tierInfo}>
             <View style={[styles.tierBadge, { backgroundColor: Colors.secondaryMuted }]}>
                <Text style={[styles.tierText, { color: Colors.secondary }]}>{position.tier}</Text>
             </View>
        </View>
      </View>
      
      <TouchableOpacity style={[styles.viewAllBtn, { borderTopColor: theme.border }]} onPress={onViewAll}>
        <Text style={[styles.viewAllText, { color: theme.textSecondary }]}>View Full Leaderboard</Text>
        <Ionicons name="arrow-forward" size={16} color={theme.textTertiary} />
      </TouchableOpacity>
      
      <Ionicons name="ribbon" size={100} color={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} style={styles.bgIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xl,
    marginVertical: Spacing.md,
    overflow: 'hidden',
    ...Shadow.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  rankBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  percentileText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  tierInfo: {
    alignItems: 'flex-end',
  },
  tierBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  tierText: {
    fontSize: FontSize.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    gap: Spacing.xs,
  },
  viewAllText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  bgIcon: {
    position: 'absolute',
    right: -20,
    top: -10,
    zIndex: -1,
  },
});
