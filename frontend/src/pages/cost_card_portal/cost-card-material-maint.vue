<template>
  <CostCardFormBase
    scene-code="cc_material_maint"
    scene-title="材料成本维护"
    :product-editable="false"
    :section-visibility="{ material: true, labor: false, expense: false }"
    :section-editable="{ material: true, labor: false, expense: false }"
    :column-editable="{ material: ['unit_price'], labor: [], expense: [] }"
  />
</template>

<script setup>
import CostCardFormBase from './cost-card-form-base.vue'
</script>
