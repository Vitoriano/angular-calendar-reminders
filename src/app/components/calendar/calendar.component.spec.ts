import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('CalendarComponent', () => {

  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarServiceSpy: jasmine.SpyObj<CalendarService>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const calendarServiceMock = {
      list: jasmine.createSpy('list').and.returnValue(of([{ day: 1 }, { day: 2 }, { day: 3 } /*... outros dias */])),
    };


    const weatherServiceMock = {
      getWeatherInformation: jasmine.createSpy('getWeatherInformation').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      providers: [
        { provide: CalendarService, useValue: calendarServiceMock },
        { provide: WeatherService, useValue: weatherServiceMock },
        { provide: MatDialog, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
