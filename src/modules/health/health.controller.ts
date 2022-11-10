import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { HealthService } from './health.service';

@Controller({
  path: 'health',
  version: '1',
})
@ApiTags('Health')
@ApiExcludeController()
@UseInterceptors(TransformInterceptor)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * Check health
   * @returns
   */
  @Get()
  async checkHealth() {
    const data = await this.healthService.checkHealth();
    return { data };
  }
}
