import { Express } from 'express';
import { pluginUtils } from '@verdaccio/core';
import { Auth } from '@verdaccio/auth';
import { ConfigUrl } from './types';

export default class UrlPlugin
  extends pluginUtils.Plugin<ConfigUrl>
  implements pluginUtils.ExpressMiddleware<ConfigUrl, {}, Auth>
{
  constructor(readonly config: ConfigUrl, options: pluginUtils.PluginOptions) {
    super(config, options);
  }

  register_middlewares(app: Express, auth: Auth) {
    if (this.config.enabled) {
      app.use('/package', (req, res) => {
        res.redirect(301, '/-/web/detail' + req.url);
      });
    }
  }
}
