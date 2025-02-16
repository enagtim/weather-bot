import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IWeatherResponse } from 'src/interfaces/weather.response.interface';

@Injectable()
export class WeatherService {
	constructor(private configService: ConfigService) {}

	public async getWeather(city: string): Promise<string> {
		const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
		try {
			const { data } = await axios.get<IWeatherResponse>(
				'https://api.openweathermap.org/data/2.5/weather',
				{
					params: {
						q: city,
						appid: apiKey,
						units: 'metric',
						lang: 'ru',
					},
				},
			);
			return `${city}, температура : ${data.main.temp}°C, ${data.weather[0].description} 🌡`;
		} catch (error) {
			if (error instanceof Error) {
				console.error('Ошибка при получении погоды:', error.message);
				return 'Пожалуйста, укажи город, например: /weather Москва';
			}
		}
	}
}
