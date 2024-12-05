import { DataSource } from 'typeorm';
import { Format } from './format.entity';

export const formatProviders = [
  {
    provide: 'FORMAT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Format),
    inject: ['DATA_SOURCE'],
  },
];
