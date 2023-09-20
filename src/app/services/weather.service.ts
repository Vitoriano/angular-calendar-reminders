import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location, WeatherResponse } from '../interfaces/reminder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = environment.openWeatherApiKey;
  private weatherBaseUrl = environment.openWeatherBaseUrl;
  private geoBaseUrl = environment.openWeatherGeoBaseUrl;

  constructor(private http: HttpClient) { }

  async getWeatherInformation(city: Location) {
    return this.http.get<any>(`${this.weatherBaseUrl}/weather?q=${city.name},${city.state},${city.country}&appid=${this.apiKey}`).toPromise();
  }

  getCitySuggestions(query: string): Observable<string[]> {
    return this.http.get<any[]>(`${this.geoBaseUrl}/direct?limit=15&q=${encodeURIComponent(query)}&appid=${this.apiKey}`);
  }
}
