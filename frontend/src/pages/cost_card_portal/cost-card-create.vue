<template>
  <CostCardFormBase
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
import { computed, onActivated, onBeforeUnmount, onMounted, ref } from 'vue'
import CostCardFormBase from './cost-card-form-base.vue'
import { COST_CARD_DEFAULT_SCENES, useCostCardSceneConfig } from './use-cost-card-scene-config'

const { configState, sceneTitle } = useCostCardSceneConfig('cc_create', COST_CARD_DEFAULT_SCENES.cc_create)

const loadedData = ref(null)
const currentRecordId = ref('')

const runtimeSceneTitle = computed(() => {
  if (currentRecordId.value) return '成本卡编辑'
  return sceneTitle.value || '成本卡创建'
})

function safeParseJson(text) {
  if (!text || typeof text !== 'string') return null
  try {
    return JSON.parse(text)
  }
  catch (_error) {
    return null
  }
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

function getPayloadObjectFromLocation(url) {
  const payloadLike =
    url.searchParams.get('payload') ||
    url.searchParams.get('playload') ||
    url.searchParams.get('query') ||
    ''
  const parsed = safeParseJson(payloadLike)
  return parsed && typeof parsed === 'object' ? parsed : null
}

function getPayloadObjectFromHistoryState() {
  const state = globalThis?.history?.state
  if (!state || typeof state !== 'object') return null
  const direct = pickFirstObject(state, ['payload', 'playload', 'query'])
  if (direct && typeof direct === 'object') return direct
  if (typeof direct === 'string') {
    const parsed = safeParseJson(direct)
    if (parsed && typeof parsed === 'object') return parsed
  }
  return null
}

function getRecordIdFromLocation() {
  const href = String(globalThis?.location?.href || '')
  if (!href) return ''
  const url = new URL(href)

  const hashQuery = String(url.hash || '').includes('?')
    ? String(url.hash || '').slice(String(url.hash || '').indexOf('?') + 1)
    : ''
  const hashParams = new URLSearchParams(hashQuery)

  const payloadObj = getPayloadObjectFromLocation(url) || getPayloadObjectFromHistoryState() || {}

  return (
    url.searchParams.get('id') ||
    url.searchParams.get('recordId') ||
    url.searchParams.get('rowId') ||
    url.searchParams.get('pk') ||
    url.searchParams.get('key') ||
    url.searchParams.get('card_no') ||
    hashParams.get('id') ||
    hashParams.get('recordId') ||
    hashParams.get('rowId') ||
    pickFirstObject(payloadObj, ['id', 'recordId', 'rowId', 'pk', 'key', 'card_no']) ||
    ''
  )
}

function normalizeJsonPayload(payload) {
  if (!payload || typeof payload !== 'object') return null
  if (payload.data && typeof payload.data === 'object') return payload.data
  if (payload.payload && typeof payload.payload === 'object') return payload.payload
  return payload
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
    customer_name: pick(['customer_name', 'customerName', 'customer']) || ''
  }
}

function unwrapRecordData(record) {
  if (!record || typeof record !== 'object') return {}
  const dataJson =
    pickFirstObject(record, ['data_json', 'dataJson', 'json_data']) ||
    null

  if (typeof dataJson === 'string') {
    const parsed = safeParseJson(dataJson)
    if (parsed && typeof parsed === 'object') {
      return { ...record, ...parsed }
    }
  }

  if (dataJson && typeof dataJson === 'object') {
    return { ...record, ...dataJson }
  }

  return record
}

async function tryFetchJson(url, options) {
  const resp = await fetch(url, options)
  if (!resp.ok) return null
  return resp.json()
}

async function loadMainRecordByHostApi(recordId) {
  if (!recordId) return null

  const entityCandidates = ['electronic_cost_card', 'cost_card']
  for (const entity of entityCandidates) {
    const payload = await tryFetchJson(`/api/data/${entity}/${encodeURIComponent(recordId)}`, {
      method: 'GET',
      credentials: 'include'
    })

    const normalized = normalizeJsonPayload(payload)
    if (normalized && (normalized.record || normalized.model || normalized.id || normalized.product_code)) {
      return normalized.record || normalized.model || normalized
    }
  }

  return null
}

