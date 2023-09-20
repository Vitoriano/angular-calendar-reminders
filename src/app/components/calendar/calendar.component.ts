/**
 * Core
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Store
 */
import { Store } from '@ngrx/store';

/**
 * interfaces
 */
import { Location, Reminder } from 'src/app/interfaces/reminder';

/**
 * component
 */
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';

/**
 * action
 */
import { Reminderlist } from 'src/app/modules/shared/redux/Reminder/reminder.action';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  /**
   * select
   */
  reminder$ = this.store.select('Reminder');

  /**
   * constructor
   */
  constructor(private matDialog: MatDialog, private store: Store<any>) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.store.dispatch(Reminderlist());
  }

  /**
   * openReminderForm
   * */
  openReminderForm(reminder?: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: {
        ...reminder,
      },
      width: '500px',
      height: '530px',
    });
  }

  /**
   * addReminder
   */
  addReminder(day): void {
    this.openReminderForm();
  }
}
