import { IWeatherParams } from "@shared";

export const WeatherRegions: Record<string, IWeatherParams> = {
  LVIV: {
    lat: '49.8397',
    lon: '24.0297',
    name: 'Lviv'
  },
  KYIV: {
    lat: '50.4501',
    lon: '30.5234',
    name: 'Kyiv'
  },
  ODESA: {
    lat: '46.4825',
    lon: '30.7233',
    name: 'Odesa'
  },
  IVASNO_F: {
    lat: '48.9226',
    lon: '24.7111',
    name: 'Ivano-Frankivsk'
  },
  TERNOPIL: {
    lat: '49.5535',
    lon: '25.5948',
    name: 'Ternopil'
  }
}
