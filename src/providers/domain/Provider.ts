import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Provider extends BaseEntity {
    @PrimaryGeneratedColumn()
    providerId!: number;

    @Column()
    userId!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    phoneNumber!: string;

    @Column()
    email!: string;

    @Column()
    address!: string;

    @Column('simple-array')
    daysAvailability!: string[];

    @Column('simple-array')
    hoursAvailability!: string[];

    @Column('simple-array')
    categories!: string[];

    @Column('simple-array')
    urlImages!: string[];

    @Column("integer", { array: true })
    servicesId!: number[];

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}