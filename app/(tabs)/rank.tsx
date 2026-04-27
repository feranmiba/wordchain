import React from 'react';
import { StyleSheet, View, Text, useColorScheme, ScrollView, Image } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../../src/shared/constant/theme';
import { StudentHeader } from '../../src/shared/components/ui/StudentHeader';
import { Ionicons } from '@expo/vector-icons';

export default function RankScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  const rankings = [
    { rank: 1, name: 'Chidubem', points: '12,450', avatar: 'https://i.pravatar.cc/150?u=1' },
    { rank: 2, name: 'Ayo', points: '11,200', avatar: 'https://i.pravatar.cc/150?u=2' },
    { rank: 3, name: 'Blessing', points: '10,800', avatar: 'https://i.pravatar.cc/150?u=3' },
    { rank: 4, name: 'Tunde', points: '9,500', avatar: 'https://i.pravatar.cc/150?u=4' },
    { rank: 5, name: 'Sarah', points: '8,900', avatar: 'https://i.pravatar.cc/150?u=5' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      <StudentHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topThree}>
           <View style={styles.podiumItem}>
              <Ionicons name="medal" size={32} color="#C0C0C0" />
              <Text style={[styles.podiumName, { color: theme.textPrimary }]}>Ayo</Text>
              <Text style={[styles.podiumPoints, { color: Colors.secondary }]}>11.2k</Text>
           </View>
           <View style={[styles.podiumItem, styles.podiumFirst]}>
              <Ionicons name="trophy" size={48} color={Colors.highlight} />
              <Text style={[styles.podiumName, { color: theme.textPrimary, fontSize: FontSize.lg }]}>Chidubem</Text>
              <Text style={[styles.podiumPoints, { color: Colors.primary }]}>12.4k</Text>
           </View>
           <View style={styles.podiumItem}>
              <Ionicons name="medal" size={32} color="#CD7F32" />
              <Text style={[styles.podiumName, { color: theme.textPrimary }]}>Blessing</Text>
              <Text style={[styles.podiumPoints, { color: Colors.secondary }]}>10.8k</Text>
           </View>
        </View>

        <View style={styles.listContainer}>
          {rankings.map((item) => (
            <View key={item.rank} style={[styles.rankItem, { borderBottomColor: theme.border }]}>
               <Text style={[styles.rankNumber, { color: theme.textTertiary }]}>{item.rank}</Text>
               <View style={styles.userInfo}>
                  <Text style={[styles.userName, { color: theme.textPrimary }]}>{item.name}</Text>
               </View>
               <Text style={[styles.userPoints, { color: theme.textPrimary }]}>{item.points} pts</Text>
            </View>
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
  topThree: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  podiumItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  podiumFirst: {
    transform: [{ translateY: -20 }],
  },
  podiumName: {
    fontWeight: '800',
    fontSize: FontSize.sm,
  },
  podiumPoints: {
    fontWeight: '700',
    fontSize: FontSize.xs,
  },
  listContainer: {
    marginTop: Spacing.md,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  rankNumber: {
    width: 30,
    fontSize: FontSize.md,
    fontWeight: '800',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  userPoints: {
    fontSize: FontSize.sm,
    fontWeight: '800',
  },
});
