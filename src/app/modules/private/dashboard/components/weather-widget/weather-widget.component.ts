import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherService } from "./weather.service";
import { BehaviorSubject, switchMap, map, Observable } from "rxjs";
import { IWeatherParams, WeatherRegions, IWeatherUI } from "@shared";

@Component({
  selector: 'promo-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetComponent implements OnInit {

  WeatherRegions = WeatherRegions;
  selectedRegion$ = new BehaviorSubject<IWeatherParams>(WeatherRegions.LVIV);
  weather$: Observable<IWeatherUI> = this.selectedRegion$.pipe(
    switchMap(region => this.weatherService.getWeatherForRegion(region)),
    map(({ weather: [current], main, name }) => ({
      temp: main.temp.toString().split('.').shift(),
      description: current.description,
      iconUrl: `http://openweathermap.org/img/wn/${current.icon}@2x.png`,
      date: new Date(),
      locationName: name
    }))
  );

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  iterableRegions = () => Object.values(WeatherRegions);

}
