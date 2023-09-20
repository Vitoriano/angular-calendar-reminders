import { createAction, props } from '@ngrx/store';

export  const  Reminderlist = createAction('[REMINDER - LIST] **');
export  const  ReminderChange = createAction('[REMINDER - CHANGE] **', props<{ payload: any }>());
export  const  ReminderChangeReload = createAction('[REMINDER - CHANGE Reload] **', props<{ payload: any }>());
export  const  ReminderWeatherChange = createAction('[REMINDER (WEATHER) - CHANGE] **', props<{ payload: any }>());
export  const  ReminderCreate = createAction('[REMINDER - CREATE] **', props<{ payload: any }>());
export  const  ReminderDelete = createAction('[REMINDER - Delete] **', props<{ payload: any }>());
export  const  ReminderEdit = createAction('[REMINDER - Edit] **', props<{ payload: any }>());
export  const  ReminderClear = createAction('[REMINDER - Clear] **');
