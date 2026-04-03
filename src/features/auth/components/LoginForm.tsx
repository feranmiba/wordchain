import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Keyboard, useColorScheme } from 'react-native';
import { MotiView } from 'moti'; 
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { ResponseModal } from '../../../shared/components/ui/Modal';
import { Colors, FontSize, Spacing, Radius, Shadow } from '../../../shared/constant/theme';
import { useLogin } from '../hooks/useLogin';
import { LoginRequest } from '../types';

export const LoginForm: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  const [formData, setFormData] = useState<LoginRequest>({ email: '', password: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'info' as 'success' | 'error' | 'info' });

  const loginMutation = useLogin();

  const handleInputChange = (field: keyof LoginRequest) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!formData.email || !formData.password) {
      setModalConfig({ title: 'Check am!', message: 'Abeg, fill in your details!', type: 'error' });
      setModalVisible(true);
      return;
    }
    loginMutation.mutate(formData);
  };

  const entrance = (index: number) => ({
    from: { opacity: 0, translateY: 10 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'spring', damping: 15, delay: 400 + index * 100 } as const,
  });

  return (
    <View style={styles.formContainer}>
      <MotiView {...entrance(0)}>
        <Input
          label="Email"
          placeholder="School email or Email address"
          value={formData.email}
          onChangeText={handleInputChange('email')}
          autoCapitalize="none"
          // We assume Input component accepts a style or uses internal theme logic
          containerStyle={styles.inputGap}
          leftIcon={<Ionicons name="mail" size={20} color={Colors.primary} />}
        />
      </MotiView>

      <MotiView {...entrance(1)}>
        <Input
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChangeText={handleInputChange('password')}
          isPassword
          secureTextEntry
          containerStyle={styles.inputGap}
          leftIcon={<Ionicons name="lock-closed" size={20} color={Colors.primary} />}
        />
      </MotiView>

      <MotiView {...entrance(2)} style={styles.forgotAction}>
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={[styles.forgotText, { color: isDark ? Colors.secondaryLight : Colors.secondary }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </MotiView>

      <MotiView {...entrance(3)}>
        <Button
          title="Sign In"
          onPress={handleSubmit}
          loading={loginMutation.isPending}
          style={
            isDark
              ? { ...styles.button, shadowColor: '#000' }
              : styles.button
          }
          textStyle={styles.buttonText}
        />
      </MotiView>

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
  formContainer: { width: '100%' },
  inputGap: { marginBottom: Spacing.md },
  forgotAction: { alignSelf: 'flex-end', marginBottom: Spacing.xl },
  forgotText: { fontSize: FontSize.sm, fontWeight: '700' },
  button: {
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    ...Shadow.md,
  },
  buttonText: { fontSize: FontSize.lg, fontWeight: '800' },
});