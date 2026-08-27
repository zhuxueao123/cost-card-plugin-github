<template>
  <section class="cost-card-page">
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
        <div class="table-wrap material-table-wrap">
          <table class="data-table material-table">
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
        <div class="table-wrap labor-table-wrap">
          <table class="data-table labor-table">
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
        <div class="table-wrap expense-table-wrap">
          <table class="data-table expense-table">
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
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useHostDataApi } from '@trusteem/asapflow-plugin-sdk'

const MAIN_ENTITY_CODE = 'cost_card'
const REQUEST_TIMEOUT_MS = 8000
const STYLE_ID = 'cost-card-form-inline-style'

const props = defineProps({
  sceneCode: { type: String, required: true },
  sceneTitle: { type: String, required: true },
  recordId: { type: String, default: '' },
  productEditable: { type: Boolean, default: false },
  productFieldVisibility: { type: Array, default: () => [] },
  sectionVisibility: { type: Object, required: true },
  sectionEditable: { type: Object, required: true },
  columnEditable: { type: Object, required: true },
  columnVisibility: { type: Object, default: () => ({}) },
  initialData: { type: Object, default: null },
  initialVersion: { type: Number, default: 0 }
})

const hostDataApi = useHostDataApi()

const PRODUCT_FIELDS = [
  { key: 'product_code', label: '产品编码' },
  { key: 'version_no', label: '版本号' },
  { key: 'product_name', label: '产品名称' },
  { key: 'factory', label: '工厂' },
  { key: 'product_category', label: '产品类别' },
  { key: 'customer_name', label: '客户名称' }
]

const product = reactive(createEmptyProduct())

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

const materialVisibleColumns = computed(() => resolveVisibleColumns('material', materialColumns))
const laborVisibleColumns = computed(() => resolveVisibleColumns('labor', laborColumns))
const expenseVisibleColumns = computed(() => resolveVisibleColumns('expense', expenseColumns))

const summaryView = computed(() => {
  const material = toNumber(product.material_total)
  const labor = toNumber(product.labor_total)
  const expense = toNumber(product.expense_total)
  const total = toNumber(product.total_cost)
  const safeTotal = total && total > 0 ? total : null

  return {
    materialAmount: formatMoney(product.material_total) || '¥0.00',
    laborAmount: formatMoney(product.labor_total) || '¥0.00',
    expenseAmount: formatMoney(product.expense_total) || '¥0.00',
    totalCost: formatMoney(product.total_cost) || '¥0.00',
    materialRatio: safeTotal !== null && material !== null ? `${((material / safeTotal) * 100).toFixed(1)}%` : '',
    laborRatio: safeTotal !== null && labor !== null ? `${((labor / safeTotal) * 100).toFixed(1)}%` : '',
    expenseRatio: safeTotal !== null && expense !== null ? `${((expense / safeTotal) * 100).toFixed(1)}%` : ''
  }
})

