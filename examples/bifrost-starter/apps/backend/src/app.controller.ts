import { Public } from '@auth/public.decorator';
import { Controller } from '@decorators/controller';
import { Get } from '@decorators/httpDecorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @Public()
  health(): Record<string, unknown> {
    // https://tools.ietf.org/id/draft-inadarei-api-health-check-01.html#rfc.section.3
    return { status: 'pass' };
  }
}
