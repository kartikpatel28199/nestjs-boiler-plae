import { Entity, Column } from 'typeorm';
import { GenderTypes } from '../../../core/constants/enum';
import { AbstractEntity } from '../../../core/entities/abstract.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ name: 'name', type: 'varchar', length: 120 })
  name: string;

  @Column({ name: 'designation', type: 'varchar', length: 120, default: null })
  designation: string;

  @Column({ name: 'email', type: 'varchar', length: 120, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'salt', type: 'varchar', nullable: false })
  salt: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: GenderTypes,
    default: GenderTypes.NOT_SPECIFIED,
  })
  gender: GenderTypes;

  @Column({ name: 'device_type', type: 'varchar', default: null })
  deviceType: string;

  @Column({ name: 'device_id', type: 'varchar', default: null })
  deviceId: string;

  @Column({ name: 'ip', type: 'varchar', default: null })
  ip: string;

  @Column({ name: 'timezone', type: 'varchar', default: null })
  timeZone: string;

  @Column({ name: 'active', width: 1, type: 'boolean', default: true })
  active: boolean;
}
