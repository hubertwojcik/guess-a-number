import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import TitleText from '../components//TitleText'
import colors from '../constans/colors'


const Header = props => {
 return (
  <View style={styles.header} >
   <TitleText style={styles.headerTitle}>{props.title}</TitleText>
  </View>
 );
}

const styles = StyleSheet.create({
 header: {
  width: '100%',
  height: 90,
  padding: 36,
  backgroundColor: colors.primary,
  alignItems: 'center',
  justifyContent: 'center'
 }
})

export default Header;