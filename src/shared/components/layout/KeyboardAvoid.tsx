import React from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard,
  ViewProps
} from 'react-native';

interface KeyboardAvoidProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: object;
}

export const KeyboardAvoid: React.FC<KeyboardAvoidProps> = ({ 
  children, 
  scrollable = true, 
  contentContainerStyle,
  style 
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, style]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {scrollable ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});