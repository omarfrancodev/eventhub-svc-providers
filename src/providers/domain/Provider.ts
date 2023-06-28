import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Provider extends BaseEntity {
    @PrimaryGeneratedColumn()
    providerId!: number;

    @Column('integer', { nullable: true })
    userId!: number | null;

    @Column('varchar', { nullable: true })
    name!: string | null;

    @Column('varchar', { nullable: true })
    description!: string | null;

    @Column('varchar', { nullable: true })
    phoneNumber!: string | null;

    @Column('varchar', { nullable: true })
    email!: string | null;

    @Column('varchar', { nullable: true })
    address!: string | null;

    @Column('simple-array', { nullable: true })
    daysAvailability!: string[] | null;

    @Column('simple-array', { nullable: true })
    hoursAvailability!: string[] | null;

    @Column('simple-array', { nullable: true })
    categories!: string[] | null;

    @Column('simple-array')
    urlImages!: string[];

    @Column('integer', { array: true, nullable: true })
    servicesId!: number[] | null;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt!: Date;
}