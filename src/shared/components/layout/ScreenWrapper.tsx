import React from 'react';
import { StyleSheet, View, ViewProps, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constant/theme';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  withSafeArea?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ 
  children, 
  style, 
  withSafeArea = true,
  ...props 
}) => {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? Colors.dark : Colors;
  
  const Container = withSafeArea ? SafeAreaView : View;

  return (
    <Container 
      style={[styles.container, { backgroundColor: isDark ? theme.bgPrimary : Colors.bgSecondary }, style]} 
      {...props}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});