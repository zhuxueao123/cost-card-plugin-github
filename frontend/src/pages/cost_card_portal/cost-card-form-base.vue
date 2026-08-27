<template>
  <section class="cost-card-page">
    <div class="debug-tag">form-base {{ FORM_BASE_BUILD_TAG }}</div>
    <header class="scene-head">
      <h1>{{ sceneTitle }}</h1>
      <p>{{ sceneCode }}</p>
    </header>

    <section class="block">
      <h2>产品信息</h2>
      <div class="product-grid">
        <label v-for="field in visibleProductFields" :key="field.key" class="field">
          <span>{{ field.label }}</span>
          <input
            :value="product[field.key]"
            :readonly="!productEditable"
            @input="updateProductField(field.key, $event.target.value)"
          />
        </label>
      </div>
      <div class="summary-grid">
        <article class="summary-card">
          <div class="title">材料成本</div>
          <div class="amount">{{ summaryView.materialAmount }}</div>
        </article>
        <article class="summary-card">
          <div class="title">人工成本</div>
          <div class="amount">{{ summaryView.laborAmount }}</div>
        </article>
        <article class="summary-card">
          <div class="title">费用成本</div>
          <div class="amount">{{ summaryView.expenseAmount }}</div>
        </article>
        <article class="summary-card">
          <div class="title">总成本</div>
          <div class="amount">{{ summaryView.totalCost }}</div>
        </article>
      </div>
    </section>

    <section class="block">
      <h2>产品报价与汇总</h2>
      <div class="quote-grid">
        <label class="field"><span>税率</span><input :value="quoteView.taxRate" readonly /></label>
        <label class="field"><span>销售含税报价</span><input :value="quoteView.quotedPriceTax" readonly /></label>
        <label class="field"><span>销售收入</span><input :value="quoteView.salesRevenue" readonly /></label>
        <label class="field"><span>票前扣点与返利</span><input :value="quoteView.rebateRate" readonly /></label>
        <label class="field"><span>账期</span><input :value="quoteView.accountPeriodDays" readonly /></label>
        <label class="field"><span>运费</span><input :value="quoteView.freightAmount" readonly /></label>
      </div>
      <div class="summary-grid">
        <article class="summary-card">
          <div class="title">边际贡献</div>
          <div class="amount">{{ profitView.contributionAmount }}</div>
        </article>
        <article class="summary-card">
          <div class="title">毛利额</div>
          <div class="amount">{{ profitView.grossProfitAmount }}</div>
        </article>
        <article class="summary-card">
          <div class="title">税前利润</div>
          <div class="amount">{{ profitView.pretaxProfitAmount }}</div>
        </article>
        <article class="summary-card">
          <div class="title">所得税</div>
          <div class="amount">{{ profitView.incomeTaxAmount }}</div>
        </article>
        <article class="summary-card">
          <div class="title">净利润</div>
          <div class="amount">{{ profitView.netProfitAmount }}</div>
        </article>
      </div>
    </section>

    <section v-if="isSectionVisible('material')" class="block">
      <div class="section-head">
        <h2>材料成本</h2>
        <span>{{ materialRows.length }} 行</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="column in materialVisibleColumns" :key="column.key">{{ column.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in materialRows" :key="`m-${rowIndex}`">
              <td v-for="column in materialVisibleColumns" :key="column.key">
                <input
                  :value="row[column.key]"
                  :readonly="!isCellEditable('material', column.key)"
                  @input="updateRowField('material', rowIndex, column.key, $event.target.value)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-if="isSectionVisible('labor')" class="block">
      <div class="section-head">
        <h2>人工成本</h2>
        <span>{{ laborRows.length }} 行</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="column in laborVisibleColumns" :key="column.key">{{ column.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in laborRows" :key="`l-${rowIndex}`">
              <td v-for="column in laborVisibleColumns" :key="column.key">
                <input
                  :value="row[column.key]"
                  :readonly="!isCellEditable('labor', column.key)"
                  @input="updateRowField('labor', rowIndex, column.key, $event.target.value)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-if="isSectionVisible('expense')" class="block">
      <div class="section-head">
        <h2>费用成本</h2>
        <span>{{ expenseRows.length }} 行</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="column in expenseVisibleColumns" :key="column.key">{{ column.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in expenseRows" :key="`e-${rowIndex}`">
              <td v-for="column in expenseVisibleColumns" :key="column.key">
                <input
                  :value="row[column.key]"
                  :readonly="!isCellEditable('expense', column.key)"
                  @input="updateRowField('expense', rowIndex, column.key, $event.target.value)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useHostDataApi } from '@trusteem/asapflow-plugin-sdk'

const FORM_BASE_BUILD_TAG = '2026-08-28T02:45+08:00'
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
  columnVisibility: { type: Object, default: () => ({}) }
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

const product = ref(createEmptyProduct())
const materialRows = ref([])
const laborRows = ref([])
const expenseRows = ref([])

const visibleProductFields = computed(() => {
  const visible = props.productFieldVisibility || []
  if (!visible.length || visible.includes('*')) return PRODUCT_FIELDS
  return PRODUCT_FIELDS.filter((field) => visible.includes(field.key))
})

function resolveVisibleColumns(section, allColumns) {
  const visible = props.columnVisibility?.[section]
  if (!Array.isArray(visible) || !visible.length || visible.includes('*')) return allColumns
  return allColumns.filter((field) => visible.includes(field.key))
}

const materialVisibleColumns = computed(() => resolveVisibleColumns('material', materialColumns))
const laborVisibleColumns = computed(() => resolveVisibleColumns('labor', laborColumns))
const expenseVisibleColumns = computed(() => resolveVisibleColumns('expense', expenseColumns))

function debugLog(stage, payload) {
  console.info(`[cost-card-form-base] ${stage}`, payload)
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

const summaryView = computed(() => ({
  materialAmount: formatMoney(product.value.material_total) || '¥0.00',
  laborAmount: formatMoney(product.value.labor_total) || '¥0.00',
  expenseAmount: formatMoney(product.value.expense_total) || '¥0.00',
  totalCost: formatMoney(product.value.total_cost) || '¥0.00'
}))

const quoteView = computed(() => ({
  taxRate: formatPercent(product.value.tax_rate),
  quotedPriceTax: toNumber(product.value.quoted_price_tax) === null ? '' : Number(product.value.quoted_price_tax).toFixed(2),
  salesRevenue: toNumber(product.value.sales_revenue) === null ? '' : Number(product.value.sales_revenue).toFixed(2),
  rebateRate: formatPercent(product.value.rebate_rate),
  accountPeriodDays: product.value.account_period_days ? `${product.value.account_period_days}天` : '',
  freightAmount: toNumber(product.value.freight_amount) === null ? '' : Number(product.value.freight_amount).toFixed(2)
}))

const profitView = computed(() => ({
  contributionAmount: formatMoney(product.value.contribution_amount) || '¥0.00',
  grossProfitAmount: formatMoney(product.value.gross_profit_amount) || '¥0.00',
  pretaxProfitAmount: formatMoney(product.value.pretax_profit_amount) || '¥0.00',
  incomeTaxAmount: formatMoney(product.value.income_tax_amount) || '¥0.00',
  netProfitAmount: formatMoney(product.value.net_profit_amount) || '¥0.00'
}))

function updateProductField(fieldKey, value) {
  product.value = {
    ...product.value,
    [fieldKey]: value
  }
}

function updateRowField(section, rowIndex, fieldKey, value) {
  const rowsRef = section === 'material' ? materialRows : section === 'labor' ? laborRows : expenseRows
  rowsRef.value = rowsRef.value.map((row, index) => (
    index === rowIndex ? { ...row, [fieldKey]: value } : row
  ))
}

function resetFormData() {
  product.value = createEmptyProduct()
  materialRows.value = []
  laborRows.value = []
  expenseRows.value = []
}

function applyInitialData(payload) {
  if (!payload || typeof payload !== 'object') {
    resetFormData()
    return
  }

  product.value = {
    ...createEmptyProduct(),
    ...(payload.product || payload.model || {})
  }
  materialRows.value = Array.isArray(payload.materialRows) ? payload.materialRows.map((row) => ({ ...row })) : []
  laborRows.value = Array.isArray(payload.laborRows) ? payload.laborRows.map((row) => ({ ...row })) : []
  expenseRows.value = Array.isArray(payload.expenseRows) ? payload.expenseRows.map((row) => ({ ...row })) : []

  debugLog('applyInitialData:applied', {
    product_code: product.value.product_code,
    product_name: product.value.product_name,
    customer_name: product.value.customer_name,
    materialCount: materialRows.value.length,
    laborCount: laborRows.value.length,
    expenseCount: expenseRows.value.length
  })

  nextTick(() => {
    const productInputs = Array.from(document.querySelectorAll('.product-grid input')).slice(0, 3).map((input) => ({
      value: input.value,
      attr: input.getAttribute('value')
    }))
    debugLog('applyInitialData:dom-check', {
      product_code: product.value.product_code,
      product_name: product.value.product_name,
      productInputs,
      summaryText: Array.from(document.querySelectorAll('.summary-card .amount')).slice(0, 4).map((node) => node.textContent)
    })
  })
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

function pickFirstObject(source, candidateKeys) {
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

  const dataJson = pickFirstObject(baseRecord, ['data_json', 'dataJson', 'json_data'])
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
  const pick = (keys) => pickFirstObject(source, keys)
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
    gross_profit_amount: pick(['gross_profit_amount', 'grossProfitAmount']) || '',
    pretax_profit_amount: pick(['pretax_profit_amount', 'pretaxProfitAmount']) || '',
    income_tax_amount: pick(['income_tax_amount', 'incomeTaxAmount']) || '',
    net_profit_amount: pick(['net_profit_amount', 'netProfitAmount']) || ''
  }
}

function normalizeDetailRow(row, section) {
  const source = unwrapRecordData(row)
  const pick = (keys) => pickFirstObject(source, keys)
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
    debugLog('self-load:getRecord:success', { recordId })
  }
  catch (_error) {
    debugLog('self-load:getRecord:failed', { recordId })
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

watch(
  () => props.recordId,
  async (recordId) => {
    debugLog('watch:recordId', { recordId })
    if (!recordId) {
      resetFormData()
      return
    }
    const payload = await loadPayloadByRecordId(recordId)
    debugLog('self-load:payload-ready', {
      recordId,
      productCode: payload.product?.product_code || '',
      productName: payload.product?.product_name || '',
      materialCount: payload.materialRows.length,
      laborCount: payload.laborRows.length,
      expenseCount: payload.expenseRows.length
    })
    applyInitialData(payload)
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
.product-grid, .quote-grid, .summary-grid { display: grid; gap: 10px; }
.product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-bottom: 12px; }
.quote-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-bottom: 12px; }
.summary-grid { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
.summary-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; }
.summary-card .title { font-size: 13px; color: #6b7280; }
.summary-card .amount { font-size: 28px; line-height: 1.1; font-weight: 700; }
.field { display: grid; gap: 4px; }
.field span { font-size: 12px; color: #6b7280; }
input { width: 100%; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px; font-size: 13px; background: #fff; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th { text-align: left; font-size: 12px; color: #6b7280; background: #f8fafc; padding: 8px; }
td { border-top: 1px solid #eef2f7; padding: 6px; }
.section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
@media (max-width: 900px) {
  .product-grid, .quote-grid { grid-template-columns: 1fr; }
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
