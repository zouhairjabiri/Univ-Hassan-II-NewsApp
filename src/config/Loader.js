import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, ActivityIndicator } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => { console.log('close modal') }}>
      <View style={styles.modalBackground}>
        <SkypeIndicator animating={loading} color='white' style={styles.skype}/>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  skype: {
    marginTop: 370,
  }
});

export default Loader;