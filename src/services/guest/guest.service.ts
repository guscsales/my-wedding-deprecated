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
				throw new NotFoundException('Convidado não encontrado');
			}

			if (guest.confirmed) {
				throw new ForbiddenException(
					'Obrigado! Sua presença já foi confirmada!'
				);
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
		try {
			const guest = await this.guestRepository.findOne(id);

			if (!guest) {
				throw new NotFoundException('Código do convidado inválido');
			}

			return { statusCode: 201, guest };
		} catch ({ message: { statusCode, message }, ...e }) {
			this.logger.error(statusCode, e);
			return { statusCode, message, guest: null };
		}
	}
}
