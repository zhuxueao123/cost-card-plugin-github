# Plugins Workspace

这个目录预期会单独开放给客户维护，并可独立作为一个 Git 仓库使用。

## 目录约定

```text
plugins/
  backend/                # 实际会被 Runtime 加载的后端插件
  frontend/               # 实际会被宿主前端构建/加载的前端插件工程
  locales/                # 客户统一维护的平台/插件语言资源目录
  docs/                   # 面向客户的插件开发文档
  examples/               # 示例代码，不会被宿主自动加载
```

说明：
- `backend/` 与 `frontend/` 是正式插件目录。
- `locales/` 是统一语言资源目录，平台前端、前端插件、后端插件共用这一套外置语言包。
- `docs/` 用于说明插件清单、系统能力、标准 API、开发约束。
- `examples/` 仅作为参考模板，客户可复制到 `backend/` 或 `frontend/src/pages/` 后再改造成正式插件。

## 交付建议

如果客户要单独维护插件仓库，建议至少保留以下内容：
- `backend/`
- `frontend/`
- `locales/`
- `docs/`
- `examples/`

## 快速开始

1. 阅读 [docs/overview.md](/Users/mac4/Workspace/AsapFlow/plugins/docs/overview.md) 了解整体结构。
2. 阅读 [docs/backend-plugin-guide.md](/Users/mac4/Workspace/AsapFlow/plugins/docs/backend-plugin-guide.md) 开发 Python Runtime 插件。
3. 阅读 [docs/frontend-plugin-guide.md](/Users/mac4/Workspace/AsapFlow/plugins/docs/frontend-plugin-guide.md) 开发前端页面插件。
4. 阅读 [docs/core-sdk-reference.md](/Users/mac4/Workspace/AsapFlow/plugins/docs/core-sdk-reference.md) 查看后端插件可调用的标准能力。
5. 阅读 [docs/plugin-i18n-guide.md](/Users/mac4/Workspace/AsapFlow/plugins/docs/plugin-i18n-guide.md) 了解统一语言资源目录与多语言约定。
6. 从 [examples/backend/supplier_guard](/Users/mac4/Workspace/AsapFlow/plugins/examples/backend/supplier_guard) 或 [examples/frontend/supplier_portal](/Users/mac4/Workspace/AsapFlow/plugins/examples/frontend/supplier_portal) 复制模板开始。

## 重要约束

- 后端插件不能执行原生 SQL。
- 后端插件如需数据库侧逻辑，请调用存储过程/函数。
- `examples/` 下的代码不会被宿主自动发现或加载。
- `locales/` 是客户主要维护的语言资源目录；平台前端源码内置语言包仅作为 fallback。
- 正式启用插件前，请将示例目录复制到正式目录并修改编码、名称、权限、版本等信息。
