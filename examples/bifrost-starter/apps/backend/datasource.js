const { DataSource } = require('typeorm');

const { dataSourceOptions } = require('./src/datasource.options.js');

const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize().catch((err) => {
  console.error('Error during Data Source initialization', err);
});

module.exports = {
  AppDataSource,
};
