import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import moment from 'moment';

import { ThemeColors } from '@/constants/ThemeColors';
import { EnrollmentWithDetails } from '@/types/Enrollment';
import WeekDayPicker from './WeekDayPicker';
import CompactChildCalendar from './CompactChildCalendar';

interface ActivitiesTabContentProps {
  childId?: string;
}

export const ActivitiesTabContent: React.FC<ActivitiesTabContentProps> = ({
  childId
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(moment().day() === 0 ? 6 : moment().day() - 1);
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
  
  const handleDaySelected = (index: number, date: string) => {
    setSelectedDayIndex(index);
    setSelectedDate(date);
  };

  const handleAppointmentPress = (enrollment: EnrollmentWithDetails) => {
    Alert.alert(
      "Szczegóły zajęć",
      `Miejsce: ${enrollment.schedule.class.facility.name}\nZajęcia: ${enrollment.schedule.class.name}\nCzas: ${moment(enrollment.schedule.startTime).utc(false).format('HH:mm')} - ${moment(enrollment.schedule.endTime).utc(false).format('HH:mm')}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Week Day Picker */}
      <WeekDayPicker 
        selectedDayIndex={selectedDayIndex}
        onSelectDay={handleDaySelected}
      />
      
      {/* Compact Child Calendar */}
      <View style={styles.calendarContainer}>
        {childId ? (
          <CompactChildCalendar
            selectedDate={selectedDate}
            childId={childId}
            startHour={8}
            endHour={20}
            onAppointmentPress={handleAppointmentPress}
          />
        ) : (
          <View className="items-center justify-center py-6">
            <Text className="font-poppins-medium text-base text-gray-500 text-center">
              Nie wybrano dziecka
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: scale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: scale(14),
  },
  addActivityButton: {
    height: verticalScale(36),
    borderRadius: scale(8),
    backgroundColor: ThemeColors.GOLD,
    paddingHorizontal: scale(12),
  },
}); 