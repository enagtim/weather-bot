import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

@Module({
	imports: [BotModule, ConfigModule.forRoot(), WeatherModule],
})
export class AppModule {}
