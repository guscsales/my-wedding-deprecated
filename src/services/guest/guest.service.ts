import {
	ForbiddenException,
	Injectable,
	Logger,
	NotFoundException
} from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { GuestRepository } from '../../repositories/guest.repository';

const guests = [
	['Gustavo', 'Helena', 'Laurinha'],
	['Djalma', 'Marizete'],
	['Marlene', 'Amanda']
];

@Injectable()
export class GuestService {
	private readonly logger = new Logger(GuestService.name);

	constructor(private guestRepository: GuestRepository) {
		this.guestRepository = getCustomRepository(GuestRepository);
	}

	async createAllGuests() {
		try {
			const completedGuests = guests.map((names, index) => ({
				id: `GH${(index + 1).toString().padStart(3, '0')}`,
				names: names.join(','),
				confirmed: false
			}));

			const data = await this.guestRepository.save(completedGuests);

			return { statusCode: 201, guests: data };
		} catch ({ message: { statusCode, message }, ...e }) {
			this.logger.error(statusCode, e);
			return { statusCode, message, guests: [] };
		}
	}

	async confirmPresence(id: string) {
		try {
			const guest = await this.guestRepository.findOne(id);

			if (!guest) {
				const e = new NotFoundException('Convidado não encontrado.');
				this.logger.error(e, e.stack);
				throw e;
			}

			if (guest.confirmed) {
				return {
					statusCode: 201,
					message: `${
						guest.names.split(',')[0]
					}, todos os convidados para o seu código já estão confirmados, obrigado!`
				};
			}

			await this.guestRepository.update(id, { confirmed: true });
			const data = await this.guestRepository.findOne(id);

			return { statusCode: 201, guest: data };
		} catch ({ message: { statusCode, message }, ...e }) {
			this.logger.error(statusCode, e);
			return { statusCode, message, guest: null };
		}
	}

	async getById(id: string) {
		const guest = await this.guestRepository.findOne(id);
		let message = '';

		if (!guest) {
			const e = new NotFoundException('Código do convidado inválido.');
			this.logger.error(e, e.stack);
			throw e;
		}

		if (guest.confirmed) {
			message = `${
				guest.names.split(',')[0]
			}, todos os convidados para o seu código já estão confirmados, obrigado!`;
		}

		return { statusCode: 201, guest, message };
	}
}
