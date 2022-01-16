/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainRoutes from './routes/MainRoutes';


const App = () => {

  return (
    <SafeAreaProvider style={{width: '100%', height: '100%'}}>
      {/* <Text>Hi</Text> */}
      <MainRoutes/>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
