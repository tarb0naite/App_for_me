import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CheckBox } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';

const TasksScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const cardScale = useRef(new Animated.Value(1)).current;
  const checkboxOpacity = useRef(new Animated.Value(1)).current;
  const progressBarOpacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    setChecked(!isChecked);
  };

  useEffect(() => {
    Animated.timing(cardScale, {
      toValue: isChecked ? 1.1 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(checkboxOpacity, {
      toValue: isChecked ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(progressBarOpacity, {
      toValue: isChecked ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isChecked]);

  const cardStyle = {
    transform: [{ scale: cardScale }],
    backgroundColor: isChecked ? '#B4E3B0' : '#CEA2FD',
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBarContainer, { opacity: progressBarOpacity }]}>
        <ProgressBar progress={0.5} width={null} color="#6F2DA8" />
      </Animated.View>

      <Animated.View style={[styles.cardContainer, cardStyle]}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Card Title</Text>
          <Text style={styles.cardDescription}>This is the text of the card</Text>
        </View>
        <Animated.View style={[styles.checkboxContainer, { opacity: checkboxOpacity }]}>
          <CheckBox 
            checked={isChecked} 
            onPress={handlePress} 
            checkedColor={isChecked ? 'purple' : '#6F2DA8'}
             />

        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  progressBarContainer: {
    height: 10,
    marginHorizontal: 20,
    marginTop: 10,
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
    height: 100,
    width: 320,
    flexDirection: 'row',
    alignItems: 'center',
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
  checkboxContainer: {
    marginLeft: 60,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    padding: 0,
    margin: 0,
    borderColor: '#6F2DA8',
  },
});

export default TasksScreen;
