import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryColumn
} from 'typeorm';

@Entity({ name: 'guest' })
export class Guest {
	@PrimaryColumn()
	id?: string;

	@Column()
	names: string;

	@Column({ default: false })
	confirmed?: boolean;

	@CreateDateColumn({
		precision: null,
		default: () => 'CURRENT_TIMESTAMP'
	})
	createdAt?: Date;

	@UpdateDateColumn({
		precision: null,
		default: () => 'CURRENT_TIMESTAMP'
	})
	updatedAt?: Date;
}
