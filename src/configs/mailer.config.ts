import { MailerOptions  } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from "path";

export const mailerConfig: MailerOptions = {
    template: {
        dir: path.resolve(__dirname, '..','..','templates'),
        adapter: new HandlebarsAdapter(),
        options: {
            extName: '.hbs',
            layoutsDir: path.resolve(__dirname, '..','..','templates'),
        }
    },
    transport: {
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use TLS
        auth: {
          user: "gduartemenezes@gmail.com",
          pass: "c4l4br3s4#G3*",
        },
      }}

