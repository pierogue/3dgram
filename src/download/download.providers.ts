import { DataSource } from 'typeorm';
import { Download } from './download.entity';

export const downloadProviders = [
  {
    provide: 'DOWNLOAD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Download),
    inject: ['DATA_SOURCE'],
  },
];
