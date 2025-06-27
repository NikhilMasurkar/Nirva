import React from 'react';
import { StyleSheet } from 'react-native';
import { NScrollView } from '../Components/ShareComponents/NScrollView';
import { Header } from '../Components/ShareComponents/Header';

const Home = () => {
  return (
    <NScrollView contentContainerStyle={styles.container}>
      <Header />
    </NScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex1,
  },
});

export default Home;
