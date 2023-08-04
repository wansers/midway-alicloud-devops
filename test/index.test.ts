import { createLightApp, close } from '@midwayjs/mock';
import * as custom from '../src';
import { join } from 'path';

describe('/test/index.test.ts', () => {
  it('test single client', async () => {
    const app = await createLightApp(join(__dirname, './fixtures/base-app'));

    const alicloudDevopsService = await app.getApplicationContext().getAsync(custom.AlicloudDevopsService);
    expect(alicloudDevopsService).toBeDefined();
    await close(app);
  });
});
