import React from 'react';
import { StyleSheet, View, Text, useColorScheme, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../../src/shared/constant/theme';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

export default function PlayScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
           <Ionicons name="close" size={28} color={theme.textPrimary} />
        </TouchableOpacity>
        <View style={styles.timerContainer}>
           <Ionicons name="time-outline" size={20} color={Colors.primary} />
           <Text style={[styles.timerText, { color: theme.textPrimary }]}>00:30</Text>
        </View>
        <View style={styles.scoreContainer}>
           <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>Score</Text>
           <Text style={[styles.scoreValue, { color: theme.textPrimary }]}>0</Text>
        </View>
      </View>

      <View style={styles.gameArea}>
        <MotiView 
          from={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={styles.wordContainer}
        >
          <Text style={[styles.wordText, { color: Colors.primary }]}>START</Text>
        </MotiView>
        
        <Text style={[styles.instruction, { color: theme.textSecondary }]}>
          Enter a word starting with 'T'
        </Text>
      </View>

      <View style={styles.inputPlaceholder}>
         {/* Keyboard will be here in real implementation */}
         <View style={[styles.fakeInput, { backgroundColor: theme.bgSecondary }]}>
            <Text style={{ color: theme.textTertiary }}>Type your word here...</Text>
         </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: Spacing.xs,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primaryMuted,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  timerText: {
    fontWeight: '800',
    fontSize: FontSize.md,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordContainer: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primaryMuted,
    marginBottom: Spacing.lg,
  },
  wordText: {
    fontSize: FontSize['5xl'],
    fontWeight: '900',
    letterSpacing: 4,
  },
  instruction: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  inputPlaceholder: {
    padding: Spacing.xl,
    paddingBottom: 40,
  },
  fakeInput: {
    height: 60,
    borderRadius: Radius.lg,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
});
