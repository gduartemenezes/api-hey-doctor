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
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "56e8c823d3aba8",
        pass: "eeb4262325ffb1"
      }
    }
  }