export interface Reminder {
  id: string;
  text: string;
  dateTime: Date;
  color: string;
  city?: Location;
  weather?: any;
}
export interface Location {
  country: string;
  lat: number;
  local_names?: Object;
  lon: number;
  name: string;
  label: string;
  state: string;
}

export interface WeatherResponse {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
}
