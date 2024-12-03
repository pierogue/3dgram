import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramUserModule } from './telegram-user/telegram-user.module';
// import { ModelModule } from '../model/model.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yourpassword',
      database: '3d_catalog',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    TelegramUserModule,
    // ModelModule,
  ],
})
export class AppModule {}
