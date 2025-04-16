import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // precisa exportar pro AuthModule
})
export class UsersModule implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}

  async onApplicationBootstrap() {
    const adminExists = await this.usersService.findByUsername(
      process.env.ADMIN_USERNAME ?? 'admin',
    );

    if (!adminExists) {
      await this.usersService.create({
        username: process.env.ADMIN_USERNAME ?? 'admin',
        password: process.env.ADMIN_PASSWORD ?? 'admin123',
        role: 'admin',
      });
      console.log('✅ Admin padrão criado!');
    } else {
      console.log('ℹ️ Admin já existente');
    }
  }
}
