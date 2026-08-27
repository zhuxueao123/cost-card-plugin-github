<template>
  <CostCardFormBase
    scene-code="cc_countersign_review"
    :scene-title="sceneTitle"
    :product-editable="configState.productEditable"
    :product-field-visibility="configState.productFieldVisibility"
    :section-visibility="configState.sectionVisibility"
    :section-editable="configState.sectionEditable"
    :column-editable="configState.columnEditable"
    :column-visibility="configState.columnVisibility"
  />
</template>

<script setup>
import CostCardFormBase from './cost-card-form-base.vue'
import { COST_CARD_DEFAULT_SCENES, useCostCardSceneConfig } from './use-cost-card-scene-config'

const { configState, sceneTitle } = useCostCardSceneConfig('cc_countersign_review', COST_CARD_DEFAULT_SCENES.cc_countersign_review)
</script>
