<template>
  <section class="cost-card-page">
    <div class="debug-tag">form-base {{ FORM_BASE_BUILD_TAG }}</div>
    <header class="scene-head">
      <h1>{{ sceneTitle }}</h1>
      <p>{{ sceneCode }}</p>
    </header>

    <section class="block">
      <h2>产品信息</h2>
      <div class="top-layout">
        <div class="grid product-grid">
          <label v-for="f in visibleProductFields" :key="f.key" class="field">
            <span>{{ f.label }}</span>
            <input v-model="product[f.key]" :readonly="!productEditable" />
          </label>
        </div>
        <div class="summary-cards">
          <article class="summary-card sc-blue">
            <div class="title">材料成本</div>
            <div class="amount">{{ summaryView.materialAmount }}</div>
            <div class="ratio">{{ summaryView.materialRatio }}</div>
          </article>
          <article class="summary-card sc-green">
            <div class="title">人工成本</div>
            <div class="amount">{{ summaryView.laborAmount }}</div>
            <div class="ratio">{{ summaryView.laborRatio }}</div>
          </article>
          <article class="summary-card sc-orange">
            <div class="title">费用成本</div>
            <div class="amount">{{ summaryView.expenseAmount }}</div>
            <div class="ratio">{{ summaryView.expenseRatio }}</div>
          </article>
          <article class="summary-card sc-total">
            <div class="title">总成本</div>
            <div class="amount">{{ summaryView.totalCost }}</div>
          </article>
        </div>
      </div>
    </section>

    <section class="block">
      <h2>产品报价与汇总</h2>
      <div class="quote-layout">
        <div class="left-panels">
          <div class="inner-panel">
            <h3>销售报价</h3>
            <div class="grid quote-grid">
              <label class="field"><span>税率</span><input :value="quoteView.taxRate" readonly /></label>
              <label class="field"><span>销售含税报价</span><input :value="quoteView.quotedPriceTax" readonly /></label>
              <label class="field"><span>销售收入</span><input :value="quoteView.salesRevenue" readonly /></label>
              <label class="field"><span>票前扣点与返利</span><input :value="quoteView.rebateRate" readonly /></label>
              <label class="field"><span>账期</span><input :value="quoteView.accountPeriodDays" readonly /></label>
              <label class="field"><span>运费</span><input :value="quoteView.freightAmount" readonly /></label>
            </div>
          </div>
          <div class="inner-panel">
            <h3>利润</h3>
            <div class="profit-cards">
              <article class="profit-card pc-blue"><span>边际贡献</span><b>{{ profitView.contributionAmount }}</b><em>{{ profitView.contributionRate }}</em></article>
              <article class="profit-card pc-green"><span>毛利额</span><b>{{ profitView.grossProfitAmount }}</b><em>{{ profitView.grossProfitRate }}</em></article>
              <article class="profit-card pc-orange"><span>税前利润</span><b>{{ profitView.pretaxProfitAmount }}</b><em>{{ profitView.pretaxProfitRate }}</em></article>
              <article class="profit-card pc-dark"><span>所得税</span><b>{{ profitView.incomeTaxAmount }}</b><em>{{ profitView.incomeTaxRate }}</em></article>
              <article class="profit-card pc-main"><span>净利润</span><b>{{ profitView.netProfitAmount }}</b><em>{{ profitView.netProfitRate }}</em></article>
            </div>
          </div>
        </div>
        <aside class="inner-panel ratio-panel">
          <h3>成本占比</h3>
          <div class="ratio-wrap">
            <div class="ratio-ring" :style="ratioRingStyle"></div>
            <ul class="legend">
              <li><i class="c1"></i><span>材料 {{ summaryView.materialAmount }}</span><b>{{ ratioChartView.materialRatio }}</b></li>
              <li><i class="c3"></i><span>人工 {{ summaryView.laborAmount }}</span><b>{{ ratioChartView.laborRatio }}</b></li>
              <li><i class="c2"></i><span>费用 {{ summaryView.expenseAmount }}</span><b>{{ ratioChartView.expenseRatio }}</b></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('material')">
      <div class="section-head">
        <h2>材料成本</h2>
        <span class="tag-blue">{{ summaryView.materialAmount }}</span>
      </div>
      <div class="split-layout">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th v-for="c in materialVisibleColumns" :key="c.key">{{ c.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in materialRows" :key="'m-' + idx" :class="{ alt: idx % 2 === 1 }">
                <td v-for="c in materialVisibleColumns" :key="c.key">
                  <input
                    v-model="row[c.key]"
                    :readonly="!isCellEditable('material', c.key)"
                    :class="{ readonly: !isCellEditable('material', c.key) }"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="side-panel">
          <h3>材料构成</h3>
          <div class="mini-ring material-ring"></div>
          <ul class="legend compact">
            <li><i class="c2"></i><span>包材 ¥3.89</span><b>47.5%</b></li>
            <li><i class="c1"></i><span>蔬果 ¥2.22</span><b>27.1%</b></li>
            <li><i class="c3"></i><span>调味料 ¥2.08</span><b>25.4%</b></li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('labor')">
      <div class="section-head">
        <h2>人工成本</h2>
        <span class="tag-green">{{ summaryView.laborAmount }}</span>
      </div>
      <div class="split-layout">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th v-for="c in laborVisibleColumns" :key="c.key">{{ c.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in laborRows" :key="'l-' + idx" :class="{ alt: idx % 2 === 1 }">
                <td v-for="c in laborVisibleColumns" :key="c.key">
                  <input
                    v-model="row[c.key]"
                    :readonly="!isCellEditable('labor', c.key)"
                    :class="{ readonly: !isCellEditable('labor', c.key) }"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="side-panel">
          <h3>工序成本</h3>
          <div class="bar-list">
            <div class="bar-item"><label>清洗</label><span style="width:72.2%"></span><b>¥6.17</b></div>
            <div class="bar-item"><label>切割</label><span style="width:100%"></span><b>¥8.55</b></div>
            <div class="bar-item"><label>调配</label><span style="width:89.7%"></span><b>¥7.67</b></div>
            <div class="bar-item"><label>烘烤</label><span style="width:78%"></span><b>¥6.67</b></div>
            <div class="bar-item"><label>包装</label><span style="width:16.1%"></span><b>¥1.38</b></div>
          </div>
        </aside>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('expense')">
      <div class="section-head">
        <h2>费用成本</h2>
        <span class="tag-orange">{{ summaryView.expenseAmount }}</span>
      </div>
      <div class="split-layout">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th v-for="c in expenseVisibleColumns" :key="c.key">{{ c.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in expenseRows" :key="'e-' + idx" :class="{ alt: idx % 2 === 1 }">
                <td v-for="c in expenseVisibleColumns" :key="c.key">
                  <input
                    v-model="row[c.key]"
                    :readonly="!isCellEditable('expense', c.key)"
                    :class="{ readonly: !isCellEditable('expense', c.key) }"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="side-panel">
          <h3>费用构成</h3>
          <div class="mini-ring expense-ring"></div>
          <ul class="legend compact">
            <li><i class="c2"></i><span>销售 ¥5.00</span><b>24.8%</b></li>
            <li><i class="c1"></i><span>固定制造 ¥4.50</span><b>22.3%</b></li>
            <li><i class="c3"></i><span>管理 ¥3.80</span><b>18.8%</b></li>
            <li><i class="c4"></i><span>变动制造 ¥3.20</span><b>15.8%</b></li>
            <li><i class="c5"></i><span>财务 ¥2.20</span><b>10.9%</b></li>
            <li><i class="c6"></i><span>总部分摊 ¥1.50</span><b>7.4%</b></li>
          </ul>
        </aside>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'

const FORM_BASE_BUILD_TAG = '2026-08-28T01:05+08:00'
console.info('[cost-card-form-base] build-tag', FORM_BASE_BUILD_TAG)

const props = defineProps({
  sceneCode: { type: String, required: true },
  sceneTitle: { type: String, required: true },
  productEditable: { type: Boolean, default: false },
  productFieldVisibility: { type: Array, default: () => [] },
  sectionVisibility: { type: Object, required: true },
  sectionEditable: { type: Object, required: true },
  columnEditable: { type: Object, required: true },
  columnVisibility: { type: Object, default: () => ({}) },
  initialData: { type: Object, default: null },
  initialVersion: { type: Number, default: 0 }
})

const STYLE_ID = 'cost-card-form-inline-style'

const PRODUCT_FIELDS = [
  { key: 'product_code', label: '产品编码' },
  { key: 'version_no', label: '版本号' },
  { key: 'product_name', label: '产品名称' },
  { key: 'factory', label: '工厂' },
  { key: 'product_category', label: '产品类别' },
  { key: 'customer_name', label: '客户名称' }
]

const product = reactive({
  product_code: '',
  version_no: '',
  product_name: '',
  factory: '',
  product_category: '',
  customer_name: '',
  tax_rate: '',
  quoted_price_tax: '',
  sales_revenue: '',
  rebate_rate: '',
  account_period_days: '',
  freight_amount: '',
  material_total: '',
  labor_total: '',
  expense_total: '',
  total_cost: '',
  contribution_amount: '',
  contribution_rate: '',
  gross_profit_amount: '',
  gross_profit_rate: '',
  pretax_profit_amount: '',
  pretax_profit_rate: '',
  income_tax_amount: '',
  income_tax_rate: '',
  net_profit_amount: '',
  net_profit_rate: ''
})

const materialColumns = [
  { key: 'item_name', label: '物料名称' },
  { key: 'item_code', label: '物料编码' },
  { key: 'spec', label: '规格' },
  { key: 'unit', label: '单位' },
  { key: 'formula_qty', label: '配方' },
  { key: 'yield_rate', label: '出成率' },
  { key: 'actual_qty', label: '实际量' },
  { key: 'unit_price', label: '单价' },
  { key: 'amount', label: '金额' }
]

const laborColumns = [
  { key: 'process_name', label: '工序' },
  { key: 'work_minutes', label: '工时' },
  { key: 'worker_count', label: '人数' },
  { key: 'wage', label: '工资' },
  { key: 'social_security', label: '社保' },
  { key: 'housing_fund', label: '公积金' },
  { key: 'subtotal', label: '小计' }
]

const expenseColumns = [
  { key: 'expense_type', label: '费用类别' },
  { key: 'detail_name', label: '明细' },
  { key: 'amount', label: '金额' },
  { key: 'ratio', label: '占比' }
]

const materialRows = ref([])

const laborRows = ref([])

const expenseRows = ref([])

const visibleProductFields = computed(() => {
  const visible = props.productFieldVisibility || []
  if (!visible.length || visible.includes('*')) return PRODUCT_FIELDS
  return PRODUCT_FIELDS.filter((item) => visible.includes(item.key))
})

function resolveVisibleColumns(section, allColumns) {
  const visible = props.columnVisibility?.[section]
  if (!Array.isArray(visible) || !visible.length || visible.includes('*')) return allColumns
  return allColumns.filter((item) => visible.includes(item.key))
}

const materialVisibleColumns = computed(() => resolveVisibleColumns('material', materialColumns))
const laborVisibleColumns = computed(() => resolveVisibleColumns('labor', laborColumns))
const expenseVisibleColumns = computed(() => resolveVisibleColumns('expense', expenseColumns))

function toNumber(value) {
  if (value === undefined || value === null || value === '') return null
  const normalized = Number(String(value).replace('%', '').trim())
  return Number.isFinite(normalized) ? normalized : null
}

function formatMoney(value) {
  const n = toNumber(value)
  if (n === null) return ''
  return `¥${n.toFixed(2)}`
}

function formatPercent(value) {
  if (value === undefined || value === null || value === '') return ''
  const raw = String(value).trim()
  if (raw.includes('%')) return raw
  const n = Number(raw)
  if (!Number.isFinite(n)) return raw
  const normalized = n <= 1 ? n * 100 : n
  return `${normalized.toFixed(2)}%`
}

const summaryView = computed(() => {
  const material = toNumber(product.material_total)
  const labor = toNumber(product.labor_total)
  const expense = toNumber(product.expense_total)
  const total = toNumber(product.total_cost)
  const safeTotal = total && total > 0 ? total : null

  const materialRatio = safeTotal !== null && material !== null ? `${((material / safeTotal) * 100).toFixed(1)}%` : ''
  const laborRatio = safeTotal !== null && labor !== null ? `${((labor / safeTotal) * 100).toFixed(1)}%` : ''
  const expenseRatio = safeTotal !== null && expense !== null ? `${((expense / safeTotal) * 100).toFixed(1)}%` : ''

  return {
    materialAmount: formatMoney(product.material_total) || '¥0.00',
    laborAmount: formatMoney(product.labor_total) || '¥0.00',
    expenseAmount: formatMoney(product.expense_total) || '¥0.00',
    totalCost: formatMoney(product.total_cost) || '¥0.00',
    materialRatio,
    laborRatio,
    expenseRatio
  }
})

const quoteView = computed(() => ({
  taxRate: formatPercent(product.tax_rate),
  quotedPriceTax: toNumber(product.quoted_price_tax) === null ? '' : Number(product.quoted_price_tax).toFixed(2),
  salesRevenue: toNumber(product.sales_revenue) === null ? '' : Number(product.sales_revenue).toFixed(2),
  rebateRate: formatPercent(product.rebate_rate),
  accountPeriodDays: product.account_period_days ? `${product.account_period_days}天` : '',
  freightAmount: toNumber(product.freight_amount) === null ? '' : Number(product.freight_amount).toFixed(2)
}))

const profitView = computed(() => ({
  contributionAmount: formatMoney(product.contribution_amount) || '¥0.00',
  contributionRate: formatPercent(product.contribution_rate),
  grossProfitAmount: formatMoney(product.gross_profit_amount) || '¥0.00',
  grossProfitRate: formatPercent(product.gross_profit_rate),
  pretaxProfitAmount: formatMoney(product.pretax_profit_amount) || '¥0.00',
  pretaxProfitRate: formatPercent(product.pretax_profit_rate),
  incomeTaxAmount: formatMoney(product.income_tax_amount) || '¥0.00',
  incomeTaxRate: formatPercent(product.income_tax_rate),
  netProfitAmount: formatMoney(product.net_profit_amount) || '¥0.00',
  netProfitRate: formatPercent(product.net_profit_rate)
}))

const ratioChartView = computed(() => {
  const material = Math.max(0, toNumber(product.material_total) || 0)
  const labor = Math.max(0, toNumber(product.labor_total) || 0)
  const expense = Math.max(0, toNumber(product.expense_total) || 0)
  const total = Math.max(0, toNumber(product.total_cost) || material + labor + expense)
  if (total <= 0) {
    return {
      material: 0,
      labor: 0,
      expense: 0,
      materialRatio: '0.0%',
      laborRatio: '0.0%',
      expenseRatio: '0.0%'
    }
  }

  const materialPct = (material / total) * 100
  const laborPct = (labor / total) * 100
  const expensePct = Math.max(0, 100 - materialPct - laborPct)

  return {
    material: materialPct,
    labor: laborPct,
    expense: expensePct,
    materialRatio: `${materialPct.toFixed(1)}%`,
    laborRatio: `${laborPct.toFixed(1)}%`,
    expenseRatio: `${expensePct.toFixed(1)}%`
  }
})

const ratioRingStyle = computed(() => {
  const m = ratioChartView.value.material
  const l = ratioChartView.value.labor
  const e = ratioChartView.value.expense
  const mEnd = m
  const lEnd = m + l
  const eEnd = m + l + e

  return {
    background: `conic-gradient(#3b82f6 0% ${mEnd.toFixed(2)}%, #10b981 ${mEnd.toFixed(2)}% ${lEnd.toFixed(2)}%, #f59e0b ${lEnd.toFixed(2)}% ${eEnd.toFixed(2)}%)`
  }
})

function applyProductData(productData) {
  if (!productData || typeof productData !== 'object') return
  const keys = Object.keys(product)
  for (const key of keys) {
    if (key in productData && productData[key] !== undefined && productData[key] !== null) {
      product[key] = String(productData[key])
    }
  }
}

function applyRowsData(targetRowsRef, rowsData) {
  if (!Array.isArray(rowsData) || rowsData.length === 0) return
  targetRowsRef.value = rowsData.map((row) => ({ ...row }))
}

function resetFormData() {
  const keys = Object.keys(product)
  for (const key of keys) {
    product[key] = ''
  }
  materialRows.value = []
  laborRows.value = []
  expenseRows.value = []
}

function applyInitialData(payload) {
  if (!payload || typeof payload !== 'object') {
    console.info('[cost-card-form-base] applyInitialData:skip', { reason: 'payload-empty' })
    return
  }
  console.info('[cost-card-form-base] applyInitialData', {
    hasProduct: !!(payload.product || payload.model),
    materialCount: Array.isArray(payload.materialRows || payload.material || payload.material_items)
      ? (payload.materialRows || payload.material || payload.material_items).length
      : 0,
    laborCount: Array.isArray(payload.laborRows || payload.labor || payload.labor_items)
      ? (payload.laborRows || payload.labor || payload.labor_items).length
      : 0,
    expenseCount: Array.isArray(payload.expenseRows || payload.expense || payload.expense_items)
      ? (payload.expenseRows || payload.expense || payload.expense_items).length
      : 0
  })
  applyProductData(payload.product || payload.model || {})
  applyRowsData(materialRows, payload.materialRows || payload.material || payload.material_items)
  applyRowsData(laborRows, payload.laborRows || payload.labor || payload.labor_items)
  applyRowsData(expenseRows, payload.expenseRows || payload.expense || payload.expense_items)
  console.info('[cost-card-form-base] applyInitialData:applied', {
    product_code: product.product_code,
    product_name: product.product_name,
    customer_name: product.customer_name,
    materialCount: materialRows.value.length,
    laborCount: laborRows.value.length,
    expenseCount: expenseRows.value.length
  })
}

watchEffect(() => {
  const value = props.initialData
  console.info('[cost-card-form-base] watchEffect:initialData', {
    hasValue: !!value,
    valueType: typeof value
  })
  applyInitialData(value)
})

watch(
  () => props.initialVersion,
  (version) => {
    console.info('[cost-card-form-base] watch:initialVersion', { version })
    applyInitialData(props.initialData)
  },
  { immediate: true }
)

function isSectionVisible(section) {
  return !!props.sectionVisibility?.[section]
}

function isCellEditable(section, fieldKey) {
  if (!props.sectionEditable?.[section]) return false
  const editableColumns = props.columnEditable?.[section] || []
  return editableColumns.includes('*') || editableColumns.includes(fieldKey)
}

const STYLE_TEXT = `
.cost-card-page { min-height: 100vh; background: #f0f2f5; padding: 16px; color: #1f2937; }
.debug-tag { position: sticky; top: 0; z-index: 10; display: inline-block; padding: 2px 8px; border-radius: 4px; border: 1px solid #bfdbfe; background: #eff6ff; color: #1d4ed8; font-size: 11px; margin-bottom: 8px; }
.scene-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 12px; }
.scene-head h1 { margin: 0; font-size: 22px; }
.scene-head p { margin: 0; color: #6b7280; font-size: 12px; }
.block { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.block h2 { margin: 0 0 10px; font-size: 15px; }
.grid { display: grid; gap: 10px; }
.product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.top-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 12px; }
.summary-cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.summary-card { border: 1px solid #e5e7eb; border-top-width: 2px; border-radius: 8px; padding: 10px; background: #fff; }
.summary-card .title { font-size: 13px; color: #6b7280; }
.summary-card .amount { font-size: 28px; line-height: 1.1; text-align: right; font-weight: 700; }
.summary-card .ratio { font-size: 16px; text-align: right; color: #9ca3af; }
.sc-blue { border-top-color: #3b82f6; } .sc-blue .amount { color: #3b82f6; }
.sc-green { border-top-color: #10b981; } .sc-green .amount { color: #10b981; }
.sc-orange { border-top-color: #f59e0b; } .sc-orange .amount { color: #f59e0b; }
.sc-total { border-top-color: #1e3a5f; } .sc-total .amount { color: #1e3a5f; text-align: center; }
.quote-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }
.left-panels { display: grid; gap: 10px; }
.inner-panel { border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; background: #fff; }
.inner-panel h3 { margin: 0 0 8px; font-size: 13px; }
.quote-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.profit-cards { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
.profit-card { border: 1px solid #e5e7eb; border-top-width: 2px; border-radius: 8px; padding: 8px; }
.profit-card span { font-size: 12px; color: #6b7280; }
.profit-card b { display: block; text-align: right; font-size: 22px; line-height: 1.1; color: #1f2937; }
.profit-card em { display: block; text-align: right; font-style: normal; font-size: 14px; color: #6b7280; }
.pc-blue { border-top-color: #3b82f6; }
.pc-green { border-top-color: #10b981; }
.pc-orange { border-top-color: #f59e0b; }
.pc-dark { border-top-color: #475569; }
.pc-main { border-top-color: #1e3a5f; }
.ratio-wrap { display: flex; gap: 12px; align-items: center; }
.ratio-ring { width: 160px; height: 160px; border-radius: 50%; background: conic-gradient(#3b82f6 0% 45.6%, #f59e0b 45.6% 49.49%, #10b981 49.49% 61.79%, #475569 61.79% 64.99%, #1e3a5f 64.99% 76.79%); position: relative; }
.ratio-ring::after { content: '成本占比'; position: absolute; inset: 32px; border-radius: 50%; background: #fff; display: grid; place-items: center; color: #1e3a5f; font-weight: 700; font-size: 14px; }
.legend { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px; }
.legend li { display: grid; grid-template-columns: 10px 1fr auto; gap: 8px; align-items: center; font-size: 12px; }
.legend i { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
.legend span { color: #6b7280; } .legend b { color: #9ca3af; font-weight: 500; }
.c1 { background: #3b82f6; } .c2 { background: #f59e0b; } .c3 { background: #10b981; }
.c4 { background: #475569; } .c5 { background: #1e3a5f; } .c6 { background: #9ca3af; }
.section-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.tag-blue, .tag-green, .tag-orange { font-size: 12px; border-radius: 4px; padding: 2px 8px; }
.tag-blue { color: #3b82f6; background: rgba(59,130,246,.1); }
.tag-green { color: #10b981; background: rgba(16,185,129,.1); }
.tag-orange { color: #f59e0b; background: rgba(245,158,11,.1); }
.split-layout { display: grid; grid-template-columns: 2fr 1fr; border-top: 1px solid #e5e7eb; }
.side-panel { border-left: 1px solid #e5e7eb; padding: 10px; }
.side-panel h3 { margin: 0 0 8px; font-size: 13px; }
.mini-ring { width: 130px; height: 130px; margin: 0 auto 8px; border-radius: 50%; position: relative; }
.material-ring { background: conic-gradient(#f59e0b 0% 47.5%, #3b82f6 47.5% 74.6%, #10b981 74.6% 100%); }
.material-ring::after { content: '¥8.19'; position: absolute; inset: 24px; border-radius: 50%; background: #fff; display: grid; place-items: center; color: #1e3a5f; font-weight: 700; }
.expense-ring { background: conic-gradient(#f59e0b 0% 24.8%, #3b82f6 24.8% 47%, #10b981 47% 65.8%, #475569 65.8% 76.7%, #1e3a5f 76.7% 87.6%, #9ca3af 87.6% 100%); }
.expense-ring::after { content: '¥20.20'; position: absolute; inset: 24px; border-radius: 50%; background: #fff; display: grid; place-items: center; color: #1e3a5f; font-weight: 700; }
.bar-list { display: grid; gap: 8px; }
.bar-item { display: grid; grid-template-columns: 44px 1fr auto; gap: 8px; align-items: center; font-size: 12px; }
.bar-item label { color: #6b7280; }
.bar-item span { display: block; height: 8px; border-radius: 4px; background: #10b981; }
.bar-item b { color: #1f2937; }
.field { display: grid; gap: 4px; }
.field span { font-size: 12px; color: #9ca3af; }
input { width: 100%; box-sizing: border-box; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 8px; font-size: 13px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th { text-align: left; font-weight: 500; font-size: 12px; color: #6b7280; background: #f7f8fa; padding: 8px; white-space: nowrap; }
td { border-bottom: 1px solid #f0f0f0; padding: 6px; }
td input { border: 1px solid transparent; background: transparent; padding: 4px 6px; }
td input.readonly { color: #6b7280; }
tr.alt { background: #f7f8fa; }
.compact li { grid-template-columns: 8px 1fr auto; }
.compact i { width: 8px; height: 8px; }
@media (max-width: 1200px) {
  .top-layout, .quote-layout, .split-layout { grid-template-columns: 1fr; }
  .summary-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .profit-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .quote-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .side-panel { border-left: 0; border-top: 1px solid #e5e7eb; }
}
@media (max-width: 900px) {
  .product-grid, .quote-grid, .profit-cards, .summary-cards { grid-template-columns: 1fr; }
  .ratio-wrap { flex-direction: column; align-items: flex-start; }
}
`

onMounted(() => {
  if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
    const styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    styleEl.textContent = STYLE_TEXT
    document.head.appendChild(styleEl)
  }
})
</script>
