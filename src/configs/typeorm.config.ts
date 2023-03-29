import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'pguser',
    password: 'pgpassword',
    database: 'nestjs',
    entities: [__dirname + '/../**/*entity.{js,ts}'],
    synchronize: true
};

export const typeOrmDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'pguser',
    password: 'pgpassword',
    database: 'nestjs',
    entities: [__dirname + '/../**/*entity.{js,ts}'],
    synchronize: true
}