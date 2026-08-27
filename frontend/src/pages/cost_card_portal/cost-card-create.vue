<template>
  <CostCardFormBase
    scene-code="cc_create"
    :scene-title="sceneTitle"
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
import { onMounted, ref } from 'vue'
import CostCardFormBase from './cost-card-form-base.vue'
import { COST_CARD_DEFAULT_SCENES, useCostCardSceneConfig } from './use-cost-card-scene-config'

const { configState, sceneTitle } = useCostCardSceneConfig('cc_create', COST_CARD_DEFAULT_SCENES.cc_create)

const loadedData = ref(null)

function getRecordIdFromLocation() {
  const href = String(globalThis?.location?.href || '')
  if (!href) return ''
  const url = new URL(href)
  return (
    url.searchParams.get('id') ||
    url.searchParams.get('recordId') ||
    url.searchParams.get('rowId') ||
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
  return {
    product_code: record.product_code,
    version_no: record.version_no,
    product_name: record.product_name,
    factory: record.factory,
    product_category: record.product_category,
    customer_name: record.customer_name
  }
}

async function tryFetchJson(url, options) {
  const resp = await fetch(url, options)
  if (!resp.ok) return null
  return resp.json()
}

async function loadMainRecord(recordId) {
  const requestBodies = [
    { entityCode: 'cost_card', recordId },
    { entityCode: 'cost_card', id: recordId }
  ]

  for (const body of requestBodies) {
    const payload = await tryFetchJson('/api/data/get-record', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const normalized = normalizeJsonPayload(payload)
    if (normalized && (normalized.record || normalized.model || normalized.id || normalized.product_code)) {
      return normalized.record || normalized.model || normalized
    }
  }

  return null
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

  const cardNo = mainRecord.card_no || mainRecord.cardNo || ''
  const [materialRows, laborRows, expenseRows] = await Promise.all([
    loadDetailRowsByCardNo(cardNo, 'cost_card_material'),
    loadDetailRowsByCardNo(cardNo, 'cost_card_labor'),
    loadDetailRowsByCardNo(cardNo, 'cost_card_expense')
  ])

  loadedData.value = {
    product: normalizeRecord(mainRecord),
    materialRows: Array.isArray(materialRows) ? materialRows : undefined,
    laborRows: Array.isArray(laborRows) ? laborRows : undefined,
    expenseRows: Array.isArray(expenseRows) ? expenseRows : undefined
  }
}

onMounted(async () => {
  const recordId = getRecordIdFromLocation()
  if (!recordId) return
  await loadById(recordId)
})
</script>
