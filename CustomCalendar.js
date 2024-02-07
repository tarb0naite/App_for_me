// CustomCalendar.js
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import moment from 'moment';
import Date from './CustomDay';
import { Calendar as CustomCalendar } from 'react-native-calendars';

import Icon from 'react-native-vector-icons/FontAwesome';

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [isFullCalendar, setIsFullCalendar] = useState(false);

  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < (isFullCalendar ? 30 : 7); i++) {
      const date = moment().add(i, 'days');
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
    setCurrentMonth(moment().format('MMMM'));
    setCurrentYear(moment().format('YYYY'));
  }, [isFullCalendar]);

  const toggleCalendarView = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsFullCalendar(!isFullCalendar);
      Animated.timing(fadeAnimation, {
        toValue:1,
        duration: 300,
        useNativeDriver: false
      }).start();
    })
  };


  const renderCustomDay = (date) => {
    return (
      <View style={styles.dayContainer}>
        <TouchableOpacity onPress={() => onSelectDate(date)}>
          <Text style={[styles.dayText, selected === date ? styles.selectedDayText : {}]}>
            {moment(date).format('D')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const theme = {
    backgroundColor: '#6F2DA8', // Calendar background color
    calendarBackground: '#6F2DA8', // Background color for the month
    textSectionTitleColor: 'white', // Title color for days
    selectedDayBackgroundColor: 'white', // Background color for the selected day
    selectedDayTextColor: 'black', // Text color for the selected day
    todayTextColor: '#C54B8C', // Text color for today's date
    dayTextColor: 'white', // Text color for days
    textDisabledColor: '#C9A0DC', // Text color for disabled days
    dotColor: '#6F2DA8', // Color for dots/markers
    selectedDotColor: '#ffffff', // Color for dots/markers on the selected day
    arrowColor: '#C9A0DC', // Color for the arrows on the header
    monthTextColor: '#6F2DA8', // Text color for the month name
    indicatorColor: '#6F2DA8', // Color for the indicator below the selected day
    textMonthFontWeight: 'bold', // Font weight for the month name
  };

  return (
    <>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>
          {currentMonth} {currentYear}
        </Text>

        <TouchableOpacity
          style={styles.roundButton}
          onPress={toggleCalendarView}
        >
          <Icon name={isFullCalendar ? "list" : "calendar"} size={20} color='#6F2DA8' />
        </TouchableOpacity>
      </View>

      <Animated.View style={styles.dateSection}>
      {isFullCalendar ? (
        <CustomCalendar
          onDayPress={(day) => onSelectDate(day.dateString)}
          markedDates={{ [selected]: { selected: true } }}
          renderDay={renderCustomDay}
          theme={theme}
        />
      ) : (
          <View style={styles.daysContainer}>
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </View>
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 100,
  },
  dateSection: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysContainer: {
    backgroundColor: '#6F2DA8',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    
  },
  roundButton: {
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#C9A0DC',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
  },
 
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    color: '#000', 
  },
  selectedDayText: {
    fontWeight: 'bold',
    color: '#6F2DA8', 
  },

});

export default Calendar;
