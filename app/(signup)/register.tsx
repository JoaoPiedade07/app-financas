import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useAuth } from '@/app/(auth)/AuthContext';
import { Link, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/components/ThemeContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  
  const { signUp, isLoading, error } = useAuth();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  const handleRegister = async () => {
    // Validações básicas
    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Preencha todos os campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setLocalError('As senhas não coincidem');
      return;
    }
    
    // Limpar erro local
    setLocalError(null);
    
    // Chamar função de cadastro
    await signUp(name, email, password);
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, isDark && styles.textDark]}>← Voltar</Text>
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Text style={[styles.appName, isDark && styles.textDark]}>App Finanças</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={[styles.title, isDark && styles.textDark]}>Criar Conta</Text>
            
            {(localError || error) && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{localError || error}</Text>
              </View>
            )}
            
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Nome completo"
              placeholderTextColor={isDark ? '#9BA1A6' : '#687076'}
              value={name}
              onChangeText={setName}
            />
            
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Email"
              placeholderTextColor={isDark ? '#9BA1A6' : '#687076'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Senha"
              placeholderTextColor={isDark ? '#9BA1A6' : '#687076'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Confirmar senha"
              placeholderTextColor={isDark ? '#9BA1A6' : '#687076'}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            
            <TouchableOpacity 
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, isDark && styles.textDark]}>
                Já tem uma conta?
              </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Faça login</Text>
                </TouchableOpacity>
              </Link>*
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0a7ea4',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#11181C',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#11181C',
  },
  inputDark: {
    backgroundColor: '#2A2D2E',
    borderColor: '#3E4042',
    color: '#ECEDEE',
  },
  registerButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#11181C',
    marginRight: 5,
  },
  loginLink: {
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  textDark: {
    color: '#ECEDEE',
  },
});
