import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { ResponseModal } from '../../../shared/components/ui/Modal';
import { Colors, FontSize, Spacing } from '../../../shared/constant/theme';
import { useForgotPassword } from '../hooks/useForgotPassword';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'info',
  });

  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = () => {
    if (!email) {
      setModalConfig({
        title: 'Validation Error',
        message: 'Please enter your email address',
        type: 'error',
      });
      setModalVisible(true);
      return;
    }

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: (data) => {
          setModalConfig({
            title: 'Success',
            message: data.message || 'Password reset instructions sent to your email',
            type: 'success',
          });
          setModalVisible(true);
        },
        onError: (error: any) => {
          setModalConfig({
            title: 'Error',
            message: error.response?.data?.message || 'An error occurred',
            type: 'error',
          });
          setModalVisible(true);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Enter your email address and we&apos;ll send you instructions to reset your password.
      </Text>

      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button
        title="Send Reset Instructions"
        onPress={handleSubmit}
        loading={forgotPasswordMutation.isPending}
        style={styles.button}
      />

      <ResponseModal
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  button: {
    marginTop: Spacing.md,
  },
});