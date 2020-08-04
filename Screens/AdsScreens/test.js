import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import ActionButton from 'react-native-circular-action-menu';
import { Ionicons } from 'react-native-vector-icons';

 const  MyMenu=()=> {
    return (
      
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Ionicons name="ios-person" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Ionicons name="md-add-circle-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Ionicons name="ios-list" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
     
    );
}
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
export default MyMenu