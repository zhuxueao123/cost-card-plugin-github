<template>
  <section class="cost-card-page">
    <header class="scene-head">
      <h1>{{ sceneTitle }}</h1>
      <p>{{ sceneCode }}</p>
    </header>

    <section class="block">
      <h2>产品信息</h2>
      <div class="top-layout">
        <div class="grid product-grid">
          <label v-for="f in visibleProductFields" :key="f.key" class="field">
            <span>{{ f.label }}</span>
            <input v-model="product[f.key]" :readonly="!productEditable" />
          </label>
        </div>
        <div class="summary-cards">
          <article class="summary-card sc-blue">
            <div class="title">材料成本</div>
            <div class="amount">¥45.60</div>
            <div class="ratio">52.2%</div>
          </article>
          <article class="summary-card sc-green">
            <div class="title">人工成本</div>
            <div class="amount">¥12.30</div>
            <div class="ratio">14.1%</div>
          </article>
          <article class="summary-card sc-orange">
            <div class="title">费用成本</div>
            <div class="amount">¥15.00</div>
            <div class="ratio">17.2%</div>
          </article>
          <article class="summary-card sc-total">
            <div class="title">总成本</div>
            <div class="amount">¥87.40</div>
          </article>
        </div>
      </div>
    </section>

    <section class="block">
      <h2>产品报价与汇总</h2>
      <div class="quote-layout">
        <div class="left-panels">
          <div class="inner-panel">
            <h3>销售报价</h3>
            <div class="grid quote-grid">
              <label class="field"><span>税率</span><input value="13%" readonly /></label>
              <label class="field"><span>销售含税报价</span><input value="113.00" readonly /></label>
              <label class="field"><span>销售收入</span><input value="100.00" readonly /></label>
              <label class="field"><span>票前扣点与返利</span><input value="5%" readonly /></label>
              <label class="field"><span>账期</span><input value="30天" readonly /></label>
              <label class="field"><span>运费</span><input value="0.00" readonly /></label>
            </div>
          </div>
          <div class="inner-panel">
            <h3>利润</h3>
            <div class="profit-cards">
              <article class="profit-card pc-blue"><span>边际贡献</span><b>¥51.20</b><em>51.20%</em></article>
              <article class="profit-card pc-green"><span>毛利额</span><b>¥50.51</b><em>50.51%</em></article>
              <article class="profit-card pc-orange"><span>税前利润</span><b>¥35.51</b><em>35.51%</em></article>
              <article class="profit-card pc-dark"><span>所得税</span><b>¥4.62</b><em>4.62%</em></article>
              <article class="profit-card pc-main"><span>净利润</span><b>¥30.89</b><em>30.89%</em></article>
            </div>
          </div>
        </div>
        <aside class="inner-panel ratio-panel">
          <h3>成本占比</h3>
          <div class="ratio-wrap">
            <div class="ratio-ring"></div>
            <ul class="legend">
              <li><i class="c1"></i><span>原辅料 ¥45.60</span><b>45.60%</b></li>
              <li><i class="c2"></i><span>包材 ¥3.89</span><b>3.89%</b></li>
              <li><i class="c3"></i><span>直接人工 ¥12.30</span><b>12.30%</b></li>
              <li><i class="c4"></i><span>变动费用 ¥3.20</span><b>3.20%</b></li>
              <li><i class="c5"></i><span>固定费用 ¥11.80</span><b>11.80%</b></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('material')">
      <div class="section-head">
        <h2>材料成本</h2>
        <span class="tag-blue">¥45.60</span>
      </div>
      <div class="split-layout">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th v-for="c in materialVisibleColumns" :key="c.key">{{ c.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in materialRows" :key="'m-' + idx" :class="{ alt: idx % 2 === 1 }">
                <td v-for="c in materialVisibleColumns" :key="c.key">
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
        <aside class="side-panel">
          <h3>材料构成</h3>
          <div class="mini-ring material-ring"></div>
          <ul class="legend compact">
            <li><i class="c2"></i><span>包材 ¥3.89</span><b>47.5%</b></li>
            <li><i class="c1"></i><span>蔬果 ¥2.22</span><b>27.1%</b></li>
            <li><i class="c3"></i><span>调味料 ¥2.08</span><b>25.4%</b></li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('labor')">
      <div class="section-head">
        <h2>人工成本</h2>
        <span class="tag-green">¥30.44</span>
      </div>
      <div class="split-layout">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th v-for="c in laborVisibleColumns" :key="c.key">{{ c.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in laborRows" :key="'l-' + idx" :class="{ alt: idx % 2 === 1 }">
                <td v-for="c in laborVisibleColumns" :key="c.key">
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
        <aside class="side-panel">
          <h3>工序成本</h3>
          <div class="bar-list">
            <div class="bar-item"><label>清洗</label><span style="width:72.2%"></span><b>¥6.17</b></div>
            <div class="bar-item"><label>切割</label><span style="width:100%"></span><b>¥8.55</b></div>
            <div class="bar-item"><label>调配</label><span style="width:89.7%"></span><b>¥7.67</b></div>
            <div class="bar-item"><label>烘烤</label><span style="width:78%"></span><b>¥6.67</b></div>
            <div class="bar-item"><label>包装</label><span style="width:16.1%"></span><b>¥1.38</b></div>
          </div>
        </aside>
      </div>
    </section>

    <section class="block" v-if="isSectionVisible('expense')">
      <div class="section-head">
        <h2>费用成本</h2>
        <span class="tag-orange">¥20.20</span>
      </div>
      <div class="split-layout">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th v-for="c in expenseVisibleColumns" :key="c.key">{{ c.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in expenseRows" :key="'e-' + idx" :class="{ alt: idx % 2 === 1 }">
                <td v-for="c in expenseVisibleColumns" :key="c.key">
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
        <aside class="side-panel">
          <h3>费用构成</h3>
          <div class="mini-ring expense-ring"></div>
          <ul class="legend compact">
            <li><i class="c2"></i><span>销售 ¥5.00</span><b>24.8%</b></li>
            <li><i class="c1"></i><span>固定制造 ¥4.50</span><b>22.3%</b></li>
            <li><i class="c3"></i><span>管理 ¥3.80</span><b>18.8%</b></li>
            <li><i class="c4"></i><span>变动制造 ¥3.20</span><b>15.8%</b></li>
            <li><i class="c5"></i><span>财务 ¥2.20</span><b>10.9%</b></li>
            <li><i class="c6"></i><span>总部分摊 ¥1.50</span><b>7.4%</b></li>
          </ul>
        </aside>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'

const props = defineProps({
  sceneCode: { type: String, required: true },
  sceneTitle: { type: String, required: true },
  productEditable: { type: Boolean, default: false },
  productFieldVisibility: { type: Array, default: () => [] },
  sectionVisibility: { type: Object, required: true },
  sectionEditable: { type: Object, required: true },
  columnEditable: { type: Object, required: true },
  columnVisibility: { type: Object, default: () => ({}) },
  initialData: { type: Object, default: null }
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
  { item_name: '巴斯克酱', item_code: '-', spec: '-', unit: '-', formula_qty: '-', yield_rate: '-', actual_qty: '-', unit_price: '-', amount: '2.08' },
  { item_name: '牛奶', item_code: 'MT-001', spec: '全脂', unit: 'g', formula_qty: '100', yield_rate: '90%', actual_qty: '111.11', unit_price: '0.005', amount: '0.56' },
  { item_name: '巧克力', item_code: 'MT-002', spec: '黑巧70%', unit: 'g', formula_qty: '50', yield_rate: '90%', actual_qty: '55.56', unit_price: '0.024', amount: '1.33' },
  { item_name: '贝贝南瓜', item_code: 'MT-003', spec: '去皮', unit: 'g', formula_qty: '200', yield_rate: '90%', actual_qty: '222.22', unit_price: '0.010', amount: '2.22' },
  { item_name: '包材', item_code: 'MT-004', spec: '食品级', unit: '套', formula_qty: '1', yield_rate: '90%', actual_qty: '1.11', unit_price: '3.50', amount: '3.89' }
])

const laborRows = ref([
  { process_name: '清洗', work_minutes: '120', worker_count: '2', wage: '25.00', social_security: '3.75', housing_fund: '2.50', subtotal: '6.17' },
  { process_name: '切割', work_minutes: '180', worker_count: '3', wage: '28.00', social_security: '4.20', housing_fund: '2.80', subtotal: '8.55' },
  { process_name: '调配', work_minutes: '240', worker_count: '2', wage: '30.00', social_security: '4.50', housing_fund: '3.00', subtotal: '7.67' },
  { process_name: '烘烤', work_minutes: '600', worker_count: '1', wage: '32.00', social_security: '4.80', housing_fund: '3.20', subtotal: '6.67' },
  { process_name: '包装', work_minutes: '90', worker_count: '2', wage: '22.00', social_security: '3.30', housing_fund: '2.20', subtotal: '1.38' }
])

const expenseRows = ref([
  { expense_type: '变动制造', detail_name: '水电煤', amount: '3.20', ratio: '3.7%' },
  { expense_type: '销售费用', detail_name: '渠道费', amount: '5.00', ratio: '5.7%' },
  { expense_type: '固定制造', detail_name: '资产摊销', amount: '4.50', ratio: '5.1%' },
  { expense_type: '管理费用', detail_name: '管理工资', amount: '3.80', ratio: '4.3%' },
  { expense_type: '财务费用', detail_name: '银行利息', amount: '2.20', ratio: '2.5%' },
  { expense_type: '总部分摊', detail_name: '行政分摊', amount: '1.50', ratio: '1.7%' }
])

const visibleProductFields = computed(() => {
  const visible = props.productFieldVisibility || []
  if (!visible.length || visible.includes('*')) return PRODUCT_FIELDS
  return PRODUCT_FIELDS.filter((item) => visible.includes(item.key))
})

function resolveVisibleColumns(section, allColumns) {
  const visible = props.columnVisibility?.[section]
  if (!Array.isArray(visible) || !visible.length || visible.includes('*')) return allColumns
  return allColumns.filter((item) => visible.includes(item.key))
}

const materialVisibleColumns = computed(() => resolveVisibleColumns('material', materialColumns))
const laborVisibleColumns = computed(() => resolveVisibleColumns('labor', laborColumns))
const expenseVisibleColumns = computed(() => resolveVisibleColumns('expense', expenseColumns))

function applyProductData(productData) {
  if (!productData || typeof productData !== 'object') return
  const keys = Object.keys(product)
  for (const key of keys) {
    if (key in productData && productData[key] !== undefined && productData[key] !== null) {
      product[key] = String(productData[key])
    }
  }
}

function applyRowsData(targetRowsRef, rowsData) {
  if (!Array.isArray(rowsData) || rowsData.length === 0) return
  targetRowsRef.value = rowsData.map((row) => ({ ...row }))
}

function applyInitialData(payload) {
  if (!payload || typeof payload !== 'object') return
  applyProductData(payload.product || payload.model || {})
  applyRowsData(materialRows, payload.materialRows || payload.material || payload.material_items)
  applyRowsData(laborRows, payload.laborRows || payload.labor || payload.labor_items)
  applyRowsData(expenseRows, payload.expenseRows || payload.expense || payload.expense_items)
}

watch(
  () => props.initialData,
  (value) => {
    applyInitialData(value)
  },
  { deep: true, immediate: true }
)

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
.top-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 12px; }
.summary-cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.summary-card { border: 1px solid #e5e7eb; border-top-width: 2px; border-radius: 8px; padding: 10px; background: #fff; }
.summary-card .title { font-size: 13px; color: #6b7280; }
.summary-card .amount { font-size: 28px; line-height: 1.1; text-align: right; font-weight: 700; }
.summary-card .ratio { font-size: 16px; text-align: right; color: #9ca3af; }
.sc-blue { border-top-color: #3b82f6; } .sc-blue .amount { color: #3b82f6; }
.sc-green { border-top-color: #10b981; } .sc-green .amount { color: #10b981; }
.sc-orange { border-top-color: #f59e0b; } .sc-orange .amount { color: #f59e0b; }
.sc-total { border-top-color: #1e3a5f; } .sc-total .amount { color: #1e3a5f; text-align: center; }
.quote-layout { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }
.left-panels { display: grid; gap: 10px; }
.inner-panel { border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; background: #fff; }
.inner-panel h3 { margin: 0 0 8px; font-size: 13px; }
.quote-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.profit-cards { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
.profit-card { border: 1px solid #e5e7eb; border-top-width: 2px; border-radius: 8px; padding: 8px; }
.profit-card span { font-size: 12px; color: #6b7280; }
.profit-card b { display: block; text-align: right; font-size: 22px; line-height: 1.1; color: #1f2937; }
.profit-card em { display: block; text-align: right; font-style: normal; font-size: 14px; color: #6b7280; }
.pc-blue { border-top-color: #3b82f6; }
.pc-green { border-top-color: #10b981; }
.pc-orange { border-top-color: #f59e0b; }
.pc-dark { border-top-color: #475569; }
.pc-main { border-top-color: #1e3a5f; }
.ratio-wrap { display: flex; gap: 12px; align-items: center; }
.ratio-ring { width: 160px; height: 160px; border-radius: 50%; background: conic-gradient(#3b82f6 0% 45.6%, #f59e0b 45.6% 49.49%, #10b981 49.49% 61.79%, #475569 61.79% 64.99%, #1e3a5f 64.99% 76.79%); position: relative; }
.ratio-ring::after { content: '成本占比'; position: absolute; inset: 32px; border-radius: 50%; background: #fff; display: grid; place-items: center; color: #1e3a5f; font-weight: 700; font-size: 14px; }
.legend { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px; }
.legend li { display: grid; grid-template-columns: 10px 1fr auto; gap: 8px; align-items: center; font-size: 12px; }
.legend i { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
.legend span { color: #6b7280; } .legend b { color: #9ca3af; font-weight: 500; }
.c1 { background: #3b82f6; } .c2 { background: #f59e0b; } .c3 { background: #10b981; }
.c4 { background: #475569; } .c5 { background: #1e3a5f; } .c6 { background: #9ca3af; }
.section-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.tag-blue, .tag-green, .tag-orange { font-size: 12px; border-radius: 4px; padding: 2px 8px; }
.tag-blue { color: #3b82f6; background: rgba(59,130,246,.1); }
.tag-green { color: #10b981; background: rgba(16,185,129,.1); }
.tag-orange { color: #f59e0b; background: rgba(245,158,11,.1); }
.split-layout { display: grid; grid-template-columns: 2fr 1fr; border-top: 1px solid #e5e7eb; }
.side-panel { border-left: 1px solid #e5e7eb; padding: 10px; }
.side-panel h3 { margin: 0 0 8px; font-size: 13px; }
.mini-ring { width: 130px; height: 130px; margin: 0 auto 8px; border-radius: 50%; position: relative; }
.material-ring { background: conic-gradient(#f59e0b 0% 47.5%, #3b82f6 47.5% 74.6%, #10b981 74.6% 100%); }
.material-ring::after { content: '¥8.19'; position: absolute; inset: 24px; border-radius: 50%; background: #fff; display: grid; place-items: center; color: #1e3a5f; font-weight: 700; }
.expense-ring { background: conic-gradient(#f59e0b 0% 24.8%, #3b82f6 24.8% 47%, #10b981 47% 65.8%, #475569 65.8% 76.7%, #1e3a5f 76.7% 87.6%, #9ca3af 87.6% 100%); }
.expense-ring::after { content: '¥20.20'; position: absolute; inset: 24px; border-radius: 50%; background: #fff; display: grid; place-items: center; color: #1e3a5f; font-weight: 700; }
.bar-list { display: grid; gap: 8px; }
.bar-item { display: grid; grid-template-columns: 44px 1fr auto; gap: 8px; align-items: center; font-size: 12px; }
.bar-item label { color: #6b7280; }
.bar-item span { display: block; height: 8px; border-radius: 4px; background: #10b981; }
.bar-item b { color: #1f2937; }
.field { display: grid; gap: 4px; }
.field span { font-size: 12px; color: #9ca3af; }
input { width: 100%; box-sizing: border-box; border: 1px solid #e5e7eb; border-radius: 6px; padding: 6px 8px; font-size: 13px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th { text-align: left; font-weight: 500; font-size: 12px; color: #6b7280; background: #f7f8fa; padding: 8px; white-space: nowrap; }
td { border-bottom: 1px solid #f0f0f0; padding: 6px; }
td input { border: 1px solid transparent; background: transparent; padding: 4px 6px; }
td input.readonly { color: #6b7280; }
tr.alt { background: #f7f8fa; }
.compact li { grid-template-columns: 8px 1fr auto; }
.compact i { width: 8px; height: 8px; }
@media (max-width: 1200px) {
  .top-layout, .quote-layout, .split-layout { grid-template-columns: 1fr; }
  .summary-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .profit-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .quote-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .side-panel { border-left: 0; border-top: 1px solid #e5e7eb; }
}
@media (max-width: 900px) {
  .product-grid, .quote-grid, .profit-cards, .summary-cards { grid-template-columns: 1fr; }
  .ratio-wrap { flex-direction: column; align-items: flex-start; }
}
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
