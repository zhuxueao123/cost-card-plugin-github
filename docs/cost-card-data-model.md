# 电子成本卡数据模型（按原型）

## 1. 实体关系

- 主表：cost_card（电子成本卡）
- 子表：cost_card_material（材料明细）
- 子表：cost_card_labor（人工明细）
- 子表：cost_card_expense（费用明细）

关联键：
- 主表.card_no = 子表.card_no

## 2. 主表字段（cost_card）

产品信息：
- card_no 成本卡编号
- version_no 版本号
- product_code 产品编码
- product_name 产品名称
- factory 工厂
- product_category 产品类别
- customer_name 客户名称
- status 状态

报价信息：
- tax_rate 税率
- quoted_price_tax 销售含税报价
- sales_revenue 销售收入
- rebate_rate 票前扣点与返利率
- account_period_days 账期（天）
- freight_amount 运费

成本汇总：
- material_total 材料成本
- labor_total 人工成本
- expense_total 费用成本
- total_cost 总成本

利润指标：
- contribution_amount 边际贡献额
- contribution_rate 边际贡献率
- gross_profit_amount 毛利额
- gross_profit_rate 毛利率
- pretax_profit_amount 税前利润额
- pretax_profit_rate 税前利润率
- income_tax_amount 所得税额
- income_tax_rate 所得税率
- net_profit_amount 净利润额
- net_profit_rate 净利润率

## 3. 材料明细（cost_card_material）

- card_no 成本卡编号
- line_no 行号
- item_name 物料名称
- item_code 物料编码
- spec 规格
- unit 单位
- formula_qty 配方量
- yield_rate 出成率
- actual_qty 实际量
- unit_price 单价
- amount 金额
- cost_category 成本分类

## 4. 人工明细（cost_card_labor）

- card_no 成本卡编号
- line_no 行号
- process_name 工序
- work_minutes 工时（分钟）
- worker_count 人数
- wage 工资
- social_security 社保
- housing_fund 公积金
- subtotal 小计

## 5. 费用明细（cost_card_expense）

- card_no 成本卡编号
- line_no 行号
- expense_type 费用类别
- detail_name 明细
- amount 金额
- ratio 占比

## 6. 页面映射建议

- list 场景：展示编号、版本、产品信息、客户、状态、总成本、利润核心字段
- detail 场景：主表字段 + 3 张明细表（材料/人工/费用）
- 报表页（customRoute）：展示占比环图、利润卡片、费用分布图
