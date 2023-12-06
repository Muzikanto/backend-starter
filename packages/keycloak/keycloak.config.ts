import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory } from 'nest-keycloak-connect';
import { ConfigService } from '@packages/config';

@Injectable()
export class KeycloakConfig implements KeycloakConnectOptionsFactory {
  public readonly OAUTH_REALM_PUBLIC_KEY: string;
  public readonly OAUTH_PROVIDER_URL: string;
  public readonly OAUTH_REALM_NAME: string;
  public readonly OAUTH_REALM_CLIENT_SECRET: string;
  public readonly OAUTH_REALM_CLIENT_ID: string;

  constructor(configService: ConfigService) {
    this.OAUTH_REALM_PUBLIC_KEY = configService.getString('OAUTH_REALM_PUBLIC_KEY');
    this.OAUTH_PROVIDER_URL = configService.getString('OAUTH_PROVIDER_URL');
    this.OAUTH_REALM_NAME = configService.getString('OAUTH_REALM_NAME');
    this.OAUTH_REALM_CLIENT_SECRET = configService.getString('OAUTH_REALM_CLIENT_SECRET');
    this.OAUTH_REALM_CLIENT_ID = configService.getString('OAUTH_REALM_CLIENT_ID');
  }

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.OAUTH_PROVIDER_URL,
      realm: this.OAUTH_REALM_NAME,
      clientId: this.OAUTH_REALM_CLIENT_ID,
      secret: this.OAUTH_REALM_CLIENT_SECRET,
      // bearerOnly: true,
      // realmPublicKey: wrapPublicKey(this.OAUTH_REALM_PUBLIC_KEY),
      logLevels: ['debug', 'log', 'warn', 'error'],
      useNestLogger: false,
      // "confidential-port": 0,
      // policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      // tokenValidation: TokenValidation.ONLINE,
    };
  }
}
