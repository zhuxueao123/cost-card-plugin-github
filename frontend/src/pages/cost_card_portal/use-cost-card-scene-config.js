import { computed, onMounted, ref } from 'vue'

const FEATURE_CODE = 'electronic_cost_card'

const PRODUCT_FIELD_KEYS = [
  'product_code',
  'version_no',
  'product_name',
  'factory',
  'product_category',
  'customer_name'
]

export const COST_CARD_DEFAULT_SCENES = {
  cc_create: {
    title: '成本卡创建',
    productEditable: true,
    productFieldVisibility: [...PRODUCT_FIELD_KEYS],
    sectionVisibility: { material: true, labor: true, expense: false },
    sectionEditable: { material: true, labor: true, expense: false },
    columnEditable: { material: ['*'], labor: ['*'], expense: [] },
    columnVisibility: { material: ['*'], labor: ['*'], expense: ['*'] }
  },
  cc_material_maint: {
    title: '材料成本维护',
    productEditable: false,
    productFieldVisibility: [...PRODUCT_FIELD_KEYS],
    sectionVisibility: { material: true, labor: false, expense: false },
    sectionEditable: { material: true, labor: false, expense: false },
    columnEditable: { material: ['unit_price'], labor: [], expense: [] },
    columnVisibility: { material: ['*'], labor: ['*'], expense: ['*'] }
  },
  cc_labor_maint: {
    title: '人工成本维护',
    productEditable: false,
    productFieldVisibility: [...PRODUCT_FIELD_KEYS],
    sectionVisibility: { material: true, labor: true, expense: false },
    sectionEditable: { material: true, labor: true, expense: false },
    columnEditable: { material: ['yield_rate'], labor: ['*'], expense: [] },
    columnVisibility: { material: ['*'], labor: ['*'], expense: ['*'] }
  },
  cc_expense_maint: {
    title: '费用成本维护',
    productEditable: false,
    productFieldVisibility: [...PRODUCT_FIELD_KEYS],
    sectionVisibility: { material: false, labor: false, expense: true },
    sectionEditable: { material: false, labor: false, expense: true },
    columnEditable: { material: [], labor: [], expense: ['*'] },
    columnVisibility: { material: ['*'], labor: ['*'], expense: ['*'] }
  },
  cc_countersign_review: {
    title: '会签审核',
    productEditable: false,
    productFieldVisibility: [...PRODUCT_FIELD_KEYS],
    sectionVisibility: { material: true, labor: true, expense: true },
    sectionEditable: { material: false, labor: false, expense: false },
    columnEditable: { material: [], labor: [], expense: [] },
    columnVisibility: { material: ['*'], labor: ['*'], expense: ['*'] }
  }
}

function normalizeSceneConfig(sceneCode, fallback, incoming, sceneName) {
  const base = fallback || COST_CARD_DEFAULT_SCENES[sceneCode] || COST_CARD_DEFAULT_SCENES.cc_create
  const cfg = incoming || {}
  return {
    ...base,
    ...cfg,
    title: sceneName || cfg.title || base.title,
    productFieldVisibility: Array.isArray(cfg.productFieldVisibility)
      ? cfg.productFieldVisibility
      : base.productFieldVisibility,
    sectionVisibility: {
      ...base.sectionVisibility,
      ...(cfg.sectionVisibility || {})
    },
    sectionEditable: {
      ...base.sectionEditable,
      ...(cfg.sectionEditable || {})
    },
    columnEditable: {
      ...base.columnEditable,
      ...(cfg.columnEditable || {})
    },
    columnVisibility: {
      ...base.columnVisibility,
      ...(cfg.columnVisibility || {})
    }
  }
}

export function useCostCardSceneConfig(sceneCode, fallbackConfig) {
  const loadError = ref(false)
  const configState = ref(normalizeSceneConfig(sceneCode, fallbackConfig))

  async function loadScenarioConfig() {
    loadError.value = false
    try {
      const featureListResp = await fetch('/api/meta/features', { credentials: 'include' })
      if (!featureListResp.ok) throw new Error('feature list request failed')

      const payload = await featureListResp.json()
      const features = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : []
      const feature = features.find((item) => item?.code === FEATURE_CODE)
      if (!feature) throw new Error('feature not found')

      const scenarios = Array.isArray(feature.scenarios) ? feature.scenarios : []
      const currentScenario = scenarios.find((item) => item?.code === sceneCode)
      if (!currentScenario?.metadata) return

      const metadata = typeof currentScenario.metadata === 'string'
        ? JSON.parse(currentScenario.metadata)
        : currentScenario.metadata

      const customCfg = metadata?.customPage?.config
      const scenarioName = metadata?.customPage?.scenarioName
      configState.value = normalizeSceneConfig(sceneCode, fallbackConfig, customCfg, scenarioName)
    }
    catch (_error) {
      loadError.value = true
      configState.value = normalizeSceneConfig(sceneCode, fallbackConfig)
    }
  }

  onMounted(async () => {
    await loadScenarioConfig()
  })

  return {
    loadError,
    configState,
    sceneTitle: computed(() => configState.value.title)
  }
}
