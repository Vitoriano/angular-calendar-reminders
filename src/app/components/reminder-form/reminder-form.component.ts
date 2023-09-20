import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reminder } from 'src/app/interfaces/reminder';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { ReminderCreate, ReminderDelete, ReminderEdit, Reminderlist } from 'src/app/modules/shared/redux/Reminder/reminder.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {

  reminderForm: FormGroup;
  citySuggestions: string[] = [];

  constructor(
   @Inject(MAT_DIALOG_DATA) public data:  Reminder,
   private fb: FormBuilder,
   private snackBar: MatSnackBar,
   private calendarService: CalendarService,
   private weatherService: WeatherService,
   private matDialog: MatDialog,
   private store: Store<any>,
  ) {
    this.reminderForm = this.fb.group({
      id: [''],
      text: ['', [Validators.required, Validators.maxLength(30)]],
      dateTime: ['', Validators.required],
      color: ['', Validators.required],
      city: this.fb.group({
        country: [''],
        lat: [''],
        local_names: [''],
        lon: [''],
        name: [''],
        label: [''],
        state: [''],
      }),
    });

    if(!this.isObjectEmpty(data)) {
      this.reminderForm.patchValue({
        ...data,
        dateTime: new Date(data.dateTime).toISOString().substring(0, 16),
      });
    }

  }

  onSubmit(): void {

    this.reminderForm.value.dateTime = new Date(this.reminderForm.value.dateTime).toDateString();

    if(!this.isObjectEmpty(this.data)) {

    this.store.dispatch(ReminderEdit({ payload: this.reminderForm.value }));
     this.openSnackBar('Reminder edited successfully!', 'Close');

    } else {

      this.store.dispatch(ReminderCreate({ payload: this.reminderForm.value }));
      this.openSnackBar('Reminder created successfully!', 'Close');
    }

    this.matDialog.closeAll();
    this.store.dispatch(Reminderlist());
  }

  ngOnInit(): void {
  }

  onCityInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    if (query) {
      this.weatherService.getCitySuggestions(query).subscribe(suggestions => {
        this.citySuggestions = suggestions;
      });
    } else {
      this.citySuggestions = [];
    }
  }

  onSuggestionClick(suggestion: any) {

    this.reminderForm.controls['city'].patchValue({
      ...suggestion,
      label: `${suggestion.name} - ${suggestion.state} - ${suggestion.country}`
    });

    this.citySuggestions = [];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  onDelete(item: Reminder, id: string) {

    this.store.dispatch(ReminderDelete({ payload: item }));
    this.matDialog.closeAll();
    this.openSnackBar('Reminder deleted successfully!', 'Close');
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }


}
