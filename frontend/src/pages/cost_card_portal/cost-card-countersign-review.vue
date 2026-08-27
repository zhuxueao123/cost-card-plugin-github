<template>
  <CostCardFormBase
    scene-code="cc_countersign_review"
    scene-title="会签审核"
    :product-editable="false"
    :section-visibility="{ material: true, labor: true, expense: true }"
    :section-editable="{ material: false, labor: false, expense: false }"
    :column-editable="{ material: [], labor: [], expense: [] }"
  />
</template>

<script setup>
import CostCardFormBase from './cost-card-form-base.vue'
</script>
