import { EntityRepository, Repository } from 'typeorm';
import { Guest } from '../entities/guest';

@EntityRepository(Guest)
export class GuestRepository extends Repository<Guest> {}
