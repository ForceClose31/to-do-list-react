// /screens/AddTodoScreen.js
import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const AddTodoScreen = ({ navigation }) => {
  const [todo, setTodo] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = useCallback(async () => {
    if (!todo.trim() || !time.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Harap isi semua data!');
      return;
    }

    try {
      await addDoc(collection(db, 'todos'), {
        todo: todo.trim(),
        time: time.trim(),
        description: description.trim(),
        status: 'Doing',
      });
      Alert.alert('Sukses', 'To-Do berhasil ditambahkan!');
      setTodo('');
      setTime('');
      setDescription('');
      navigation.navigate('ViewTodos');
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'Terjadi kesalahan saat menambahkan To-Do.');
    }
  }, [todo, time, description, navigation]);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nama Kegiatan"
          value={todo}
          onChangeText={setTodo}
        />
        <TextInput
          style={styles.input}
          placeholder="Waktu"
          value={time}
          onChangeText={setTime}
        />
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Keterangan"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Button title="Tambah To-Do" onPress={handleAddTodo} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  form: { flex: 1, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddTodoScreen;
