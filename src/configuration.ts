import { Configuration } from '@midwayjs/core';
import { AlicloudDevopsServiceFactory } from './service/alicloudDevopsService';

@Configuration({
  namespace: 'alicloudDevops',
  importConfigs: [
    {
      default: {
        alicloudDevops: {
          default: {},
        },
      },
    },
  ],
})
export class AlicloudDevopsConfiguration {
  async onReady(container) {
    await container.getAsync(AlicloudDevopsServiceFactory);
  }
}
