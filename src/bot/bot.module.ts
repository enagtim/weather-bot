import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
	imports: [
		WeatherModule,
		ConfigModule,
		TelegrafModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
			}),
			inject: [ConfigService],
		}),
	],
	providers: [BotService],
})
export class BotModule {}
