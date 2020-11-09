import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { GuestService } from '../services/guest/guest.service';

@Controller('guests')
export class GuestController {
	constructor(private readonly guestService: GuestService) {}

	@Get(':id')
	async getById(@Param() { id }) {
		try {
			return await this.guestService.getById(id);
		} catch (e) {
			throw e;
		}
	}

	@Patch('confirm-presence/:id')
	async confirmPresence(@Param() { id }) {
		try {
			return await this.guestService.confirmPresence(id);
		} catch (e) {
			throw e;
		}
	}

	@Post('create-all-guests')
	async createAllGuests() {
		return await this.guestService.createAllGuests();
	}
}
