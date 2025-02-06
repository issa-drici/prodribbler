import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import leftArrow from '@/assets/icons/left-arrow.png';
import rightArrow from '@/assets/icons/right-arrow.png';

interface CalendarProps {
  currentMonth?: string;
  currentYear?: number;
  selectedRange: 'day' | 'week' | 'month';
  onDateSelect?: (selection: {
    day: Date;
    week: Date[];
    month: Date;
    year: number;
    start_date: Date;
    end_date: Date;
  }) => void;
}

export default function TrainingCalendar({
  currentMonth = new Date().toLocaleString('default', { month: 'long' }),
  currentYear = new Date().getFullYear(),
  selectedRange,
  onDateSelect
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [displayedMonth, setDisplayedMonth] = React.useState<number>(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = React.useState<number>(currentYear);
  const [calendarDays, setCalendarDays] = React.useState<Date[]>([]);

  const generateCalendarDays = React.useCallback(() => {
    const firstDayOfMonth = new Date(displayedYear, displayedMonth, 1);
    const startingDayIndex = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
    const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();

    const days: Date[] = [];
    // Ajouter les jours du mois précédent
    for (let i = startingDayIndex; i > 0; i--) {
      const date = new Date(displayedYear, displayedMonth, -i + 1);
      days.push(date);
    }
    // Ajouter les jours du mois en cours
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(displayedYear, displayedMonth, i);
      days.push(date);
    }
    setCalendarDays(days);
  }, [displayedYear, displayedMonth]);

  React.useEffect(() => {
    generateCalendarDays();
  }, [generateCalendarDays, displayedMonth, displayedYear]);

  const getWeekDays = (date: Date): Date[] => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      week.push(nextDay);
    }
    return week;
  };

  const isDateInRange = (date: Date): boolean => {
    if (!selectedDate) return false;

    switch (selectedRange) {
      case 'day':
        return date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear();

      case 'week':
        const weekStart = new Date(selectedDate);
        const weekEnd = new Date(selectedDate);
        weekEnd.setDate(weekStart.getDate() + 6);
        return date >= weekStart && date <= weekEnd;

      case 'month':
        const startDate = new Date(selectedDate);
        const endDate = new Date(selectedDate);

        if (selectedDate.getDate() === 1) {
          // Si on sélectionne le 1er du mois, on prend tout le mois calendaire
          endDate.setMonth(startDate.getMonth() + 1, 0);
        } else {
          // Sinon on prend 30 jours à partir de la date sélectionnée
          endDate.setDate(startDate.getDate() + 29);
        }
        return date >= startDate && date <= endDate;

      default:
        return false;
    }
  };

  const isFirstDayOfRange = (date: Date): boolean => {
    if (!selectedDate) return false;
    switch (selectedRange) {
      case 'week':
        return date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear();

      case 'month':
        if (selectedDate.getDate() === 1) {
          return date.getDate() === 1 &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
        } else {
          return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
        }

      default:
        return false;
    }
  };

  const isLastDayOfRange = (date: Date): boolean => {
    if (!selectedDate) return false;

    switch (selectedRange) {
      case 'week':
        const lastDayOfWeek = new Date(selectedDate);
        lastDayOfWeek.setDate(selectedDate.getDate() + 6);
        return date.getDate() === lastDayOfWeek.getDate() &&
          date.getMonth() === lastDayOfWeek.getMonth() &&
          date.getFullYear() === lastDayOfWeek.getFullYear();

      case 'month':
        if (selectedDate.getDate() === 1) {
          // Si on commence au 1er, on va jusqu'au dernier jour du mois
          const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
          return date.getDate() === lastDayOfMonth.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
        } else {
          // Sinon on prend 30 jours
          const lastDay = new Date(selectedDate);
          lastDay.setDate(selectedDate.getDate() + 29);
          return date.getDate() === lastDay.getDate() &&
            date.getMonth() === lastDay.getMonth() &&
            date.getFullYear() === lastDay.getFullYear();
        }

      default:
        return false;
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      let selection;
      let startDate, endDate;

      switch (selectedRange) {
        case 'day':
          startDate = new Date(date);
          endDate = new Date(date);
          endDate.setHours(23, 59, 59, 999);
          selection = {
            day: date,
            week: [],
            month: new Date(date.getFullYear(), date.getMonth(), 1),
            year: date.getFullYear(),
            start_date: startDate,
            end_date: endDate
          };
          break;

        case 'week':
          startDate = new Date(date);
          endDate = new Date(date);
          endDate.setDate(startDate.getDate() + 6);
          endDate.setHours(23, 59, 59, 999);
          
          const weekDays = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            return day;
          });
          
          selection = {
            day: date,
            week: weekDays,
            month: new Date(date.getFullYear(), date.getMonth(), 1),
            year: date.getFullYear(),
            start_date: startDate,
            end_date: endDate
          };
          break;

        case 'month':
          startDate = new Date(date);
          endDate = new Date(date);
          
          if (date.getDate() === 1) {
            endDate.setMonth(startDate.getMonth() + 1, 0);
          } else {
            endDate.setDate(startDate.getDate() + 29);
          }
          endDate.setHours(23, 59, 59, 999);
          
          selection = {
            day: date,
            week: [],
            month: startDate,
            year: date.getFullYear(),
            start_date: startDate,
            end_date: endDate
          };
          break;
      }
      onDateSelect(selection);
    }
  };

  const handlePreviousMonth = () => {
    if (displayedMonth === 0) {
      setDisplayedMonth(11);
      setDisplayedYear(displayedYear - 1);
    } else {
      setDisplayedMonth(displayedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayedMonth === 11) {
      setDisplayedMonth(0);
      setDisplayedYear(displayedYear + 1);
    } else {
      setDisplayedMonth(displayedMonth + 1);
    }
  };

  const isStartOfRow = (index: number): boolean => index % 7 === 0;
  const isEndOfRow = (index: number): boolean => index % 7 === 6;

  const isFullRowSelected = (index: number, date: Date): boolean => {
    if (!isDateInRange(date)) return false;

    // Vérifie si c'est le début ou la fin d'une ligne
    const isStart = isStartOfRow(index);
    const isEnd = isEndOfRow(index);

    // Vérifie si les jours adjacents sont sélectionnés
    const prevDaySelected = !isStart && isDateInRange(calendarDays[index - 1]);
    const nextDaySelected = !isEnd && isDateInRange(calendarDays[index + 1]);

    return (isStart || prevDaySelected) && (isEnd || nextDaySelected);
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.monthSelector}>
          <Text style={styles.title}>Training & Stats for the week</Text>
          <View style={styles.monthNavigation}>
            <TouchableOpacity onPress={handlePreviousMonth} style={styles.arrowPressable}>
              <Image source={leftArrow} style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.month}>
              {new Date(displayedYear, displayedMonth).toLocaleString('default', { month: 'long' })} {displayedYear}
            </Text>
            <TouchableOpacity onPress={handleNextMonth} style={styles.arrowPressable}>
              <Image source={rightArrow} style={styles.arrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.calendar}>
        <View style={styles.daysHeader}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <Text key={index} style={[styles.dayText, day === 'Sun' && styles.sundayText]}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.daysGrid}>
          {calendarDays.map((date, index) => (
            <Pressable
              key={index}
              onPress={() => handleDateSelect(date)}
              style={[
                styles.dayCell,
                isDateInRange(date) && styles.selectedWeek,
                isFirstDayOfRange(date) && [styles.firstDayOfWeek, styles.selectedWeek],
                isLastDayOfRange(date) && styles.lastDayOfWeek,
                isStartOfRow(index) && isDateInRange(date) && styles.startOfRow,
                isEndOfRow(index) && isDateInRange(date) && styles.endOfRow,
                selectedRange === 'day' &&
                date.getDate() === selectedDate?.getDate() &&
                date.getMonth() === selectedDate?.getMonth() &&
                styles.selectedDay
              ]}
            >
              <Text style={[
                styles.dayNumber,
                date.getMonth() !== displayedMonth && styles.otherMonthDay,
                isDateInRange(date) && styles.selectedDayText
              ]}>
                {date.getDate()}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#121212',
    borderRadius: 20,
    padding: 15,
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#64D2FF',
    margin: -15, // Pour compenser le padding du container
    borderRadius: 8,
    padding: 10,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  month: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    width: 105,
    textAlign: 'center'
  },
  arrowPressable: {
    padding: 10
  },
  arrow: {
    color: '#000000',
    width: 6,
    height: 10,
  },
  calendar: {
    width: '100%',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    width: '100%',
  },
  dayText: {
    color: '#fff',
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
  },
  sundayText: {
    color: '#64D2FF',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    rowGap: 10,
  },
  dayCell: {
    width: '14.28%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  selectedDay: {
    backgroundColor: '#64D2FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  selectedDayText: {
    color: '#000000',
  },
  selectedWeek: {
    backgroundColor: '#64D2FF',
  },
  otherMonthDay: {
    opacity: 0.5,
  },
  firstDayOfWeek: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  lastDayOfWeek: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  startOfRow: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  endOfRow: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
}); 