import {
    WinstonModuleOptions,
    utilities as nestWistonModuleUtilites
} from "nest-winston";
import * as winston from 'winston'
export const winstonConfig: WinstonModuleOptions = {
    levels: winston.config.npm.levels,
    level: 'verbose',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                nestWistonModuleUtilites.format.nestLike()
            ),
        }),
        new winston.transports.File({
            level: 'verbose',
            filename: 'application.log',
            dirname: 'logs'
        })
    ]
}