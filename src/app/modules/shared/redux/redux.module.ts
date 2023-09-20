import { ActionReducer, ActionReducerMap, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { ReminderReducer } from './Reminder/reminder.reduce';
import { ReminderEffects } from './Reminder/reminder.effect';

interface AppState {
  Reminder: any;
}

const rootReducer: ActionReducerMap<AppState> = {
  Reminder: ReminderReducer,
};


function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<any> {
  return localStorageSync({
    keys: ['Reminder'],
    rehydrate: true,
    storage: sessionStorage,
  })(reducer);
}


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(rootReducer, {
      metaReducers: [localStorageSyncReducer],
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([ReminderEffects]),

  ],
  exports: []
})
export class ReduxModule { }
