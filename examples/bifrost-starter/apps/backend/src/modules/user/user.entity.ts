import { Column, Entity } from 'typeorm';

import BaseEntity from '@helpers/BaseEntity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 50 })
  name!: string;

  @Column({ length: 100, select: false })
  password!: string;

  @Column({ length: 100 })
  email!: string;

  @Column('simple-array')
  roles!: string[];
}
