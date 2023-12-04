import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from './src/views/modules/List/List';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontSize: 20,
  },
});

export default App;
