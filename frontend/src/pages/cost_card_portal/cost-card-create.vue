<template>
  <CostCardFormBase
    scene-code="cc_create"
    scene-title="成本卡创建"
    :product-editable="true"
    :section-visibility="{ material: true, labor: true, expense: false }"
    :section-editable="{ material: true, labor: true, expense: false }"
    :column-editable="{ material: ['*'], labor: ['*'], expense: [] }"
  />
</template>

<script setup>
import CostCardFormBase from './cost-card-form-base.vue'
</script>
