import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor() {}

  /**
   * Check health
   * @returns
   */
  checkHealth() {
    return { message: 'pong' };
  }
}
