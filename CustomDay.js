// CustomDay.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { StyleSheet } from 'react-native';

const Date = ({ date, onSelectDate, selected }) => {
  const day =
    moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'Today'
      : moment(date).format('ddd');
  const dayNumber = moment(date).format('D');

  const fullDate = moment(date).format('YYYY-MM-DD');
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card,
        selected === fullDate && { backgroundColor: 'white' },
      ]}
    >
      <Text style={[styles.big, selected === fullDate && { color: 'black' }]}>
        {day}
      </Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.medium,
          selected === fullDate && {
            color: 'black',
            fontWeight: 'bold',
            fontSize: 12, 
          },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6F2DA8',
    borderRadius: 20,
    borderColor: 'black',
    paddingBottom: 5,
    paddingTop: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',

    flex: 1,
    marginHorizontal: 5,
    height:70
  },
  big: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  medium: {
    color: 'white',

    fontSize: 12, 
  },
});

export default Date;
