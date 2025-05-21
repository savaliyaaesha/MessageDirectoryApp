import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { directories as initialData } from '../data';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Load from storage on app start
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('categories');
      if (stored) {
        setCategories(JSON.parse(stored));
      } else {
        setCategories(initialData);
        await AsyncStorage.setItem('categories', JSON.stringify(initialData));
      }
    })();
  }, []);

  // Save to storage whenever categories change
  useEffect(() => {
    AsyncStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (title, message) => {
    const newCategory = {
      id: Date.now().toString(),
      title,
      icon: require('../assets/you.png'), // or dynamic
      color: '#E0FFFF',
      messages: [message],
    };
    setCategories([newCategory, ...categories]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((item) => item.id !== id));
  };

  const addMessageToCategory = (categoryId, message) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === categoryId
          ? { ...item, messages: [message, ...item.messages] }
          : item
      )
    );
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, deleteCategory, addMessageToCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
