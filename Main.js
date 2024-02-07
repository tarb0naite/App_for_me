import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Accelerometer } from 'expo-sensors';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    "new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.",
]);



function MainScreen() {
  const navigation = useNavigation();
  const [stepCount, setStepCount] = useState(0);
  const [todoData, setTodoData] = useState([])

  useEffect(() => {
    console.log('Fetching data...');
    fetch('http://192.168.227.248:8000/todo-list')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched successfully:', data);
        setTodoData(data);
      })
      .catch(error => console.error('Error fetching data', error))
  }, []);
  

  const firstTask = todoData.length > 0 ? todoData[0] : null
 
  useEffect(() => {
    let isMounted = true;
    let lastStepTimestamp = 0; 

    const accelerometerSubscribe = Accelerometer.addListener(({ x, y, z }) => {
      if (isMounted) {
        const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2 - 9.8);

        const currentTime = Date.now();
        if (acceleration > 1.2 && currentTime - lastStepTimestamp > 500) {
          lastStepTimestamp = currentTime;
          setStepCount(prevCount => prevCount + 1);
        }
      }
    });

    return () => {
      isMounted = false;
      accelerometerSubscribe.remove();
    };
  }, []);

  const handleAddPress = () => {
    navigation.navigate('Calendar');
  };

  const handleCardPress = () => {
    navigation.navigate('Tasks')
  }

  return (
    <View style={styles.container}>
      <View style={styles.upContainer}>
        <View>
          <Text style={styles.title}>Hello</Text>
        </View>

        <View style={styles.stepCountContainer}>
          <View style={styles.stepCountSquare}>
            <MaterialIcons name="local-drink" size={20} color="white" />
            <Text style={styles.stepCountText}> Water</Text>
          </View>
        </View>

        <View style={styles.stepCountContainer}>
          <View style={styles.stepCountSquare}>
            <MaterialIcons name="directions-walk" size={20} color="white" />
            <Text style={styles.stepCountText}> {stepCount}</Text>
          </View>
        </View>


       
      </View>
      

      <View>
        <Text style={styles.text}>Have a nice day</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            /* Handle My tasks button press */
          }}
        >
          <Text style={styles.updateButtonText}>My tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            /* Handle Homework button press */
          }}
        >
          <Text style={styles.updateButtonText}>Homework</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            /* Handle Notes button press */
          }}
        >
          <Text style={styles.updateButtonText}>Notes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {todoData.map((task, index) => (
          <ImageBackground
            key={index}
            source={require('./assets/background.png')}
            style={styles.cardContainer}
            
          >
            <MaterialIcons name={'emoji-objects'} size={30} color='#CEA2FD' marginLeft={50} style={styles.roundButton}/>
            <View style={styles.cardContent}>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle} onPress={handleCardPress}>{task.title || 'Loading...'}</Text>
              </View>
              <View style={styles.cardDescriptionContainer}>
                <Text style={styles.cardDescription}>{task.description || 'Loading...'}</Text>
              </View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>


      <View style={styles.addButtonView}>
        <TouchableOpacity style={styles.roundButton} onPress={handleAddPress}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  text: {
    fontSize: 12,
    marginLeft: 15,
  },
  updateButton: {
    backgroundColor: '#C9A0DC',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    width: 100,
  },
  updateButtonText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },
  roundButton: {
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#6F2DA8',
  },
  upContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },
  stepCountContainer: {
    alignItems: 'center',
  },
  stepCountSquare: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6F2DA8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  stepCountText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  waterCountContainer: {
    alignItems: 'center',
  },
  waterCountSquare: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6F2DA8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  waterCountText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  addButtonView:{
    position:"absolute",
    bottom: 20,
    alignSelf: 'center'
   
  },
  cardContainer: {
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 200,
    width: 170,
    flexDirection: 'row',
    marginTop: 30,
    overflow: 'hidden',
  },
  
  cardContent: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    
  },
  cardTitleContainer: {
    flexDirection: 'row',  
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6F2DA8',
    marginBottom: 5,
  },
  cardDescriptionContainer: {
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#6F2DA8',
    textAlign: 'left',
    fontWeight: 'bold',
   
  },
  cardTextContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
    flexDirection: 'column', 

  },
  roundButton:{
    width: 50,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#6F2DA8',
    marginLeft: 10,
    marginTop: 10
    
  },
});

export default MainScreen;