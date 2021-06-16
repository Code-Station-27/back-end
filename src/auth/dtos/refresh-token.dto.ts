import { IsJWT, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsJWT()
  token: string;

  @IsString()
  refresh_token: string;
}
