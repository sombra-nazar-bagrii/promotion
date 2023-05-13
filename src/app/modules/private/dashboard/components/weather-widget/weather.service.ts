import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IWeatherParams, IWeatherData } from "@shared";
import { Observable } from "rxjs";
import { environment } from "@env";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  constructor(private http: HttpClient) {}

  getWeatherForRegion(regionData: IWeatherParams): Observable<IWeatherData> {
    return this.http.get<IWeatherData>(
      this.apiUrl,
      {
        params: {
          lat: regionData.lat,
          lon: regionData.lon,
          appid: environment.weatherApiKay,
          units: 'metric'
        }
      });
  }

}
