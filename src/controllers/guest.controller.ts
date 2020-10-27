import { Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { GuestService } from '../services/guest/guest.service';

@Controller('guests')
export class GuestController {
	constructor(private readonly guestService: GuestService) {}

	@Get(':id')
	async getById(@Param() { id }) {
		return await this.guestService.getById(id);
	}

	@Patch('confirm-presence/:id')
	async confirmPresence(@Param() { id }) {
		return await this.guestService.confirmPresence(id);
	}

	@Post('create-all-guests')
	async createAllGuests() {
		return await this.guestService.createAllGuests();
	}
}
