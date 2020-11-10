import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestModule } from './modules/guest.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path = require('path');

const {
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	DATABASE_SCHEMA
} = process.env;

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: DATABASE_HOST,
			port: (DATABASE_PORT as unknown) as number,
			username: DATABASE_USERNAME,
			password: DATABASE_PASSWORD,
			database: DATABASE_SCHEMA,
			entities: [`${__dirname}/entities/*{.ts,.js}`],
			synchronize: true,
			logging: process.env.PROFILE !== 'prod',
			migrations: [`${__dirname}/migrations/*.ts`]
		}),
		ServeStaticModule.forRoot({
			rootPath:
				process.env.PROFILE !== 'prod'
					? path.join(__dirname, '..', 'public')
					: path.join(__dirname, '..', 'dist', 'public')
		}),
		GuestModule,
		Logger
	],
	providers: [Logger]
})
export class AppModule {}
