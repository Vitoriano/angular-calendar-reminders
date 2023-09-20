import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import {
  ReminderChange,
  ReminderChangeReload,
  ReminderCreate,
  ReminderDelete,
  ReminderEdit,
  ReminderWeatherChange,
  Reminderlist,
} from './reminder.action';
import { forkJoin, of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  tap,
  mergeMap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { selectReminder } from './reminder.selector';

@Injectable()
export class ReminderEffects {
  /**
   * store > Select
   */

  reminder$ = this.store.select(selectReminder);


  /**
   * Effect >
   */
  @Effect()
  loadReminder$ = this.actions$.pipe(
    ofType(Reminderlist, ReminderCreate),
    withLatestFrom(this.reminder$),
    mergeMap(([_, reminder]) => {
      let data;
      data = this.calendarService.list(reminder.data);
      return of(ReminderChangeReload({ payload: data }));
    })
  );

  /**
   * loadweather >
   */
  @Effect()
  loadweather$ = this.actions$.pipe(
    ofType(ReminderChangeReload, ReminderCreate),
    withLatestFrom(this.reminder$),
    switchMap(async ([_, reminder]) => {
      const updatedDays = await Promise.all(
        reminder.data.map(async (day) => {
          const updatedReminders = await Promise.all(
            day.reminder.map(async (reminderItem: any) => {
              let result;
              try {
                result = await this.whetherService.getWeatherInformation(
                  reminderItem.city
                );
              } catch (error) {
                console.error("Wheather information couldn't be loaded");
              }
              return {
                ...reminderItem,
                weather: result ? result.weather[0] : [],
              };
            })
          );
          return {
            ...day,
            reminder: updatedReminders,
          };
        })
      );
      return ReminderWeatherChange({ payload: updatedDays });
    })
  );


  /**
   * Effect >
   */
  @Effect()
  loadReminderCreate$ = this.actions$.pipe(
    ofType(ReminderCreate),
    withLatestFrom(this.reminder$),
    mergeMap(([action, reminder]) => {
      let data;
      data = this.calendarService.create(action.payload);
      return of(ReminderChange({ payload: data }));
    })
  );

  /**
   * Effect >
   */
  @Effect()
  loadReminderEdit$ = this.actions$.pipe(
    ofType(ReminderEdit),
    withLatestFrom(this.reminder$),
    mergeMap(([action, reminder]) => {
      let data;
      data = this.calendarService.edit(action.payload.id, [...reminder.data], action.payload);
      return of(ReminderChange({ payload: data }));
    })
  );

  /**
   * Effect >
   */
  @Effect()
  loadReminderDelete$ = this.actions$.pipe(
    ofType(ReminderDelete),
    withLatestFrom(this.reminder$),
    mergeMap(([action, reminder]) => {
      let data;
      data = this.calendarService.delete(action.payload.id, [...reminder.data]);
      return of(ReminderChange({ payload: data }));
    })
  );

  /**
   * constructor
   */
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private router: Router,
    private calendarService: CalendarService,
    private whetherService: WeatherService
  ) {}
}
