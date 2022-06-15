import { Expose, plainToClass, Type } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';
import { Environment } from '../../Enviroment';

export class AppConfig {
  @Expose()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Expose()
  @Type(() => Number)
  PORT: number;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(
    AppConfig,
    { ...config },
    { enableImplicitConversion: true, excludeExtraneousValues: true },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
