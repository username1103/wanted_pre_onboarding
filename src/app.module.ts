import { Logger, Module } from '@nestjs/common';
import { AppConfigModule } from './common/config/app/config.module';
import { DatabaseModule } from './common/config/database/database.module';
import { JobVacancyModule } from './job-vacancy/job-vacancy.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, JobVacancyModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
