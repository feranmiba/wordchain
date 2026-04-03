import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal as RNModal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../../constant/theme';

interface ResponseModalProps {
  visible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const ResponseModal: React.FC<ResponseModalProps> = ({
  visible,
  title,
  message,
  type,
  onClose,
}) => {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  // Custom colors for status types that look good in both modes
  const config = {
    success: { 
        icon: 'checkmark-circle' as const, 
        color: isDark ? '#4ADE80' : '#22C55E' 
    },
    error: { 
        icon: 'close-circle' as const, 
        color: isDark ? '#FB7185' : '#EF4444' 
    },
    info: { 
        icon: 'information-circle' as const, 
        color: isDark ? Colors.primaryLight : Colors.primary 
    },
  };

  const current = config[type];

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent // Ensures overlay covers the status bar too
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable 
          style={[
            styles.modal, 
            { 
                backgroundColor: isDark ? theme.bgSecondary : '#FFFFFF',
                borderColor: isDark ? theme.border : 'transparent',
                borderWidth: isDark ? 1 : 0
            }
          ]}
        >
          {/* Icon Header with dynamic soft glow background */}
          <View style={[styles.iconContainer, { backgroundColor: current.color + '20' }]}>
            <Ionicons name={current.icon} size={44} color={current.color} />
          </View>

          <View style={styles.content}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>
            <Text style={[styles.message, { color: theme.textSecondary }]}>{message}</Text>
          </View>

          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[styles.button, { backgroundColor: current.color }]} 
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Got it</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Slightly darker for focus
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modal: {
    borderRadius: Radius.xl,
    width: '100%',
    maxWidth: 320,
    padding: Spacing.xl,
    alignItems: 'center',
    // Premium shadow for dark mode
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  content: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    marginBottom: Spacing.xs,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  message: {
    fontSize: FontSize.md,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Text on buttons usually stays white for contrast
    fontSize: FontSize.md,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});