const quoteView = computed(() => ({
  taxRate: formatPercent(product.tax_rate),
  quotedPriceTax: formatDecimal(product.quoted_price_tax),
  salesRevenue: formatDecimal(product.sales_revenue),
  rebateRate: formatPercent(product.rebate_rate),
  accountPeriodDays: product.account_period_days ? `${product.account_period_days}天` : '',
  freightAmount: formatDecimal(product.freight_amount)
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
  const materialEnd = ratioChartView.value.material
  const laborEnd = materialEnd + ratioChartView.value.labor
  const expenseEnd = laborEnd + ratioChartView.value.expense
  return {
    background: `conic-gradient(#3b82f6 0% ${materialEnd.toFixed(2)}%, #10b981 ${materialEnd.toFixed(2)}% ${laborEnd.toFixed(2)}%, #f59e0b ${laborEnd.toFixed(2)}% ${expenseEnd.toFixed(2)}%)`
  }
})

function createEmptyProduct() {
  return {
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
  }
}

function syncInputValue(el, value) {
  if (!el) return
  const nextValue = value ?? ''
  if (el.value !== nextValue) {
    el.value = nextValue
  }
  if (el.getAttribute('value') !== nextValue) {
    el.setAttribute('value', nextValue)
  }
}

function syncTextValue(el, value) {
  if (!el) return
  const nextValue = value ?? ''
  if (el.textContent !== nextValue) {
    el.textContent = nextValue
  }
}

function syncTableValues(selector, rows, columns) {
  const root = typeof document === 'undefined'
    ? null
    : document.querySelector('.cost-card-page')
  if (!root) return
  const inputs = Array.from(root.querySelectorAll(`${selector} tbody input`))
  let cursor = 0
  rows.forEach((row) => {
    columns.forEach((column) => {
      const input = inputs[cursor]
      if (input) syncInputValue(input, row?.[column.key] ?? '')
      cursor += 1
    })
  })
}

function syncRenderedDom() {
  const root = typeof document === 'undefined'
    ? null
    : document.querySelector('.cost-card-page')
  if (!root) return

  const productInputs = Array.from(root.querySelectorAll('.product-grid input'))
  visibleProductFields.value.forEach((field, index) => {
    syncInputValue(productInputs[index], product[field.key] ?? '')
  })

  const quoteInputs = Array.from(root.querySelectorAll('.quote-grid input'))
  const quoteValues = [
    quoteView.value.taxRate,
    quoteView.value.quotedPriceTax,
    quoteView.value.salesRevenue,
    quoteView.value.rebateRate,
    quoteView.value.accountPeriodDays,
    quoteView.value.freightAmount
  ]
  quoteValues.forEach((value, index) => {
    syncInputValue(quoteInputs[index], value)
  })

  const summaryAmounts = Array.from(root.querySelectorAll('.summary-cards .summary-card .amount'))
  const summaryRatios = Array.from(root.querySelectorAll('.summary-cards .summary-card .ratio'))
  const summaryAmountValues = [
    summaryView.value.materialAmount,
    summaryView.value.laborAmount,
    summaryView.value.expenseAmount,
    summaryView.value.totalCost
  ]
  const summaryRatioValues = [
    summaryView.value.materialRatio,
    summaryView.value.laborRatio,
    summaryView.value.expenseRatio
  ]
  summaryAmountValues.forEach((value, index) => {
    syncTextValue(summaryAmounts[index], value)
  })
  summaryRatioValues.forEach((value, index) => {
    syncTextValue(summaryRatios[index], value)
  })

  const profitAmounts = Array.from(root.querySelectorAll('.profit-card b'))
  const profitRatios = Array.from(root.querySelectorAll('.profit-card em'))
  const profitAmountValues = [
    profitView.value.contributionAmount,
    profitView.value.grossProfitAmount,
    profitView.value.pretaxProfitAmount,
    profitView.value.incomeTaxAmount,
    profitView.value.netProfitAmount
  ]
  const profitRatioValues = [
    profitView.value.contributionRate,
    profitView.value.grossProfitRate,
    profitView.value.pretaxProfitRate,
    profitView.value.incomeTaxRate,
    profitView.value.netProfitRate
  ]
  profitAmountValues.forEach((value, index) => {
    syncTextValue(profitAmounts[index], value)
  })
  profitRatioValues.forEach((value, index) => {
    syncTextValue(profitRatios[index], value)
  })

  const legendSpans = Array.from(root.querySelectorAll('.ratio-panel .legend span'))
  const legendBolds = Array.from(root.querySelectorAll('.ratio-panel .legend b'))
  const legendSpanValues = [
    `材料 ${summaryView.value.materialAmount}`,
    `人工 ${summaryView.value.laborAmount}`,
    `费用 ${summaryView.value.expenseAmount}`
  ]
  const legendBoldValues = [
    ratioChartView.value.materialRatio,
    ratioChartView.value.laborRatio,
    ratioChartView.value.expenseRatio
  ]
  legendSpanValues.forEach((value, index) => {
    syncTextValue(legendSpans[index], value)
  })
  legendBoldValues.forEach((value, index) => {
    syncTextValue(legendBolds[index], value)
  })

  syncTableValues('.material-table', materialRows.value, materialVisibleColumns.value)
  syncTableValues('.labor-table', laborRows.value, laborVisibleColumns.value)
  syncTableValues('.expense-table', expenseRows.value, expenseVisibleColumns.value)
}

function resolveVisibleColumns(section, allColumns) {
  const visible = props.columnVisibility?.[section]
  if (!Array.isArray(visible) || !visible.length || visible.includes('*')) return allColumns
  return allColumns.filter((item) => visible.includes(item.key))
}

function toNumber(value) {
  if (value === undefined || value === null || value === '') return null
  const normalized = Number(String(value).replace('%', '').trim())
  return Number.isFinite(normalized) ? normalized : null
}

function formatMoney(value) {
  const normalized = toNumber(value)
  if (normalized === null) return ''
  return `¥${normalized.toFixed(2)}`
}

function formatPercent(value) {
  if (value === undefined || value === null || value === '') return ''
  const raw = String(value).trim()
  if (raw.includes('%')) return raw
  const normalized = Number(raw)
  if (!Number.isFinite(normalized)) return raw
  return `${(normalized <= 1 ? normalized * 100 : normalized).toFixed(2)}%`
}

function formatDecimal(value) {
  const normalized = toNumber(value)
  return normalized === null ? '' : normalized.toFixed(2)
}

function setProductField(key, value) {
  product[key] = value === undefined || value === null ? '' : String(value)
}

function applyProductData(productData) {
  if (!productData || typeof productData !== 'object') return
  for (const key of Object.keys(product)) {
    if (key in productData && productData[key] !== undefined && productData[key] !== null) {
      setProductField(key, productData[key])
    }
  }
}

function applyRowsData(targetRowsRef, rowsData) {
  targetRowsRef.value = Array.isArray(rowsData) ? rowsData.map((row) => ({ ...row })) : []
}

function sumBy(rows, keys) {
  return rows.reduce((total, row) => {
    for (const key of keys) {
      const value = toNumber(row?.[key])
      if (value !== null) return total + value
    }
    return total
  }, 0)
}

function ensureDerivedTotals() {
  const materialTotal = toNumber(product.material_total)
  const laborTotal = toNumber(product.labor_total)
  const expenseTotal = toNumber(product.expense_total)
  const totalCost = toNumber(product.total_cost)

  const derivedMaterial = sumBy(materialRows.value, ['amount', 'line_amount', 'subtotal'])
  const derivedLabor = sumBy(laborRows.value, ['subtotal', 'amount', 'line_amount'])
  const derivedExpense = sumBy(expenseRows.value, ['amount', 'line_amount', 'subtotal'])

  if (materialTotal === null && derivedMaterial > 0) setProductField('material_total', derivedMaterial.toFixed(2))
  if (laborTotal === null && derivedLabor > 0) setProductField('labor_total', derivedLabor.toFixed(2))
  if (expenseTotal === null && derivedExpense > 0) setProductField('expense_total', derivedExpense.toFixed(2))

  const nextMaterial = toNumber(product.material_total) || 0
  const nextLabor = toNumber(product.labor_total) || 0
  const nextExpense = toNumber(product.expense_total) || 0
  if (totalCost === null && (nextMaterial > 0 || nextLabor > 0 || nextExpense > 0)) {
    setProductField('total_cost', (nextMaterial + nextLabor + nextExpense).toFixed(2))
  }
}

function resetFormData() {
  Object.keys(product).forEach((key) => {
    product[key] = ''
  })
  materialRows.value = []
  laborRows.value = []
  expenseRows.value = []
}

function normalizeIncomingPayload(payload) {
  if (!payload || typeof payload !== 'object') return null
  const productData = payload.product || payload.model || {}
  return {
    product: productData,
    materialRows: payload.materialRows || payload.material || payload.material_items || [],
    laborRows: payload.laborRows || payload.labor || payload.labor_items || [],
    expenseRows: payload.expenseRows || payload.expense || payload.expense_items || []
  }
}

function applyInitialData(payload, source = 'unknown') {
  const normalized = normalizeIncomingPayload(payload)
  if (!normalized) {
    resetFormData()
    return
  }

  resetFormData()
  applyProductData(normalized.product)
  applyRowsData(materialRows, normalized.materialRows)
  applyRowsData(laborRows, normalized.laborRows)
  applyRowsData(expenseRows, normalized.expenseRows)
  ensureDerivedTotals()

  nextTick(syncRenderedDom)
}

function withTimeout(promise, label, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timeout after ${timeoutMs}ms`)), timeoutMs)
    Promise.resolve(promise)
      .then((value) => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch((error) => {
        clearTimeout(timer)
        reject(error)
      })
  })
}

function pickFirstValue(source, candidateKeys) {
  if (!source || typeof source !== 'object') return null
  for (const key of candidateKeys) {
    if (key in source && source[key] !== undefined && source[key] !== null && source[key] !== '') {
      return source[key]
    }
  }
  return null
}

function mergeWithoutOverwritingPrimary(primary, secondary) {
  if (!secondary || typeof secondary !== 'object') return { ...primary }
  const merged = { ...primary }
  for (const [key, value] of Object.entries(secondary)) {
    if (!(key in merged) || merged[key] === undefined || merged[key] === null || merged[key] === '') {
      merged[key] = value
    }
  }
  return merged
}

function normalizeJsonPayload(payload) {
  if (!payload || typeof payload !== 'object') return null
  if (payload.data && typeof payload.data === 'object') return payload.data
  if (payload.payload && typeof payload.payload === 'object') return payload.payload
  return payload
}

function extractRowsFromPayload(payload) {
  const normalized = normalizeJsonPayload(payload)
  const rows = normalized?.records || normalized?.items || normalized?.rows || normalized?.data
  return Array.isArray(rows) ? rows : []
}

function unwrapRecordData(record) {
  if (!record || typeof record !== 'object') return {}
  let baseRecord = { ...record }
  for (const key of ['model', 'record', 'data', 'payload']) {
    const nested = baseRecord[key]
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      baseRecord = { ...baseRecord, ...nested }
    }
  }

  const dataJson = pickFirstValue(baseRecord, ['data_json', 'dataJson', 'json_data'])
  if (typeof dataJson === 'string') {
    try {
      const parsed = JSON.parse(dataJson)
      if (parsed && typeof parsed === 'object') {
        return mergeWithoutOverwritingPrimary(baseRecord, parsed)
      }
    }
    catch (_error) {
      return baseRecord
    }
  }

  if (dataJson && typeof dataJson === 'object') {
    return mergeWithoutOverwritingPrimary(baseRecord, dataJson)
  }

  return baseRecord
}

function normalizeRecord(record) {
  const source = unwrapRecordData(record)
  const pick = (keys) => pickFirstValue(source, keys)
  return {
    product_code: pick(['product_code', 'productCode', 'code_product', 'code']) || '',
    version_no: pick(['version_no', 'versionNo', 'version']) || '',
    product_name: pick(['product_name', 'productName', 'name']) || '',
    factory: pick(['factory', 'factory_name', 'plant']) || '',
    product_category: pick(['product_category', 'productCategory', 'category']) || '',
    customer_name: pick(['customer_name', 'customerName', 'customer']) || '',
    tax_rate: pick(['tax_rate', 'taxRate']) || '',
    quoted_price_tax: pick(['quoted_price_tax', 'quotedPriceTax']) || '',
    sales_revenue: pick(['sales_revenue', 'salesRevenue']) || '',
    rebate_rate: pick(['rebate_rate', 'rebateRate']) || '',
    account_period_days: pick(['account_period_days', 'accountPeriodDays']) || '',
    freight_amount: pick(['freight_amount', 'freightAmount']) || '',
    material_total: pick(['material_total', 'materialTotal']) || '',
    labor_total: pick(['labor_total', 'laborTotal']) || '',
    expense_total: pick(['expense_total', 'expenseTotal']) || '',
    total_cost: pick(['total_cost', 'totalCost']) || '',
    contribution_amount: pick(['contribution_amount', 'contributionAmount']) || '',
    contribution_rate: pick(['contribution_rate', 'contributionRate']) || '',
    gross_profit_amount: pick(['gross_profit_amount', 'grossProfitAmount']) || '',
    gross_profit_rate: pick(['gross_profit_rate', 'grossProfitRate']) || '',
    pretax_profit_amount: pick(['pretax_profit_amount', 'pretaxProfitAmount']) || '',
    pretax_profit_rate: pick(['pretax_profit_rate', 'pretaxProfitRate']) || '',
    income_tax_amount: pick(['income_tax_amount', 'incomeTaxAmount']) || '',
    income_tax_rate: pick(['income_tax_rate', 'incomeTaxRate']) || '',
    net_profit_amount: pick(['net_profit_amount', 'netProfitAmount']) || '',
    net_profit_rate: pick(['net_profit_rate', 'netProfitRate']) || ''
  }
}

function normalizeDetailRow(row, section) {
  const source = unwrapRecordData(row)
  const pick = (keys) => pickFirstValue(source, keys)
  if (section === 'material') {
    return {
      item_name: pick(['item_name', 'itemName', 'material_name', 'name']) || '',
      item_code: pick(['item_code', 'itemCode', 'material_code', 'code']) || '',
      spec: pick(['spec', 'specification']) || '',
      unit: pick(['unit', 'unit_name']) || '',
      formula_qty: pick(['formula_qty', 'formulaQty', 'qty_formula']) || '',
      yield_rate: pick(['yield_rate', 'yieldRate']) || '',
      actual_qty: pick(['actual_qty', 'actualQty']) || '',
      unit_price: pick(['unit_price', 'unitPrice', 'price']) || '',
      amount: pick(['amount', 'line_amount', 'subtotal']) || ''
    }
  }
  if (section === 'labor') {
    return {
      process_name: pick(['process_name', 'processName', 'process']) || '',
      work_minutes: pick(['work_minutes', 'workMinutes', 'minutes']) || '',
      worker_count: pick(['worker_count', 'workerCount', 'workers']) || '',
      wage: pick(['wage', 'salary']) || '',
      social_security: pick(['social_security', 'socialSecurity']) || '',
      housing_fund: pick(['housing_fund', 'housingFund']) || '',
      subtotal: pick(['subtotal', 'amount', 'line_amount']) || ''
    }
  }
  return {
    expense_type: pick(['expense_type', 'expenseType', 'type']) || '',
    detail_name: pick(['detail_name', 'detailName', 'name']) || '',
    amount: pick(['amount', 'line_amount', 'subtotal']) || '',
    ratio: pick(['ratio', 'rate']) || ''
  }
}

async function loadMainRecord(recordId) {
  let payload = null
  try {
    payload = await withTimeout(hostDataApi.getRecord(MAIN_ENTITY_CODE, recordId), `getRecord(${MAIN_ENTITY_CODE}, ${recordId})`)
  }
  catch (_error) {
    // Fallback to queryRecords when direct getRecord is unavailable.
  }

  const normalized = normalizeJsonPayload(payload)
  if (normalized && typeof normalized === 'object') {
    return normalized.record || normalized.model || normalized
  }

  const queryBodies = [
    { filters: { id: recordId }, pageIndex: 0, pageSize: 1 },
    { filters: [{ field: 'id', operator: 'eq', value: recordId }], pageIndex: 0, pageSize: 1 },
    { filters: { card_no: recordId }, pageIndex: 0, pageSize: 1 },
    { filters: [{ field: 'card_no', operator: 'eq', value: recordId }], pageIndex: 0, pageSize: 1 }
  ]

  for (const body of queryBodies) {
    try {
      const queryPayload = await withTimeout(hostDataApi.queryRecords(MAIN_ENTITY_CODE, body), `queryRecords(${MAIN_ENTITY_CODE})`)
      const rows = extractRowsFromPayload(queryPayload)
      if (rows.length) return rows[0]
    }
    catch (_error) {
      continue
    }
  }

  return null
}

async function loadDetailRowsByCardNo(cardNo, entityCode) {
  if (!cardNo) return []
  const queryBodies = [
    { filters: { card_no: cardNo }, pageIndex: 0, pageSize: 500 },
    { filters: [{ field: 'card_no', operator: 'eq', value: cardNo }], pageIndex: 0, pageSize: 500 }
  ]

  for (const body of queryBodies) {
    try {
      const payload = await withTimeout(hostDataApi.queryRecords(entityCode, body), `queryRecords(${entityCode})`)
      return extractRowsFromPayload(payload)
    }
    catch (_error) {
      continue
    }
  }

  return []
}

async function loadPayloadByRecordId(recordId) {
  const mainRecord = await loadMainRecord(recordId)
  if (!mainRecord) return { product: {}, materialRows: [], laborRows: [], expenseRows: [] }

  const normalizedMain = unwrapRecordData(mainRecord)
  const cardNo = normalizedMain.card_no || normalizedMain.cardNo || ''
  const [material, labor, expense] = await Promise.all([
    loadDetailRowsByCardNo(cardNo, 'cost_card_material'),
    loadDetailRowsByCardNo(cardNo, 'cost_card_labor'),
    loadDetailRowsByCardNo(cardNo, 'cost_card_expense')
  ])

  return {
    product: normalizeRecord(normalizedMain),
    materialRows: material.map((row) => normalizeDetailRow(row, 'material')),
    laborRows: labor.map((row) => normalizeDetailRow(row, 'labor')),
    expenseRows: expense.map((row) => normalizeDetailRow(row, 'expense'))
  }
}

async function applySelfLoadedData(recordId) {
  if (!recordId) return
  const payload = await loadPayloadByRecordId(recordId)
  applyInitialData(payload, 'recordId')
}

watch(
  () => props.initialData,
  (value) => {
    if (value && typeof value === 'object' && Object.keys(value).length > 0) {
      applyInitialData(value, 'initialData')
    }
  },
  { deep: false, immediate: true }
)

watch(
  () => props.initialVersion,
  () => {
    if (props.initialData && typeof props.initialData === 'object') {
      applyInitialData(props.initialData, 'initialVersion')
    }
  }
)

watch(
  () => props.recordId,
  async (recordId) => {
    if (!recordId) {
      if (!props.initialData) resetFormData()
      return
    }
    if (props.initialData && typeof props.initialData === 'object' && Object.keys(props.initialData).length > 0) {
      applyInitialData(props.initialData, 'recordId-with-initialData')
      return
    }
    await applySelfLoadedData(recordId)
  },
  { immediate: true }
)

watch(
  [
    () => product.product_code,
    () => product.product_name,
    () => product.material_total,
    () => materialRows.value.length,
    () => laborRows.value.length,
    () => expenseRows.value.length
  ],
  () => {
    nextTick(syncRenderedDom)
  }
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
.ratio-ring { width: 160px; height: 160px; border-radius: 50%; position: relative; }
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
input { width: 100%; box-sizing: border-box; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 8px; font-size: 13px; background: #fff; }
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
  nextTick(syncRenderedDom)
})
</script>
