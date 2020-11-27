require('dotenv').config({
	path: `${process.cwd()}/src/settings/${process.env.PROFILE}/.env`
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { UnauthorizedException } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.enableCors();
	app.use(helmet());
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000,
			max: 10000
		})
	);
	app.use((req, res, next) => {
		if (
			process.env.PROFILE === 'prod' &&
			req.headers['x-forwarded-proto'] !== 'https'
		) {
			res.redirect('https://' + req.headers.host + req.url);
		}

		if (req.path.indexOf('magalu') !== -1) {
			res.redirect(
				'https://www.querodecasamento.com.br/lista-de-casamento/gustavo-helena/'
			);
		} else if (req.path.indexOf('camicado') !== -1) {
			res.redirect('https://lista.camicado.com.br/helegus');
		}

		if (req.url.indexOf('/api') !== -1) {
			const weddingApiKey = req.headers['x-api-key'];
			const { WEDDING_API_KEY } = process.env;

			if (!weddingApiKey || weddingApiKey !== WEDDING_API_KEY) {
				throw new UnauthorizedException('Missing API KEY');
			}
		}

		next();
	});

	await app.listen(3000);
}

bootstrap();
