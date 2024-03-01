import { MailerOptions } from '@nestjs-modules/mailer';
import { MailerOptionsFactory } from '@nestjs-modules/mailer/dist/interfaces/mailer-options-factory.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@packages/config';
import { Injectable } from '@nestjs/common';
import path from 'path';

@Injectable()
export class SmtpConfig implements MailerOptionsFactory {
  protected readonly user: string;
  protected readonly pass: string;
  protected readonly host: string;

  constructor(protected readonly configService: ConfigService) {
    this.user = configService.getString('EMAIL_USER');
    this.pass = configService.getString('EMAIL_PASSWORD');
    this.host = configService.getString('EMAIL_HOST');
  }
  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        host: this.host,
        port: 587,
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false, // true for 465, false for other ports
        auth: {
          user: this.user,
          pass: this.pass,
        },
      },
      defaults: {
        from: '"backend" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: path.resolve('templates') + '/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    };
  }
}
