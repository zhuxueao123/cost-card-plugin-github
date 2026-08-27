<template>
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
  for (const value of candidates) {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim()
    }
  }
  return ''
})

const runtimeSceneTitle = computed(() => {
  if (currentRecordId.value) return '成本卡编辑'
  return sceneTitle.value || '成本卡创建'
})
</script>
