// /components/TodoItem.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TodoItem = React.memo(({ todo, onUpdateStatus }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{todo.todo}</Text>
      <Text><Text style={styles.label}>Waktu:</Text> {todo.time}</Text>
      <Text><Text style={styles.label}>Keterangan:</Text> {todo.description}</Text>
      <Text><Text style={styles.label}>Status:</Text> {todo.status}</Text>
      <Button
        title={todo.status === 'Doing' ? 'Mark as Done' : 'Mark as Doing'}
        onPress={onUpdateStatus}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default TodoItem;
