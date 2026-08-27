# 电子成本卡报表插件（Demo）

本仓库用于客户演示：
- 业务 CRUD 走标准场景菜单（电子成本卡）
- 报表展示走自定义页面菜单（电子成本卡报表）

## 目录结构

- frontend/src/pages/cost_card_portal/
  - manifest.json
  - cost-card-report.vue
- frontend/dist/manifests/cost_card_portal.json
- frontend/dist/cost_card_portal/cost-card-report.js
- frontend/dist/assets/cost-card-report-Bv8iLtDC.css

## 菜单建议

- 场景菜单：`electronic-cost-card`，label=`电子成本卡`
- 自定义菜单：`electronic-cost-card-report`，label=`电子成本卡报表`，customRoute=`/plugins/cost-card/report`

## 服务器上传路径（示例）

将 dist 产物上传到宿主约定目录：

- `/plugins/frontend/dist/manifests/cost_card_portal.json`
- `/plugins/frontend/dist/cost_card_portal/cost-card-report.js`
- `/plugins/frontend/dist/assets/cost-card-report-Bv8iLtDC.css`

上传后重载插件资源（按你们环境的 reload 流程执行）。

## 说明

- 本 demo 不包含自动计算插件。
- 数据由标准功能场景做 CRUD。
- 报表页面使用静态样例数据，主要用于展示效果。
