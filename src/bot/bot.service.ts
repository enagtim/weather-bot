import { Injectable } from '@nestjs/common';
import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { MESSAGES } from '../common/messages';
import { Context } from 'telegraf';
import { WeatherService } from 'src/weather/weather.service';
import { Message } from 'telegraf/typings/core/types/typegram';

@Update()
@Injectable()
export class BotService {
	constructor(private weatherService: WeatherService) {}
	@Start()
	public async onStart(@Ctx() ctx: Context): Promise<void> {
		await ctx.reply(MESSAGES.START);
	}
	@Command('weather')
	public async onWeather(@Ctx() ctx: Context): Promise<void> {
		const message = ctx.message as Message.TextMessage;
		if (!message || !message.text) {
			await ctx.reply(MESSAGES.TEXT);
		}
		const args = message.text.split(' ').slice(1);

		const city = args.join(' ');
		const weather = await this.weatherService.getWeather(city);
		await ctx.reply(weather);
	}
}
