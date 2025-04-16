import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';
import { GuestModule } from './guest/guest.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WeddingExpenseModule } from './wedding-expense/wedding-expense.module';
import { ExpenseTypeModule } from './expense-type/expense-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    GuestModule,
    UsersModule,
    AuthModule,
    WeddingExpenseModule,
    ExpenseTypeModule,
  ],
})
export class AppModule {}
