// /screens/ViewTodosScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Button, StyleSheet, RefreshControl } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import TodoItem from '../components/TodoItem';

const ViewTodosScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todosData = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setTodos(todosData);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleUpdateStatus = useCallback(async (id, currentStatus) => {
    const newStatus = currentStatus === 'Doing' ? 'Done' : 'Doing';
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, { status: newStatus });
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTodos();
    setRefreshing(false);
  }, [fetchTodos]);

  return (
    <View style={styles.container}>
      <Button 
        title="Tambah To-Do Baru" 
        onPress={() => navigation.navigate('AddTodo')} 
      />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem 
            todo={item} 
            onUpdateStatus={() => handleUpdateStatus(item.id, item.status)} 
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<View style={styles.empty}><Button title="Reload" onPress={fetchTodos} /></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
});

export default ViewTodosScreen;
