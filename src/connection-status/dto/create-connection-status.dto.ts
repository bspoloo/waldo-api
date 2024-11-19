import { IsBoolean, IsString } from 'class-validator';

export class ConnectionStatusDto {
  @IsString()
  userId: string;

  @IsBoolean()
  isConnected: boolean;

  @IsString()
  lastChecked: string; // Debe ser un string válido en formato DATETIME
}
