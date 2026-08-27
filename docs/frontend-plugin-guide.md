# 前端插件开发指南

## 1. 目录结构

前端插件页面统一放在：

```text
plugins/frontend/src/pages/<plugin-code>/
  manifest.json
  <page>.vue
```

## 2. manifest 示例

```json
{
  "pluginCode": "supplier_portal",
  "pluginName": "供应商门户页面插件",
  "version": "0.1.0",
  "pages": [
    {
      "code": "supplier-dashboard",
      "displayName": "供应商总览",
      "route": {
        "name": "plugin-supplier-dashboard",
        "path": "/plugins/supplier/dashboard"
      },
      "entry": "./supplier-dashboard.vue",
      "bundle": "supplier-dashboard.es.js",
      "entryExport": "default",
      "propsSchema": {
        "type": "object"
      },
      "permissions": [],
      "hostFeatures": [],
      "layout": {
        "fullWidth": true
      },
      "metadata": {
        "icon": "dashboard"
      }
    }
  ]
}
```

## 3. 开发流程

1. 在 `plugins/frontend/src/pages/<plugin-code>/` 下创建页面和 `manifest.json`。
2. 在 `plugins/frontend/` 下执行 `npm install`。
3. 执行 `npm run build`。
4. 宿主会读取构建后的 bundle 和 manifest。

## 4. 参考示例

- 正式示例：`plugins/frontend/src/pages/supplier_portal/`
- 可复制模板：`plugins/examples/frontend/supplier_portal/`

## 5. 国际化约定

前端插件与后端插件统一复用：

```text
plugins/locales/<locale>.json
```

并按 `pluginCode` 做命名空间。  
宿主前端会把 `plugins/locales/*.json` merge 到现有 `vue-i18n`，所以前端插件应直接复用这套语言资源。

同一份语言包还可以覆盖平台前端文案，建议命名空间约定为：

- 平台前端：`platform.*`
- 前端插件：`<pluginCode>.*`
- 后端插件：`<pluginCode>.*`

推荐写法：

```js
import { usePluginI18n } from 'src/composables/usePluginI18n'

const { t } = usePluginI18n('supplier_portal')
t('pages.dashboard_title')
```

不要在不同插件目录里各自维护一套零散语言包。

## 6. 进一步阅读

- UI 控制协议见 [plugin-ui-protocol.md](/Users/mac4/Workspace/AsapFlow/plugins/docs/plugin-ui-protocol.md)
- 完整联调链路见 [plugin-e2e-examples.md](/Users/mac4/Workspace/AsapFlow/plugins/docs/plugin-e2e-examples.md)
