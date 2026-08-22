import { IsBoolean } from 'class-validator';

export class UpdateBlacklistDto {
  @IsBoolean()
  isBlacklisted!: boolean;
}
