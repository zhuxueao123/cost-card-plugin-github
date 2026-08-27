<template>
  <section class="cost-card-page">
    <header class="scene-head">
      <h1>{{ sceneTitle }}</h1>
      <p>{{ sceneCode }}</p>
    </header>

    <section class="block">
      <h2>产品信息</h2>
      <div class="grid product-grid">
        <label v-for="f in PRODUCT_FIELDS" :key="f.key" class="field">
          <span>{{ f.label }}</span>
          <input v-model="product[f.key]" :readonly="!productEditable" />
        </label>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('material')">
      <h2>材料成本</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="c in materialColumns" :key="c.key">{{ c.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in materialRows" :key="'m-' + idx">
              <td v-for="c in materialColumns" :key="c.key">
                <input
                  v-model="row[c.key]"
                  :readonly="!isCellEditable('material', c.key)"
                  :class="{ readonly: !isCellEditable('material', c.key) }"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('labor')">
      <h2>人工成本</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="c in laborColumns" :key="c.key">{{ c.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in laborRows" :key="'l-' + idx">
              <td v-for="c in laborColumns" :key="c.key">
                <input
                  v-model="row[c.key]"
                  :readonly="!isCellEditable('labor', c.key)"
                  :class="{ readonly: !isCellEditable('labor', c.key) }"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('expense')">
      <h2>费用成本</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th v-for="c in expenseColumns" :key="c.key">{{ c.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in expenseRows" :key="'e-' + idx">
              <td v-for="c in expenseColumns" :key="c.key">
                <input
                  v-model="row[c.key]"
                  :readonly="!isCellEditable('expense', c.key)"
                  :class="{ readonly: !isCellEditable('expense', c.key) }"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

const props = defineProps({
  sceneCode: { type: String, required: true },
  sceneTitle: { type: String, required: true },
  productEditable: { type: Boolean, default: false },
  sectionVisibility: { type: Object, required: true },
  sectionEditable: { type: Object, required: true },
  columnEditable: { type: Object, required: true }
})

const STYLE_ID = 'cost-card-form-inline-style'

const PRODUCT_FIELDS = [
  { key: 'product_code', label: '产品编码' },
  { key: 'version_no', label: '版本号' },
  { key: 'product_name', label: '产品名称' },
  { key: 'factory', label: '工厂' },
  { key: 'product_category', label: '产品类别' },
  { key: 'customer_name', label: '客户名称' }
]

const product = reactive({
  product_code: 'CC-2026-001',
  version_no: '1.0',
  product_name: '叮咚-南瓜巴斯克',
  factory: '南通',
  product_category: '西餐',
  customer_name: '叮咚买菜'
})

const materialColumns = [
  { key: 'item_name', label: '物料名称' },
  { key: 'item_code', label: '物料编码' },
  { key: 'spec', label: '规格' },
  { key: 'unit', label: '单位' },
  { key: 'formula_qty', label: '配方' },
  { key: 'yield_rate', label: '出成率' },
  { key: 'actual_qty', label: '实际量' },
  { key: 'unit_price', label: '单价' },
  { key: 'amount', label: '金额' }
]

const laborColumns = [
  { key: 'process_name', label: '工序' },
  { key: 'work_minutes', label: '工时' },
  { key: 'worker_count', label: '人数' },
  { key: 'wage', label: '工资' },
  { key: 'social_security', label: '社保' },
  { key: 'housing_fund', label: '公积金' },
  { key: 'subtotal', label: '小计' }
]

const expenseColumns = [
  { key: 'expense_type', label: '费用类别' },
  { key: 'detail_name', label: '明细' },
  { key: 'amount', label: '金额' },
  { key: 'ratio', label: '占比' }
]

const materialRows = ref([
  { item_name: '牛奶', item_code: 'MT-001', spec: '全脂', unit: 'g', formula_qty: '100', yield_rate: '90%', actual_qty: '111.11', unit_price: '0.005', amount: '0.56' },
  { item_name: '巧克力', item_code: 'MT-002', spec: '黑巧70%', unit: 'g', formula_qty: '50', yield_rate: '90%', actual_qty: '55.56', unit_price: '0.024', amount: '1.33' }
])

const laborRows = ref([
  { process_name: '清洗', work_minutes: '120', worker_count: '2', wage: '25.00', social_security: '3.75', housing_fund: '2.50', subtotal: '6.17' },
  { process_name: '切割', work_minutes: '180', worker_count: '3', wage: '28.00', social_security: '4.20', housing_fund: '2.80', subtotal: '8.55' }
])

const expenseRows = ref([
  { expense_type: '销售费用', detail_name: '渠道费', amount: '5.00', ratio: '24.8%' },
  { expense_type: '固定制造', detail_name: '资产摊销', amount: '4.50', ratio: '22.3%' }
])

function isSectionVisible(section) {
  return !!props.sectionVisibility?.[section]
}

function isCellEditable(section, fieldKey) {
  if (!props.sectionEditable?.[section]) return false
  const editableColumns = props.columnEditable?.[section] || []
  return editableColumns.includes('*') || editableColumns.includes(fieldKey)
}

const STYLE_TEXT = `
.cost-card-page { min-height: 100vh; background: #f0f2f5; padding: 16px; color: #1f2937; }
.scene-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 12px; }
.scene-head h1 { margin: 0; font-size: 22px; }
.scene-head p { margin: 0; color: #6b7280; font-size: 12px; }
.block { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.block h2 { margin: 0 0 10px; font-size: 15px; }
.grid { display: grid; gap: 10px; }
.product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.field { display: grid; gap: 4px; }
.field span { font-size: 12px; color: #9ca3af; }
input { width: 100%; box-sizing: border-box; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 8px; font-size: 13px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th { text-align: left; font-weight: 500; font-size: 12px; color: #6b7280; background: #f7f8fa; padding: 8px; white-space: nowrap; }
td { border-bottom: 1px solid #f0f0f0; padding: 6px; }
td input { border: 1px solid transparent; background: transparent; padding: 4px 6px; }
td input.readonly { color: #6b7280; }
@media (max-width: 900px) { .product-grid { grid-template-columns: 1fr; } }
`

onMounted(() => {
  if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
    const styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    styleEl.textContent = STYLE_TEXT
    document.head.appendChild(styleEl)
  }
})
</script>
