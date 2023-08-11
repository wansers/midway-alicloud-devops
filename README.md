# midway-alicloudDevops
this is a midway component for alicloudDevops SDK.
###### 用于快捷使用阿里云云效SDK的接口

参考 Document: [https://midwayjs.org](https://midwayjs.org)

## Install

```bash
pnpm add midway-alicloudDevops @alicloud/tea-util
```
## config for midwayjs config-default.ts
```typescript jsx
import { MidwayConfig } from '@midwayjs/core';

export default {
  alicloudDevops: {
    client: {
      // 必填，您的 AccessKey ID
      accessKeyId: process.env.ALI_DEVOPS_SDK_ACCESS_ID,
      // 必填，您的 AccessKey Secret
      accessKeySecret: process.env.ALI_DEVOPS_SDK_ACCESS_SECRET,
      // Endpoint 请参考 https://api.aliyun.com/product/devops
      endpoint: process.env.ALI_DEVOPS_SDK_ENDPOINT,
    },
  },
} as MidwayConfig;
```

## config for midwayjs configuration.ts
```typescript jsx
import { Configuration, } from "@midwayjs/core";
import { join } from 'path';
import * as alicloudDevops from 'midway-alicloud-devops';

@Configuration({
  imports: [
    alicloudDevops,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
}
```

## use in service
```typescript jsx
import { Inject, Provide } from '@midwayjs/core';
import { AlicloudDevopsService } from 'midway-alicloud-devops';
import * as $Util from '@alicloud/tea-util';

@Provide()
export class RepositoryService {
  @Inject()
  alicloudDevopsService: AlicloudDevopsService;

  async createRepository(params) {
    const createRepositoryRequest: any = {
      // 企业标识，也称企业id，字符串形式，可在云效访问链接中获取，如 https://devops.aliyun.com/organization/【OrganizationId】
      organizationId: process.env['ALI_DEVOPS_SDK_ORG_ID'],
      sync: true,
      name: params.name,
      description: params.description,
      visibilityLevel: 10,
    };
    const runtime = new $Util.RuntimeOptions({});
    const headers: { [key: string]: string } = {};
    const { body = {} } =
      (await this.alicloudDevopsService.createRepositoryWithOptions(
        createRepositoryRequest,
        headers,
        runtime
      )) || {};
    return body;
  }
}

```
## License

[MIT](LICENSE)
