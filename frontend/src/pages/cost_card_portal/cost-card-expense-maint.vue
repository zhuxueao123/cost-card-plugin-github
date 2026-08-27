<template>
  <CostCardFormBase
    scene-code="cc_expense_maint"
    scene-title="费用成本维护"
    :product-editable="false"
    :section-visibility="{ material: false, labor: false, expense: true }"
    :section-editable="{ material: false, labor: false, expense: true }"
    :column-editable="{ material: [], labor: [], expense: ['*'] }"
  />
</template>

<script setup>
import CostCardFormBase from './cost-card-form-base.vue'
</script>
