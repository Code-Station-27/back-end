/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    PORT: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
  }
}
