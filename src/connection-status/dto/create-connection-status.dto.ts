import { IsString } from 'class-validator';

export class ConnectionStatusDto {
  @IsString()
  userId: string;

  @IsString()
  connectionStatus: string; // "No network available", "No internet access", "Internet is accessible"
}
