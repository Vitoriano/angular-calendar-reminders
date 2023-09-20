import { createReducer, on } from '@ngrx/store';
import {
  ReminderChange,
  ReminderChangeReload,
  ReminderClear,
  ReminderDelete,
  ReminderEdit,
  ReminderWeatherChange,
} from './reminder.action';


const today = new Date();
const MonthDaysWhitReminder = [];
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

const firstWeekDay = firstDayOfMonth.getDay();

for (let i = 0; i < firstWeekDay; i++) {
  MonthDaysWhitReminder.push({ day: null, reminder: [] });
}

for ( let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++ ) {
  MonthDaysWhitReminder.push({ day: i, reminder: [] });
}

/**
 *  state >
 */

export interface State {
  monthName: any;
  weekDays: any;
  data: any;
}

const initialState: State = {
  monthName: new Date().toLocaleString('en-us', { month: 'long' }),
  weekDays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  data: MonthDaysWhitReminder,
};

/**
 *  > ReminderReducer
 */
export const ReminderReducer = createReducer(
  initialState,
  on(ReminderChange, (state, { payload }) => {
    return {
      ...state,
      data: payload,
    };
  }),
  on(ReminderChangeReload, (state, { payload }) => {
    return {
      ...state,
      data: payload,
    };
  }),
  on(ReminderWeatherChange, (state, { payload }) => {
    return {
      ...state,
      data: payload,
    };
  }),
  on(ReminderClear, (state) => {
    return {
      ...state,
    };
  })
);
