import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuestService } from '../services/guest/guest.service';
import { GuestController } from '../controllers/guest.controller';
import { Guest } from '../entities/guest';

@Module({
	imports: [TypeOrmModule.forFeature([Guest])],
	providers: [GuestService],
	controllers: [GuestController],
	exports: [GuestService]
})
export class GuestModule {}
