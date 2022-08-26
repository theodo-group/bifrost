import { dataSourceOptions } from 'datasource.options';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize().catch((err) => {
  console.error('Error during Data Source initialization', err);
});

export default AppDataSource;
