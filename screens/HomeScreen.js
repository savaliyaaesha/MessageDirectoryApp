import React, { useState, useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DirectoryCard from '../components/DirectoryCard';
import { CategoryContext } from '../contexts/CategoryContext';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const { categories, deleteCategory } = useContext(CategoryContext);

  const filteredDirectories = categories.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = (id, title) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteCategory(id), style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📂 Select a Category</Text>

      <TextInput
        placeholder="🔍 Search..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCategory')}
      >
        <Text style={styles.addButtonText}>➕ Add New Category</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredDirectories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DirectoryCard
            title={item.title}
            icon={item.icon}
            color={item.color}
            onDelete={() => confirmDelete(item.id, item.title)}
            onPress={() =>
              navigation.navigate('Messages', {
                id: item.id, // ✅ Pass the id for message persistence
                title: item.title,
                messages: item.messages,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#e6f2ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#004aad',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
