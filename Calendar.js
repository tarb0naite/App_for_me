//Calendar.js
import * as React from 'react';
import {StatusBar, statusBar} from 'expo-status-bar'
import {useState} from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Modal, FlatList, ScrollView } from 'react-native'
import Calendar from './CustomCalendar'
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import * as Sharing from 'expo-sharing';
import { Share } from 'react-native';




export default function CalendarScreen(){
    const navigation = useNavigation();

    const [selectedDate, setSelectedDate] = useState(null)
    const [isMainModalVisible, setIsMainModalVisible] = useState(false);
    const [isCardModalVisible, setIsCardModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null); 


    const toggleMainModal = () => {
      setIsMainModalVisible(!isMainModalVisible);
    };
  
    const toggleCardModal = () => {
      setIsCardModalVisible(!isCardModalVisible);
    };

    const handleMenuItemPress = async (item) => {
        toggleCardModal();
      
        if (item === 'ShareOption') {
          try {
            const result = await Share.share({
              message: 'DID IT WORK???',
              url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCTH0J_Wl22UD042wwbUQBtWeYJUnqVjSvErFsztzZ5A&s',
            });
      
            if (result.action === Share.sharedAction) {
              console.log('Shared successfully');
            } else if (result.action === Share.dismissedAction) {
              console.log('Share dismissed');
            }
          } catch (error) {
            console.error('Error while sharing:', error.message);
          }
        }
      };


   const handleCardPress = (card) => {
    setSelectedCard(card)
    setVisible(true)
   }

   const handleAddPress = ()=>{
        navigation.navigate('Planner')
   }

   const closeDropdown = () => {
    setVisible(false)
   }

    return (
<View style={styles.container}>
      <ScrollView>
        
            <Calendar onSelectDate={setSelectedDate} selected={selectedDate}/>
            <StatusBar style='auto'/>

           
      <View style={styles.iconContainer}>
        <Text style={styles.text}>Tasks</Text>
        <TouchableOpacity 
          onPress={toggleMainModal}>
          <Icon name={'ellipsis-h'} size={20} color='black' />
        </TouchableOpacity>
        
        <Modal transparent={true} visible={isMainModalVisible} animationType="slide">
       <View style={styles.overlay}>
        <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalCloseButton} onPress={toggleMainModal}>
            <Icon name={'close'} size={20} color='#6F2DA8'/>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.modalItem} onPress={() => handleMenuItemPress('Item1')}>
            <Text style={styles.modalText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleMenuItemPress('Item2')}>
            <Text style={styles.modalText}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleMenuItemPress('Item3')}>
            <Text style={styles.modalText}>Most important</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleMenuItemPress('Item4')}>
            <Text style={styles.modalText}>Least important</Text>
          </TouchableOpacity>
         
          
        </View>
      </View>
      </Modal>


      <Modal transparent={true} visible={isCardModalVisible} animationType="slide">
       <View style={styles.overlay}>
        <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalCloseButton} onPress={toggleCardModal}>
            <Icon name={'close'} size={20} color='#6F2DA8'/>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.modalItem} onPress={() => handleMenuItemPress('Item1')}>
            <Text style={styles.modalText}>Mark as completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleMenuItemPress('Item2')}>
            <Text style={styles.modalText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleMenuItemPress('Item3')}>
            <Text style={styles.modalText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleMenuItemPress('ShareOption')}>
            <Text style={styles.modalText}>Share</Text>
          </TouchableOpacity>
         
          
        </View>
      </View>
      </Modal>
    
    </View>

    <View style={styles.cardContainer}>
      <Icon name={'book'} size={30} color='#CEA2FD' marginLeft={50} style={styles.roundButton}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>This is the text of the card</Text>
      </View>
      <Icon name={'ellipsis-v'} size={20} color="black" marginLeft={30} onPress={toggleCardModal} />
    </View>

    <View style={styles.cardContainer}>
      <Icon name={'apple'} size={30} color='#CEA2FD' marginLeft={50} style={styles.roundButton}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>This is the text of the card</Text>
      </View>
      <Icon name={'ellipsis-v'} size={20} color="black" marginLeft={30} onPress={toggleCardModal}/>
    </View>


    <View style={styles.cardContainer}>
      <Icon name={'book'} size={30} color='#CEA2FD' marginLeft={50} style={styles.roundButton}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>This is the text of the card</Text>
      </View>
      <Icon name={'ellipsis-v'} size={20} color="black" marginLeft={30} onPress={handleCardPress}/>
    </View>

    <View style={styles.cardContainer}>
      <Icon name={'book'} size={30} color='#CEA2FD' marginLeft={50} style={styles.roundButton}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>This is the text of the card</Text>
      </View>
      <Icon name={'ellipsis-v'} size={20} color="black" marginLeft={30}/>
    </View>

    <View style={styles.cardContainer}>
      <Icon name={'book'} size={30} color='#CEA2FD' marginLeft={50} style={styles.roundButton}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>This is the text of the card</Text>
      </View>
      <Icon name={'ellipsis-v'} size={20} color="black" marginLeft={30}/>
    </View>

    <View style={styles.cardContainer}>
      <Icon name={'book'} size={30} color='#CEA2FD' marginLeft={50} style={styles.roundButton}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>This is the text of the card</Text>
      </View>
      <Icon name={'ellipsis-v'} size={20} color="black" marginLeft={30}/>
    </View>

    <View style={styles.cardContainer}>
      <Icon name={'book'} size={30} color='#CEA2FD' marginLeft={50} style={styles.roundButton}/>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>This is the text of the card</Text>
      </View>
      <Icon name={'ellipsis-v'} size={20} color="black" marginLeft={30}/>
    </View>

   
    
    </ScrollView>

      {selectedCard !== null && visible && (
        <View style={styles.dropdownCotainer}>
          <TouchableOpacity onPress={closeDropdown}>
            <Icon name={'close'} size={20} color="#6F2DA8"/>
          </TouchableOpacity>
          <Text style={styles.dropDownText}>1</Text>
        </View>
      )}

    <View style={styles.addButtonView}>
      <TouchableOpacity 
        style={styles.roundButtonAdd}>
      <Icon name="plus" size={30} color='white' onPress={handleAddPress}/>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
        alignItems: 'center',
        
    },
    text:{
        marginRight: 240,
        fontWeight: 'bold',
        fontSize: 18
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      modalContainer:{
        backgroundColor: '#C9A0DC',
        padding: 20,
        borderRadius: 10,
        width: 300, 
      },
      modalItem:{
        padding: 20,
        backgroundColor: '#C9A0DC',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
      },
      modalText:{
        color: 'white',
        fontWeight: 'bold'
      },
      modalCloseButton:{
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white'
      },
      dropdownCotainer:{
        position: 'absolute',
    top: 20, // You can adjust the positioning as needed
    right: 10,
    backgroundColor: '#C9A0DC',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
      },
      modalCloseButton: {
        padding: 20,
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardContainer: {
        backgroundColor: '#CEA2FD',
        borderRadius: 30,
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginVertical: 10,
        marginHorizontal: 20,
        height: 100,
        width: 320,
        flexDirection: 'row',
        alignItems: 'center'

      },
      roundButton:{
      
        width: 50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#6F2DA8',
        marginLeft: 10
        
      },
      cardContent: {
        padding: 10,
      },
      cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6F2DA8',
        marginBottom: 5,
      },
      cardDescription: {
        fontSize: 14,
        color: 'white',
      },
      roundButtonAdd:{
      
        width: 50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#6F2DA8',
        marginLeft: 10
      },
      addButtonView:{
        position:"absolute",
        bottom: 20,
        alignSelf: 'center'
       
      },
      dropdownText: {
        marginLeft: 10,
        color: 'white',
        fontWeight: 'bold',
      },
    });