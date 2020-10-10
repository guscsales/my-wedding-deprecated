import { Injectable, Logger } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { GuestRepository } from '../../repositories/guest.repository';

@Injectable()
export class GuestService {
	private readonly logger = new Logger(GuestService.name);

	constructor(private guestRepository: GuestRepository) {
		this.guestRepository = getCustomRepository(GuestRepository);
	}
}
