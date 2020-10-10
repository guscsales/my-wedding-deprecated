import { Controller, Get, UseGuards } from '@nestjs/common';
import { GuestService } from '../services/guest/guest.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('guests')
export class GuestController {
	constructor(private readonly guestService: GuestService) {}

	@Get()
	async get() {
		return {};
	}
}
