import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectReminderState = createFeatureSelector<any>('Reminder');

export const selectReminder = createSelector(selectReminderState, (state) => state);
