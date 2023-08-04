import {
  Config,
  Init,
  Inject,
  Provide,
  Scope,
  ScopeEnum,
  ServiceFactory,
  delegateTargetPrototypeMethod,
  MidwayCommonError,
} from '@midwayjs/core';
import * as Devops20210625 from '@alicloud/devops20210625';
import * as OpenApi from '@alicloud/openapi-client';

@Provide()
@Scope(ScopeEnum.Singleton)
export class AlicloudDevopsServiceFactory extends ServiceFactory<Devops20210625.default> {
  @Config('alicloudDevops')
  alicloudDevopsConfig: OpenApi.Config;

  @Init()
  async init() {
    await this.initClients(this.alicloudDevopsConfig);
  }

  async createClient(config: OpenApi.Config): Promise<Devops20210625.default> {
    // const openApiConfig: OpenApi.Config = new OpenApi.Config({
    //   ...this.alicloudDevopsConfig,
    // });
    // // Endpoint 请参考 https://api.aliyun.com/product/devops
    // openApiConfig.endpoint = config.endpoint;
    return new Devops20210625.default(config) as Devops20210625.default;
  }
  getName() {
    return 'alicloudDevops';
  }
}

@Provide()
@Scope(ScopeEnum.Singleton)
export class AlicloudDevopsService implements Devops20210625.default {
  @Inject()
  private serviceFactory: AlicloudDevopsServiceFactory;
  private instance: Devops20210625.default;

  @Init()
  async init() {
    this.instance = this.serviceFactory.get(
      this.serviceFactory.getDefaultClientName?.() || 'default'
    );
    if (!this.instance) {
      throw new MidwayCommonError('devops default instance not found.');
    }
  }
}

// eslint-disable-next-line
export interface AlicloudDevopsService extends Devops20210625.default {}

delegateTargetPrototypeMethod(AlicloudDevopsService, [Devops20210625.default]);
