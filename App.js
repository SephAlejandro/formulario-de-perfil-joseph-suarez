import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [identification, setIdentification] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validateName = (value) => {
    if (!value.trim()) {
      return 'Nombre es requerido';
    }
    return true;
  };

  const validateIdentification = (value) => {
    if (!value.trim() || value.length !== 10) {
      return 'Cédula debe ser un número de 10 dígitos';
    }
    return true;
  };

  const validateEmail = (value) => {
    if (!value.trim() || !value.includes('@')) {
      return 'Correo electrónico es requerido y debe contener @';
    }
    return true;
  };

  const handleSubmit = () => {
    const newErrors = {};
    let isValid = true;

    if (name.length === 0) {
      newErrors.name = 'Nombre es requerido';
      isValid = false;
    }

    if (identification.length !== 10) {
      newErrors.identification = 'Cédula debe ser un número de 10 dígitos';
      isValid = false;
    }

    if (!email.includes('@')) {
      newErrors.email = 'Correo electrónico es requerido y debe contener @';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      Alert.alert('Perfil actualizado', 'Los datos del perfil han sido guardados con éxito.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.card}>
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          placeholder="Nombre"
          onChangeText={(text) => setName(text)}
          value={name}
          onBlur={() => validateName(name)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={[styles.input, errors.identification && styles.errorInput]}
          placeholder="Cédula"
          keyboardType="numeric"
          onChangeText={(text) => setIdentification(text)}
          value={identification}
          onBlur={() => validateIdentification(identification)}
        />
        {errors.identification && <Text style={styles.errorText}>{errors.identification}</Text>}

        <TextInput
          style={[styles.input, errors.email && styles.errorInput]}
          placeholder="Correo electrónico"
          onChangeText={(text) => setEmail(text)}
          value={email}
          onBlur={() => validateEmail(email)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => Alert.alert('Cancelar', '¿Desea cancelar la operación?', [
          {text: 'No', style: 'cancel'},
          {text: 'Sí', style: 'destructive'}
        ])}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileForm;