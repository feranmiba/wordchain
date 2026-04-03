import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, useColorScheme, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { ResponseModal } from '../../../shared/components/ui/Modal';
import { Spacing, Colors, Radius, Shadow, FontSize } from '../../../shared/constant/theme';
import { useSignup } from '../hooks/useSignup';
import { SignupRequest } from '../types';

export const SignUpForm: React.FC = () => {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? Colors.dark : Colors;

  const [step, setStep] = useState(1); // 1 or 2
  const [formData, setFormData] = useState<SignupRequest>({
    email: '', first_name: '', last_name: '',
    password: '', matric_no: '', referral_code: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', type: 'info' as 'success' | 'error' | 'info' });

  const signupMutation = useSignup();

  const handleInputChange = (field: keyof SignupRequest) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      setModalConfig({ title: 'Hold on!', message: 'Abeg, fill your name and email first.', type: 'error' });
      setModalVisible(true);
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    if (!formData.password || !formData.matric_no) {
      setModalConfig({ title: 'Almost there!', message: 'Matric number and password are required!', type: 'error' });
      setModalVisible(true);
      return;
    }
    signupMutation.mutate(formData);
  };

  const entrance = (index: number) => ({
    from: { opacity: 0, translateX: 20 },
    animate: { opacity: 1, translateX: 0 },
    transition: { type: 'spring', damping: 15, delay: index * 100 } as const,
  });

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: Colors.primary, width: step === 1 ? '50%' : '100%' }]} />
      </View>
      <Text style={[styles.stepText, { color: theme.textTertiary }]}>Step {step} of 2</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AnimatePresence exitBeforeEnter>
          {step === 1 ? (
            <MotiView key="step1" from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, translateX: -50 }}>
              <MotiView {...entrance(1)}>
                <Input
                  label="First Name"
                  placeholder="Segun"
                  value={formData.first_name}
                  onChangeText={handleInputChange('first_name')}
                  leftIcon={<Ionicons name="person-outline" size={18} color={Colors.primary} />}
                />
              </MotiView>

              <MotiView {...entrance(2)} style={styles.inputGap}>
                <Input
                  label="Last Name"
                  placeholder="LASU"
                  value={formData.last_name}
                  onChangeText={handleInputChange('last_name')}
                  leftIcon={<Ionicons name="person-outline" size={18} color={Colors.primary} />}
                />
              </MotiView>

              <MotiView {...entrance(3)}>
                <Input
                  label="Email"
                  placeholder="student or personal email"
                  value={formData.email}
                  onChangeText={handleInputChange('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Ionicons name="mail-outline" size={18} color={Colors.primary} />}
                />
              </MotiView>

              <Button title="Continue" onPress={nextStep} style={styles.button} />
            </MotiView>
          ) : (
            <MotiView key="step2" from={{ opacity: 0, translateX: 50 }} animate={{ opacity: 1, translateX: 0 }}>
              <MotiView {...entrance(1)}>
                <Input
                  label="Matric Number"
                  placeholder="200XXX"
                  value={formData.matric_no}
                  onChangeText={handleInputChange('matric_no')}
                  leftIcon={<Ionicons name="card-outline" size={18} color={Colors.primary} />}
                />
              </MotiView>

              <MotiView {...entrance(2)} style={styles.inputGap}>
                <Input
                  label="Password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChangeText={handleInputChange('password')}
                  isPassword
                  secureTextEntry
                  leftIcon={<Ionicons name="lock-closed-outline" size={18} color={Colors.primary} />}
                />
              </MotiView>

              <MotiView {...entrance(3)}>
                <Input
                  label="Referral Code (Optional)"
                  placeholder="Enter code"
                  value={formData.referral_code}
                  onChangeText={handleInputChange('referral_code')}
                  leftIcon={<Ionicons name="gift-outline" size={18} color={Colors.primary} />}
                />
              </MotiView>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
                  <Text style={[styles.backButtonText, { color: theme.textSecondary }]}>Back</Text>
                </TouchableOpacity>
                <Button
                  title="Finish Up"
                  onPress={handleSubmit}
                  loading={signupMutation.isPending}
                  style={{ ...styles.button, flex: 2 }}
                />
              </View>
            </MotiView>
          )}
        </AnimatePresence>

        <ResponseModal
          visible={modalVisible}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  progressContainer: {
    height: 4,
    width: '100%',
    backgroundColor: Colors.bgTertiary,
    borderRadius: 2,
    marginBottom: Spacing.xs,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  stepText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    marginBottom: Spacing.lg,
    textTransform: 'uppercase',
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  inputGap: {
    marginVertical: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  button: {
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    ...Shadow.md,
    marginTop: Spacing.lg,
  },
  backButton: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: '700',
    fontSize: FontSize.md,
  },
});