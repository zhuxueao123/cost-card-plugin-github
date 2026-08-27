<template>
  <section class="cost-card-debug" v-if="currentRecordId">
    <span>debug</span>
    <span>recordId={{ currentRecordId }}</span>
  </section>
  <CostCardFormBase
    :record-id="currentRecordId"
    scene-code="cc_create"
    :scene-title="runtimeSceneTitle"
    :product-editable="configState.productEditable"
    :product-field-visibility="configState.productFieldVisibility"
    :section-visibility="configState.sectionVisibility"
    :section-editable="configState.sectionEditable"
    :column-editable="configState.columnEditable"
    :column-visibility="configState.columnVisibility"
  />
</template>

<script setup>
import { computed } from 'vue'
import { usePluginContext } from '@trusteem/asapflow-plugin-sdk'
import CostCardFormBase from './cost-card-form-base.vue'
import { COST_CARD_DEFAULT_SCENES, useCostCardSceneConfig } from './use-cost-card-scene-config'

const { configState, sceneTitle } = useCostCardSceneConfig('cc_create', COST_CARD_DEFAULT_SCENES.cc_create)
const pluginContext = usePluginContext()
const DEBUG_PREFIX = '[cost-card-create]'

function debugLog(stage, payload) {
  console.info(`${DEBUG_PREFIX} ${stage}`, payload)
}

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
      const resolved = String(value).trim()
      debugLog('resolve-record-id:matched', { value: resolved })
      return resolved
    }
  }
  debugLog('resolve-record-id:empty', null)
  return ''
})

const runtimeSceneTitle = computed(() => {
  if (currentRecordId.value) return '成本卡编辑'
  return sceneTitle.value || '成本卡创建'
})
</script>

<style scoped>
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
