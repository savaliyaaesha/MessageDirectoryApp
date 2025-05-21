import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Animated,
  Image,
  Text,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';

const DirectoryCard = ({ title, icon, onPress, color = '#fff', onDelete }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.card, { backgroundColor: color, transform: [{ scale }] }]}>
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={styles.imageWrapper}>
          <Image source={icon} style={styles.icon} resizeMode="cover" />
        </View>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>🗑️</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    width: 140,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: 'relative',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ff4d4d',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default DirectoryCard;
