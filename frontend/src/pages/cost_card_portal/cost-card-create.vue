<template>
  <section v-if="shouldWaitForData" class="cost-card-loading">
    正在加载成本卡数据...
  </section>
  <section class="cost-card-debug" v-if="currentRecordId">
    <span>debug</span>
    <span>wait={{ shouldWaitForData ? 'Y' : 'N' }}</span>
    <span>ver={{ formRenderVersion }}</span>
    <span>code={{ loadedData?.product?.product_code || '-' }}</span>
    <span>name={{ loadedData?.product?.product_name || '-' }}</span>
  </section>
  <CostCardFormBase
    v-else
    :key="formRenderKey"
    :initial-version="formRenderVersion"
    scene-code="cc_create"
    :scene-title="runtimeSceneTitle"
    :product-editable="configState.productEditable"
    :product-field-visibility="configState.productFieldVisibility"
    :section-visibility="configState.sectionVisibility"
    :section-editable="configState.sectionEditable"
    :column-editable="configState.columnEditable"
    :column-visibility="configState.columnVisibility"
    :initial-data="loadedData"
  />
</template>

<script setup>
import { computed, onActivated, ref, watch } from 'vue'
import { useHostDataApi, usePluginContext } from '@trusteem/asapflow-plugin-sdk'
import CostCardFormBase from './cost-card-form-base.vue'
import { COST_CARD_DEFAULT_SCENES, useCostCardSceneConfig } from './use-cost-card-scene-config'

const { configState, sceneTitle } = useCostCardSceneConfig('cc_create', COST_CARD_DEFAULT_SCENES.cc_create)
const pluginContext = usePluginContext()
const hostDataApi = useHostDataApi()
const MAIN_ENTITY_CODE = 'cost_card'
const DEBUG_PREFIX = '[cost-card-create]'

function debugLog(stage, payload) {
  console.info(`${DEBUG_PREFIX} ${stage}`, payload)
}

const loadedData = ref(null)
const formRenderVersion = ref(0)
const formRenderKey = computed(() => `${currentRecordId.value || 'new'}:${formRenderVersion.value}`)
const shouldWaitForData = computed(() => !!currentRecordId.value && !loadedData.value)
const currentRecordId = computed(() => {
  const routeQuery = pluginContext.query.value || {}
  const candidates = [
    pluginContext.recordId.value,
    routeQuery.id,
    routeQuery.recordId,
    routeQuery.rowId,
    routeQuery.pk,
    routeQuery.key,
    routeQuery.card_no,
    routeQuery.cardNo
  ]
  debugLog('resolve-record-id:candidates', {
    routeQuery,
    pluginRecordId: pluginContext.recordId.value,
    candidates
  })
  for (const value of candidates) {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      debugLog('resolve-record-id:matched', { value: String(value).trim() })
      return String(value).trim()
    }
  }
  debugLog('resolve-record-id:empty', null)
  return ''
})

const runtimeSceneTitle = computed(() => {
  if (currentRecordId.value) return '成本卡编辑'
  return sceneTitle.value || '成本卡创建'
})

function pickFirstObject(source, candidateKeys) {
  if (!source || typeof source !== 'object') return null
  for (const key of candidateKeys) {
    if (key in source && source[key] !== undefined && source[key] !== null && source[key] !== '') {
      return source[key]
    }
  }
  return null
}

function hasValue(value) {
  return value !== undefined && value !== null && value !== ''
}

