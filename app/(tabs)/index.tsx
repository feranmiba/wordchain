import React from 'react';
import { StyleSheet, View, Text, useColorScheme, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Colors, FontSize, Spacing, Radius, Shadow } from '../../src/shared/constant/theme';
import { StudentHeader } from '../../src/shared/components/ui/StudentHeader';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardStats, useUserPosition, useDailyMissions } from '@/src/features/dashboard/hooks/useDashboard';
import { StatsGrid } from '@/src/features/dashboard/component/StatsGrid';
import { UserPositionCard } from '@/src/features/dashboard/component/UserPositionCard';
import { XpBar } from '@/src/features/dashboard/component/XpBar';
import { MissionCard } from '@/src/features/dashboard/component/MissionCard';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: position, isLoading: posLoading } = useUserPosition();
  const { data: dailyMissions, isLoading: missionsLoading } = useDailyMissions();

  if (statsLoading || posLoading || missionsLoading) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.bgPrimary }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (statsError || !stats) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: theme.bgPrimary }]}>
        <Text style={{ color: Colors.error }}>Failed to load dashboard data</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      <StudentHeader />
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <XpBar 
          currentXp={stats.current_xp} 
          xpToNextLevel={stats.xp_to_next_level} 
          level={stats.level} 
        />

        {position && (
          <UserPositionCard 
            position={position} 
            onViewAll={() => router.push('/rank')} 
          />
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Quick Stats</Text>
          <StatsGrid stats={stats} />
        </View>

        <MotiView 
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={[styles.heroCard, { backgroundColor: theme.bgSecondary }]}
        >
          <View style={styles.heroContent}>
            <Text style={[styles.heroTitle, { color: theme.textPrimary }]}>Ready to Chain?</Text>
            <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>Challenge yourself and earn points</Text>
            <TouchableOpacity 
              style={[styles.playButton, { backgroundColor: Colors.primary }]}
              onPress={() => router.push('/play')}
            >
              <Text style={styles.playButtonText}>Start Playing</Text>
              <Ionicons name="play" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Ionicons name="game-controller" size={80} color={Colors.primaryMuted} style={styles.heroIcon} />
        </MotiView>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Daily Missions</Text>
          {dailyMissions?.missions.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
          {(!dailyMissions || dailyMissions.missions.length === 0) && (
            <Text style={{ color: theme.textTertiary, textAlign: 'center', marginTop: Spacing.md }}>
              No missions available for today.
            </Text>
          )}
        </View>
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
  content: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  heroCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadow.sm,
  },
  heroContent: {
    flex: 1,
    zIndex: 1,
  },
  heroTitle: {
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    fontSize: FontSize.sm,
    marginBottom: Spacing.lg,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    gap: Spacing.xs,
  },
  playButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: FontSize.md,
  },
  heroIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  missionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    gap: Spacing.md,
  },
  missionInfo: {
    flex: 1,
  },
  missionName: {
    fontWeight: '700',
    fontSize: FontSize.md,
  },
  missionProgress: {
    fontSize: FontSize.xs,
  },
  missionReward: {
    fontWeight: '800',
    fontSize: FontSize.sm,
  },
});