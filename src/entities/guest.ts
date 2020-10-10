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
	id: string;

	@Column({ length: 500 })
	fullName: string;

	@Column()
	guests: number;

	@CreateDateColumn({
		precision: null,
		default: () => 'CURRENT_TIMESTAMP'
	})
	createdAt: Date;

	@UpdateDateColumn({
		precision: null,
		default: () => 'CURRENT_TIMESTAMP'
	})
	updatedAt: Date;
}
