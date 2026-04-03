import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
    useColorScheme,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '../../constant/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  isPassword = false,
  containerStyle,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Detect Theme
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  // Dynamic Colors based on State + Theme
  const borderColor = error
    ? Colors.error
    : focused
    ? Colors.primary
    : theme.border;

  const inputBg = isDark ? theme.bgSecondary : Colors.bgSecondary;
  const textColor = theme.textPrimary;
  const labelColor = theme.textSecondary;
  const placeholderColor = isDark ? theme.textTertiary : Colors.textTertiary;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color: labelColor }]}>{label}</Text>}

      <View style={[
        styles.inputWrapper, 
        { 
          borderColor, 
          backgroundColor: inputBg,
          // Add a subtle glow when focused in dark mode
          shadowColor: Colors.primary,
          shadowOpacity: focused && isDark ? 0.2 : 0,
          shadowRadius: 8,
          elevation: focused && isDark ? 2 : 0
        }
      ]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            { color: textColor },
            leftIcon ? styles.inputWithLeft : null,
            (rightIcon || isPassword) ? styles.inputWithRight : null,
          ]}
          placeholderTextColor={placeholderColor}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor={Colors.primary} // Matches LASU theme cursor
          {...props}
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={() => setShowPassword((v) => !v)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={focused ? Colors.primary : theme.textTertiary}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.iconRight}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={[styles.hint, { color: theme.textTertiary }]}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Radius.lg, // Increased for that "sleek" look
    minHeight: 58,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  inputWithLeft: {
    paddingLeft: Spacing.xs,
  },
  inputWithRight: {
    paddingRight: Spacing.xs,
  },
  iconLeft: {
    paddingLeft: Spacing.md,
    justifyContent: 'center',
  },
  iconRight: {
    paddingRight: Spacing.md,
    justifyContent: 'center',
  },
  error: {
    fontSize: FontSize.xs,
    color: Colors.error,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 4,
  },
  hint: {
    fontSize: FontSize.xs,
    marginTop: 6,
    marginLeft: 4,
  },
});