function mergeWithoutOverwritingPrimary(primary, secondary) {
  if (!secondary || typeof secondary !== 'object') return { ...primary }
  const merged = { ...primary }
  for (const [key, value] of Object.entries(secondary)) {
    if (!Object.prototype.hasOwnProperty.call(merged, key) || !hasValue(merged[key])) {
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

function normalizeRecord(record) {
  if (!record || typeof record !== 'object') return {}

  const anyRecord = unwrapRecordData(record)
  const pick = (keys) => pickFirstObject(anyRecord, keys)

  return {
    product_code: pick(['product_code', 'productCode', 'code_product', 'code']) || '',
    version_no: pick(['version_no', 'versionNo', 'version']) || '',
    product_name: pick(['product_name', 'productName', 'name']) || '',
    factory: pick(['factory', 'factory_name', 'plant']) || '',
    product_category: pick(['product_category', 'productCategory', 'category']) || '',
    customer_name: pick(['customer_name', 'customerName', 'customer']) || '',
    status: pick(['status']) || '',
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

function unwrapRecordData(record) {
  if (!record || typeof record !== 'object') return {}
  let baseRecord = { ...record }

  // Host APIs may wrap business fields under model/record/data/payload.
  // Merge these known wrappers so field mapping can read a flat object.
  for (const key of ['model', 'record', 'data', 'payload']) {
    const nested = baseRecord[key]
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      baseRecord = { ...baseRecord, ...nested }
    }
  }

  const dataJson =
    pickFirstObject(baseRecord, ['data_json', 'dataJson', 'json_data']) ||
    null

  if (typeof dataJson === 'string') {
    try {
      const parsed = JSON.parse(dataJson)
      if (parsed && typeof parsed === 'object') {
        return mergeWithoutOverwritingPrimary(baseRecord, parsed)
      }
    }
    catch (_error) {
      // keep original record when data_json is not valid JSON
    }
  }

  if (dataJson && typeof dataJson === 'object') {
    return mergeWithoutOverwritingPrimary(baseRecord, dataJson)
  }

  return baseRecord
}

async function loadMainRecordByHostApi(recordId) {
  if (!recordId) return null

  let payload = null
  try {
    payload = await hostDataApi.getRecord(MAIN_ENTITY_CODE, recordId)
    debugLog('main:getRecord:success', {
      recordId,
      payloadKeys: payload && typeof payload === 'object' ? Object.keys(payload) : typeof payload
    })
  }
  catch (_error) {
    debugLog('main:getRecord:failed', { recordId })
    payload = null
  }

  const normalized = normalizeJsonPayload(payload)
  if (normalized && (normalized.record || normalized.model || normalized.id || normalized.product_code)) {
    const candidate = normalized.record || normalized.model || normalized
    const unwrapped = unwrapRecordData(candidate)
    debugLog('main:getRecord:normalized', {
      recordId,
      id: unwrapped.id,
      card_no: unwrapped.card_no || unwrapped.cardNo,
      product_code: unwrapped.product_code,
      product_name: unwrapped.product_name
    })
    if (unwrapped.product_code || unwrapped.product_name || unwrapped.card_no || unwrapped.cardNo) {
      return candidate
    }
  }

  const queryBodies = [
    {
      filters: { id: recordId },
      pageIndex: 0,
      pageSize: 1
    },
    {
      filters: [{ field: 'id', operator: 'eq', value: recordId }],
      pageIndex: 0,
      pageSize: 1
    },
    {
      filters: { card_no: recordId },
      pageIndex: 0,
      pageSize: 1
    },
    {
      filters: [{ field: 'card_no', operator: 'eq', value: recordId }],
      pageIndex: 0,
      pageSize: 1
    }
  ]

  for (const body of queryBodies) {
    let queryPayload = null
    try {
      queryPayload = await hostDataApi.queryRecords(MAIN_ENTITY_CODE, body)
      debugLog('main:queryRecords:success', { recordId, body })
    }
    catch (_error) {
      debugLog('main:queryRecords:failed', { recordId, body })
      continue
    }

    const rows = extractRowsFromPayload(queryPayload)
    debugLog('main:queryRecords:rows', { recordId, body, rowCount: rows.length })
    if (!rows.length) continue
    const first = rows[0]
    if (first && typeof first === 'object') return first
  }

  debugLog('main:record-not-found', { recordId })
  return null
}

async function loadMainRecord(recordId) {
  return loadMainRecordByHostApi(recordId)
}

function normalizeDetailRow(row, section) {
  if (!row || typeof row !== 'object') return row
  const normalizedRow = unwrapRecordData(row)
  const pick = (keys) => pickFirstObject(normalizedRow, keys)
  const normalizeLineNo = (fallback) => {
    const raw = pick(['line_no', 'lineNo', 'row_no', 'rowNo'])
    if (raw !== undefined && raw !== null && String(raw).trim() !== '') {
      const asNumber = Number(raw)
      return Number.isFinite(asNumber) ? asNumber : raw
    }
    return fallback
  }

  if (section === 'material') {
    return {
      line_no: normalizeLineNo(''),
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
      line_no: normalizeLineNo(''),
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
    line_no: normalizeLineNo(''),
    expense_type: pick(['expense_type', 'expenseType', 'type']) || '',
    detail_name: pick(['detail_name', 'detailName', 'name']) || '',
    amount: pick(['amount', 'line_amount', 'subtotal']) || '',
    ratio: pick(['ratio', 'rate']) || ''
  }
}

async function loadDetailRowsByCardNo(cardNo, entityCode) {
  if (!cardNo) return null

  const queryBodies = [
    {
      filters: { card_no: cardNo },
      pageIndex: 0,
      pageSize: 500
    },
    {
      filters: [{ field: 'card_no', operator: 'eq', value: cardNo }],
      pageIndex: 0,
      pageSize: 500
    }
  ]

  for (const body of queryBodies) {
    let payload = null
    try {
      payload = await hostDataApi.queryRecords(entityCode, body)
      debugLog('detail:query:success', { entityCode, cardNo, body })
    }
    catch (_error) {
      debugLog('detail:query:failed', { entityCode, cardNo, body })
      continue
    }

    const normalized = normalizeJsonPayload(payload)
    const rows = normalized?.records || normalized?.items || normalized?.rows || normalized?.data
    if (Array.isArray(rows)) {
      debugLog('detail:query:rows', { entityCode, cardNo, rowCount: rows.length })
      return rows
    }
  }

  debugLog('detail:query:not-found', { entityCode, cardNo })
  return null
}

async function loadById(recordId) {
  if (!recordId) return
  debugLog('loadById:start', { recordId })
  const mainRecord = await loadMainRecord(recordId)
  if (!mainRecord) {
    debugLog('loadById:main-empty', { recordId })
    return
  }

  const normalizedMain = unwrapRecordData(mainRecord)
  const cardNo =
    normalizedMain.card_no ||
    normalizedMain.cardNo ||
    ''
  debugLog('loadById:main-ready', {
    recordId,
    cardNo,
    id: normalizedMain.id,
    product_code: normalizedMain.product_code,
    product_name: normalizedMain.product_name
  })
  const [materialRows, laborRows, expenseRows] = await Promise.all([
    loadDetailRowsByCardNo(cardNo, 'cost_card_material'),
    loadDetailRowsByCardNo(cardNo, 'cost_card_labor'),
    loadDetailRowsByCardNo(cardNo, 'cost_card_expense')
  ])

  loadedData.value = {
    product: normalizeRecord(normalizedMain),
    materialRows: Array.isArray(materialRows)
      ? materialRows.map((row, index) => {
        const normalized = normalizeDetailRow(row, 'material')
        if (!normalized.line_no && normalized.line_no !== 0) normalized.line_no = index + 1
        return normalized
      })
      : undefined,
    laborRows: Array.isArray(laborRows)
      ? laborRows.map((row, index) => {
        const normalized = normalizeDetailRow(row, 'labor')
        if (!normalized.line_no && normalized.line_no !== 0) normalized.line_no = index + 1
        return normalized
      })
      : undefined,
    expenseRows: Array.isArray(expenseRows)
      ? expenseRows.map((row, index) => {
        const normalized = normalizeDetailRow(row, 'expense')
        if (!normalized.line_no && normalized.line_no !== 0) normalized.line_no = index + 1
        return normalized
      })
      : undefined
  }
  formRenderVersion.value += 1
  const productSnapshot = loadedData.value?.product && typeof loadedData.value.product === 'object'
    ? {
      product_code: loadedData.value.product.product_code,
      version_no: loadedData.value.product.version_no,
      product_name: loadedData.value.product.product_name,
      factory: loadedData.value.product.factory,
      product_category: loadedData.value.product.product_category,
      customer_name: loadedData.value.product.customer_name,
      tax_rate: loadedData.value.product.tax_rate,
      quoted_price_tax: loadedData.value.product.quoted_price_tax,
      sales_revenue: loadedData.value.product.sales_revenue,
      rebate_rate: loadedData.value.product.rebate_rate,
      account_period_days: loadedData.value.product.account_period_days,
      freight_amount: loadedData.value.product.freight_amount
    }
    : null
  debugLog('loadById:done', {
    recordId,
    cardNo,
    formRenderVersion: formRenderVersion.value,
    product: productSnapshot,
    materialCount: loadedData.value.materialRows?.length || 0,
    laborCount: loadedData.value.laborRows?.length || 0,
    expenseCount: loadedData.value.expenseRows?.length || 0
  })
}

watch(
  currentRecordId,
  async (recordId) => {
    debugLog('watch:currentRecordId', { recordId })
    if (!recordId) {
      loadedData.value = null
      formRenderVersion.value += 1
      debugLog('watch:clear-loaded-data', null)
      return
    }
    await loadById(recordId)
  },
  { immediate: true }
)

onActivated(async () => {
  const recordId = currentRecordId.value
  debugLog('onActivated', { recordId })
  if (!recordId) return
  await loadById(recordId)
})
</script>

<style scoped>
.cost-card-loading {
  min-height: 50vh;
  display: grid;
  place-items: center;
  color: #475569;
  font-size: 14px;
}

.cost-card-debug {
  display: flex;
  gap: 10px;
  padding: 6px 10px;
  margin: 8px 0;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  color: #334155;
  font-size: 12px;
  background: #f8fafc;
}
</style>
