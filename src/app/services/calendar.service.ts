import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Reminder } from '../interfaces/reminder';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  reminders;

  constructor() {}

  list(reminders) {
    this.reminders = reminders;
    return this.reminders;
  }

  create(data: Reminder) {
    const reminderDate = new Date(data.dateTime).getDate();
    return this.reminders.map((item) => {
      if (item.day === reminderDate) {
        return {
          ...item,
          reminder: [...item.reminder, { ...data, id: uuidv4() }],
        };
      }
      return item;
    });
  }

  delete(reminderId: string, reminder): Reminder[] {
    return reminder.map((item) => {
      if (item.reminder) {
        return {
          ...item,
          reminder: item.reminder.filter(
            (reminder) => reminder.id !== reminderId
          ),
        };
      }
      return item;
    });
  }

  edit(reminderId: string, reminders, formData): Reminder[] {
    let editedReminder = null;

    // Remove the reminder from the old date
    reminders = reminders.map((item) => {
      if (item.reminder) {
        return {
          ...item,
          reminder: item.reminder.filter((reminder) => {
            if (reminder.id === reminderId) {
              editedReminder = { ...reminder, ...formData };
              return false;
            }
            return true;
          }),
        };
      }
      return item;
    });

    // Add the reminder to the new date
    if (editedReminder) {
      const newReminderDate = new Date(editedReminder.dateTime).getDate();
      reminders = reminders.map((item) => {
        if (item.day === newReminderDate) {
          return {
            ...item,
            reminder: [...item.reminder, editedReminder],
          };
        }
        return item;
      });
    }

    return reminders;
  }

}