async function loadMainRecord(recordId) {
  const hostRecord = await loadMainRecordByHostApi(recordId)
  if (hostRecord) return hostRecord

  const requestBodies = [
    { entityCode: 'cost_card', recordId },
    { entityCode: 'cost_card', id: recordId },
    {
      entityCode: 'cost_card',
      filters: { id: recordId },
      pageIndex: 0,
      pageSize: 1
    },
    {
      entityCode: 'cost_card',
      filters: [{ field: 'id', operator: 'eq', value: recordId }],
      pageIndex: 0,
      pageSize: 1
    }
  ]

  for (const body of requestBodies) {
    const endpoint = 'filters' in body ? '/api/data/query-records' : '/api/data/get-record'
    const payload = await tryFetchJson(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const normalized = normalizeJsonPayload(payload)
    const rows = normalized?.records || normalized?.items || normalized?.rows || normalized?.data
    const firstRow = Array.isArray(rows) && rows.length ? rows[0] : null
    if (firstRow && typeof firstRow === 'object') return firstRow
    if (normalized && (normalized.record || normalized.model || normalized.id || normalized.product_code)) {
      return normalized.record || normalized.model || normalized
    }
  }

  return null
}

function normalizeDetailRow(row, section) {
  if (!row || typeof row !== 'object') return row
  const normalizedRow = unwrapRecordData(row)
  const pick = (keys) => pickFirstObject(normalizedRow, keys)

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

async function loadDetailRowsByCardNo(cardNo, entityCode) {
  if (!cardNo) return null

  const queryBodies = [
    {
      entityCode,
      filters: { card_no: cardNo },
      pageIndex: 0,
      pageSize: 500
    },
    {
      entityCode,
      filters: [{ field: 'card_no', operator: 'eq', value: cardNo }],
      pageIndex: 0,
      pageSize: 500
    }
  ]

  for (const body of queryBodies) {
    const payload = await tryFetchJson('/api/data/query-records', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const normalized = normalizeJsonPayload(payload)
    const rows = normalized?.records || normalized?.items || normalized?.rows || normalized?.data
    if (Array.isArray(rows)) return rows
  }

  return null
}

async function loadById(recordId) {
  if (!recordId) return
  const mainRecord = await loadMainRecord(recordId)
  if (!mainRecord) return

  const normalizedMain = unwrapRecordData(mainRecord)
  const cardNo =
    normalizedMain.card_no ||
    normalizedMain.cardNo ||
    normalizedMain.product_code ||
    normalizedMain.productCode ||
    ''
  const [materialRows, laborRows, expenseRows] = await Promise.all([
    loadDetailRowsByCardNo(cardNo, 'cost_card_material'),
    loadDetailRowsByCardNo(cardNo, 'cost_card_labor'),
    loadDetailRowsByCardNo(cardNo, 'cost_card_expense')
  ])

  loadedData.value = {
    product: normalizeRecord(normalizedMain),
    materialRows: Array.isArray(materialRows)
      ? materialRows.map((row) => normalizeDetailRow(row, 'material'))
      : undefined,
    laborRows: Array.isArray(laborRows)
      ? laborRows.map((row) => normalizeDetailRow(row, 'labor'))
      : undefined,
    expenseRows: Array.isArray(expenseRows)
      ? expenseRows.map((row) => normalizeDetailRow(row, 'expense'))
      : undefined
  }
}

async function syncFromLocation() {
  const recordId = getRecordIdFromLocation()
  currentRecordId.value = recordId
  if (!recordId) {
    loadedData.value = null
    return
  }
  await loadById(recordId)
}

onMounted(async () => {
  await syncFromLocation()
  globalThis?.addEventListener?.('hashchange', syncFromLocation)
  globalThis?.addEventListener?.('popstate', syncFromLocation)
})

onActivated(() => {
  void syncFromLocation()
})

onBeforeUnmount(() => {
  globalThis?.removeEventListener?.('hashchange', syncFromLocation)
  globalThis?.removeEventListener?.('popstate', syncFromLocation)
})
</script>
