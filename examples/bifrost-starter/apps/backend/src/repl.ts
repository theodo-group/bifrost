import { repl } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async () => {
  await repl(AppModule);
};
void bootstrap();
