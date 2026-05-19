import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function SpotFeed() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Spot Feed (Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
});
