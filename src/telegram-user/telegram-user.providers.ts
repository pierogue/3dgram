import { DataSource } from 'typeorm';
import { TelegramUser } from './telegram-user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TelegramUser),
    inject: ['DATA_SOURCE'],
  },
];
