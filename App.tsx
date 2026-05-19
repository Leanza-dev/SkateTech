import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SpotFeed } from './src/screens/Feed';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SpotFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
});
