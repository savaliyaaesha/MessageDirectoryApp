import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { CategoryContext } from '../contexts/CategoryContext';

const AddCategoryScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { addCategory } = useContext(CategoryContext);

  const handleAdd = () => {
    if (!title || !message) {
      Alert.alert('Missing Info', 'Please fill both fields.');
      return;
    }
    addCategory(title, message);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>➕ Add New Category</Text>
      <TextInput
        placeholder="Title (e.g., Work 💼)"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="First message..."
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button title="Add Category" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default AddCategoryScreen;
