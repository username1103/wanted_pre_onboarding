import { Logger, Module } from '@nestjs/common';
import { AppConfigModule } from './common/config/app/config.module';
import { DatabaseModule } from './common/config/database/database.module';

@Module({
  imports: [AppConfigModule, DatabaseModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
