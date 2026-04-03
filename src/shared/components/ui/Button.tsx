import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constant/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    let baseStyle: ViewStyle[] = [styles.button, styles[size]];

    if (disabled || loading) {
      baseStyle = [...baseStyle, styles.disabled];
    } else {
      switch (variant) {
        case 'primary':
          baseStyle = [...baseStyle, styles.primary];
          break;
        case 'secondary':
          baseStyle = [...baseStyle, styles.secondary];
          break;
        case 'outline':
          baseStyle = [...baseStyle, styles.outline];
          break;
      }
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    let baseStyle: TextStyle[] = [styles.text, styles[`${size}Text`]];

    if (disabled || loading) {
      baseStyle = [...baseStyle, styles.disabledText];
    } else {
      switch (variant) {
        case 'primary':
          baseStyle = [...baseStyle, styles.primaryText];
          break;
        case 'secondary':
          baseStyle = [...baseStyle, styles.secondaryText];
          break;
        case 'outline':
          baseStyle = [...baseStyle, styles.outlineText];
          break;
      }
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textInverse} size="small" />
      ) : (
        <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.textSecondary,
    borderColor: Colors.textSecondary,
  },
  text: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: Colors.textInverse,
  },
  secondaryText: {
    color: Colors.textInverse,
  },
  outlineText: {
    color: Colors.primary,
  },
  disabledText: {
    color: Colors.textInverse,
  },
});