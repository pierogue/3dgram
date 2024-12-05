import { Category } from 'src/category/category.entity';
import { Download } from 'src/download/download.entity';
import { Format } from 'src/format/format.entity';
import { Like } from 'src/like/like.entity';
import { Model } from 'src/model/model.entity';
import { Role } from 'src/role/role.entity';
import { TelegramUser } from 'src/telegram-user/telegram-user.entity';
import { DataSource } from 'typeorm';
import * as process from 'process';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Role, TelegramUser, Format, Like, Model, Category, Download],
        synchronize: true, 
      });

      return dataSource.initialize();
    },
  },
];
