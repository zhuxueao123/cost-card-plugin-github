<template>
  <CostCardFormBase
    scene-code="cc_labor_maint"
    scene-title="人工成本维护"
    :product-editable="false"
    :section-visibility="{ material: true, labor: true, expense: false }"
    :section-editable="{ material: true, labor: true, expense: false }"
    :column-editable="{ material: ['yield_rate'], labor: ['*'], expense: [] }"
  />
</template>

<script setup>
import CostCardFormBase from './cost-card-form-base.vue'
</script>
