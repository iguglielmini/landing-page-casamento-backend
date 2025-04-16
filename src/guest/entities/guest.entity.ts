import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phone: string;

  @Column()
  invitedBy: 'Noivo' | 'Noiva' | 'Ambos';

  @Column({ default: false })
  hasCompanion: boolean;

  @Column()
  type: 'Amigos' | 'Padrinhos' | 'Familiar';

  @Column({ default: false })
  confirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
