import { ServiceFactory, ServiceFactoryConfigOption } from "@midwayjs/core";

export * from './dist/index';

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    alicloudDevops?: ServiceFactoryConfigOption<{
      accessKeyId: string;
      accessKeySecret: string;
      endpoint: string;
    }>;
  }
}
