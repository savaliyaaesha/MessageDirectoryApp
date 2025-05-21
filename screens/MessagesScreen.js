import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from 'react-native';

const MessagesScreen = ({ route }) => {
  const { title, messages: initialMessages } = route.params;
  const [messages, setMessages] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState('');

  const addMessage = () => {
    if (newMsg.trim()) {
      setMessages([newMsg, ...messages]);
      setNewMsg('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title} Messages</Text>

      <TextInput
        placeholder="Write a message..."
        value={newMsg}
        onChangeText={setNewMsg}
        style={styles.input}
      />
      <Button title="Add Message" onPress={addMessage} />

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.message}>• {item}</Text>}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default MessagesScreen;
