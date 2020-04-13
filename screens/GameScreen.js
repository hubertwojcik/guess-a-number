import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'

const generateRandomBetweem = (min, max, exclude) => {
 min = Math.ceil(min);
 max = Math.floor(max);
 const rndNumber = Math.floor(Math.random() * (max - min) + min)
 if (rndNumber === exclude) {
  return generateRandomBetweem(min, max, exclude)
 } else {
  return rndNumber
 }
}

const renderListItem = (listLength, itemData) => (
 <View style={styles.listItem}>
  <BodyText>#{listLength - itemData.index}</BodyText>
  <BodyText>{itemData.item}</BodyText>
 </View>
)



const GameScreen = props => {
 const initialGuess = generateRandomBetweem(1, 100, props.userChoice)
 const [currentGuess, setCurrentGuess] = useState(initialGuess);
 const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
 const currentLow = useRef(1);
 const currentHigh = useRef(99)

 const { userChoice, onGameOver } = props

 useEffect(() => {
  if (currentGuess === userChoice) {
   onGameOver(pastGuesses.length)
  }
 }, [currentGuess, userChoice, onGameOver])

 const nextGuessHandler = direction => {
  if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
   Alert.alert('Dont lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }])
   return;
  }
  if (direction === 'lower') {
   currentHigh.current = currentGuess;
  } else {
   currentLow.current = currentGuess + 1;
  }
  const nextNumber = generateRandomBetweem(currentLow.current, currentHigh.current, currentGuess)
  setCurrentGuess(nextNumber)
  // setRounds(curRounds => curRounds + 1)
  setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
 }


 return (
  <View style={styles.screen}>
   <Text>Opponent's Guess</Text>
   <NumberContainer>{currentGuess}</NumberContainer>
   <Card style={styles.buttonContainer}>
    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
     <Ionicons
      name="md-remove"
      size={24}
      color="white" />
    </MainButton>
    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
     <Ionicons
      name="md-add"
      size={24}
      color="white" />
    </MainButton>
   </Card>
   <View style={styles.listContainer}>
    {/* <ScrollView contentContainerStyle={styles.list}>
     {pastGuesses.map(
      (guess, index) => renderListItem(guess, pastGuesses.length - index))}
    </ScrollView> */}
    <FlatList
     keyExtractor={(item) => item} data={pastGuesses}
     renderItem={renderListItem.bind(this, pastGuesses.length)}
     contentContainerStyle={styles.list} />
   </View>

  </View>
 );
}

const styles = StyleSheet.create({
 screen: {
  flex: 1,
  padding: 10,
  alignItems: 'center'
 },
 buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  width: 300,
  maxWidth: '90%'
 },
 listContainer: {
  flex: 1,
  width: '60%'
 },
 list: {
  flexGrow: 1,
  justifyContent: 'flex-end'
 },
 listItem: {
  borderColor: '#ccc',
  borderWidth: 1,
  padding: 15,
  marginVertical: 10,
  backgroundColor: 'white',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%'
 }
})

export default GameScreen;