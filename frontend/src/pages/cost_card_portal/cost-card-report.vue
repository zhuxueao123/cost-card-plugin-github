<template>
  <section class="report-page">
    <main class="main-wrap">
      <section class="panel soft-bg">
        <div class="panel-title-row">
          <h2>产品信息</h2>
          <span class="status">审核中</span>
        </div>
        <div class="product-layout">
          <div class="product-form-grid">
            <div class="field"><label>产品编码</label><input value="CC-2026-001" readonly></div>
            <div class="field"><label>版本号</label><input value="1.0" readonly></div>
            <div class="field wide"><label>产品名称</label><input value="叮咚-南瓜巴斯克" readonly></div>
            <div class="field"><label>工厂</label><input value="南通" readonly></div>
            <div class="field"><label>产品类别</label><input value="西餐" readonly></div>
            <div class="field wide"><label>客户名称</label><input value="叮咚买菜" readonly></div>
          </div>
          <div class="summary-cards">
            <article class="summary-card s-blue"><span>材料成本</span><b>¥45.60</b><em>52.2%</em></article>
            <article class="summary-card s-green"><span>人工成本</span><b>¥12.30</b><em>14.1%</em></article>
            <article class="summary-card s-orange"><span>费用成本</span><b>¥15.00</b><em>17.2%</em></article>
            <article class="summary-card s-total"><span>总成本</span><b>¥87.40</b><em></em></article>
          </div>
        </div>
      </section>

      <section class="panel soft-bg">
        <div class="panel-title-row"><h2>产品报价与汇总</h2></div>
        <div class="quote-layout">
          <div class="left-stack">
            <div class="inner-card">
              <div class="inner-title">销售报价</div>
              <div class="quote-grid">
                <div class="field"><label>税率</label><input value="13%" readonly></div>
                <div class="field"><label>销售含税报价</label><input value="113.00" readonly></div>
                <div class="field"><label>销售收入</label><input value="100.00" readonly></div>
                <div class="field"><label>票前扣点与返利</label><input value="5%" readonly></div>
                <div class="field"><label>账期</label><input value="30天" readonly></div>
                <div class="field"><label>运费</label><input value="0.00" readonly></div>
              </div>
            </div>
            <div class="inner-card">
              <div class="inner-title">利润</div>
              <div class="profit-grid">
                <article class="profit-card p-blue"><span>边际贡献</span><b>¥51.20</b><em>51.20%</em></article>
                <article class="profit-card p-green"><span>毛利额</span><b>¥50.51</b><em>50.51%</em></article>
                <article class="profit-card p-orange"><span>税前利润</span><b>¥35.51</b><em>35.51%</em></article>
                <article class="profit-card p-dark"><span>所得税</span><b>¥4.62</b><em>4.62%</em></article>
                <article class="profit-card p-main"><span>净利润</span><b>¥30.89</b><em>30.89%</em></article>
              </div>
            </div>
          </div>
          <div class="inner-card ratio-card">
            <div class="inner-title">成本占比</div>
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
          </div>
        </div>
      </section>

      <section class="panel data-panel">
        <div class="section-head"><h3>材料成本</h3><span>¥45.60</span></div>
        <div class="data-split">
          <div class="table-wrap">
            <table>
              <thead><tr><th>物料名称</th><th>物料编码</th><th>规格</th><th>单位</th><th class="num">配方</th><th class="num">出成率</th><th class="num">实际量</th><th class="num">单价</th><th class="num">金额</th></tr></thead>
              <tbody>
                <tr class="group"><td>巴斯克酱</td><td>-</td><td>-</td><td>-</td><td class="num">-</td><td class="num">-</td><td class="num">-</td><td class="num">-</td><td class="num">2.08</td></tr>
                <tr><td class="child">牛奶</td><td>MT-001</td><td>全脂</td><td>g</td><td class="num">100</td><td class="num">90%</td><td class="num">111.11</td><td class="num">0.005</td><td class="num">0.56</td></tr>
                <tr class="alt"><td class="child">巧克力</td><td>MT-002</td><td>黑巧70%</td><td>g</td><td class="num">50</td><td class="num">90%</td><td class="num">55.56</td><td class="num">0.024</td><td class="num">1.33</td></tr>
                <tr><td class="child">盐</td><td>MT-005</td><td>-</td><td>g</td><td class="num">5</td><td class="num">90%</td><td class="num">5.56</td><td class="num">0.004</td><td class="num">0.02</td></tr>
                <tr class="alt"><td class="child">糖</td><td>MT-006</td><td>-</td><td>g</td><td class="num">30</td><td class="num">90%</td><td class="num">33.33</td><td class="num">0.005</td><td class="num">0.17</td></tr>
                <tr><td>贝贝南瓜</td><td>MT-003</td><td>去皮</td><td>g</td><td class="num">200</td><td class="num">90%</td><td class="num">222.22</td><td class="num">0.010</td><td class="num">2.22</td></tr>
                <tr class="alt"><td>包材</td><td>MT-004</td><td>食品级</td><td>套</td><td class="num">1</td><td class="num">90%</td><td class="num">1.11</td><td class="num">3.50</td><td class="num">3.89</td></tr>
              </tbody>
            </table>
          </div>
          <aside class="side-card">
            <h4>材料构成</h4>
            <div class="mini-ring"></div>
            <ul class="legend compact">
              <li><i class="c2"></i><span>包材 ¥3.89</span><b>47.5%</b></li>
              <li><i class="c1"></i><span>蔬果 ¥2.22</span><b>27.1%</b></li>
              <li><i class="c3"></i><span>调味料 ¥2.08</span><b>25.4%</b></li>
            </ul>
          </aside>
        </div>
      </section>

      <section class="panel data-panel">
        <div class="section-head"><h3>人工成本</h3><span>¥30.44</span></div>
        <div class="data-split">
          <div class="table-wrap">
            <table>
              <thead><tr><th>工序</th><th class="num">工时</th><th class="num">人数</th><th class="num">工资</th><th class="num">社保</th><th class="num">公积</th><th class="num">小计</th></tr></thead>
              <tbody>
                <tr><td>清洗</td><td class="num">120</td><td class="num">2</td><td class="num">25.00</td><td class="num">3.75</td><td class="num">2.50</td><td class="num">6.17</td></tr>
                <tr class="alt"><td>切割</td><td class="num">180</td><td class="num">3</td><td class="num">28.00</td><td class="num">4.20</td><td class="num">2.80</td><td class="num">8.55</td></tr>
                <tr><td>调配</td><td class="num">240</td><td class="num">2</td><td class="num">30.00</td><td class="num">4.50</td><td class="num">3.00</td><td class="num">7.67</td></tr>
                <tr class="alt"><td>烘烤</td><td class="num">600</td><td class="num">1</td><td class="num">32.00</td><td class="num">4.80</td><td class="num">3.20</td><td class="num">6.67</td></tr>
                <tr><td>包装</td><td class="num">90</td><td class="num">2</td><td class="num">22.00</td><td class="num">3.30</td><td class="num">2.20</td><td class="num">1.38</td></tr>
              </tbody>
            </table>
          </div>
          <aside class="side-card">
            <h4>工序成本</h4>
            <div class="bar"><label>清洗</label><span style="width:72.2%"></span><b>¥6.17</b></div>
            <div class="bar"><label>切割</label><span style="width:100%"></span><b>¥8.55</b></div>
            <div class="bar"><label>调配</label><span style="width:89.7%"></span><b>¥7.67</b></div>
            <div class="bar"><label>烘烤</label><span style="width:78%"></span><b>¥6.67</b></div>
            <div class="bar"><label>包装</label><span style="width:16.1%"></span><b>¥1.38</b></div>
          </aside>
        </div>
      </section>

      <section class="panel data-panel">
        <div class="section-head"><h3>费用成本</h3><span>¥20.20</span></div>
        <div class="data-split">
          <div class="table-wrap">
            <table>
              <thead><tr><th>费用类别</th><th>明细</th><th class="num">金额</th><th class="num">占比</th></tr></thead>
              <tbody>
                <tr><td>变动制造</td><td>水电煤</td><td class="num">3.20</td><td class="num">3.7%</td></tr>
                <tr class="alt"><td>销售费用</td><td>渠道费</td><td class="num">5.00</td><td class="num">5.7%</td></tr>
                <tr><td>固定制造</td><td>资产摊销</td><td class="num">4.50</td><td class="num">5.1%</td></tr>
                <tr class="alt"><td>管理费用</td><td>管理工资</td><td class="num">3.80</td><td class="num">4.3%</td></tr>
                <tr><td>财务费用</td><td>银行利息</td><td class="num">2.20</td><td class="num">2.5%</td></tr>
                <tr class="alt"><td>总部分摊</td><td>行政分摊</td><td class="num">1.50</td><td class="num">1.7%</td></tr>
              </tbody>
            </table>
          </div>
          <aside class="side-card">
            <h4>费用构成</h4>
            <div class="expense-ring"></div>
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
    </main>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const STYLE_ID = 'cost-card-report-inline-style'

const STYLE_TEXT = `
:root {
  --primary: #1e3a5f;
  --primary-light: #2a5285;
  --accent: #f59e0b;
  --blue: #3b82f6;
  --green: #10b981;
  --orange: #f59e0b;
  --dark: #475569;
  --bg-page: #f0f2f5;
  --bg-card: #ffffff;
  --bg-panel: #f7f8fa;
  --border: #e5e7eb;
  --text-main: #1f2937;
  --text-muted: #6b7280;
  --text-faint: #9ca3af;
}
.report-page {
  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-main);
  padding: 16px;
  box-sizing: border-box;
}
.main-wrap {
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}
.panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.soft-bg { background: var(--bg-panel); padding: 16px; }
.panel-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.panel-title-row h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}
.status {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
  font-size: 12px;
}
.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.product-form-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.field { display: grid; gap: 4px; }
.field.wide { grid-column: span 2; }
.field label {
  font-size: 12px;
  color: var(--text-faint);
}
.field input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 13px;
  color: var(--text-main);
  background: var(--bg-card);
}
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
.summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top-width: 2px;
  border-radius: 8px;
  padding: 14px 10px;
  display: grid;
  gap: 4px;
}
.summary-card span { font-size: 15px; color: var(--text-muted); }
.summary-card b { font-size: 30px; line-height: 1.1; text-align: right; }
.summary-card em {
  font-style: normal;
  font-size: 20px;
  color: var(--text-faint);
  text-align: right;
}
.s-blue { border-top-color: var(--blue); }
.s-green { border-top-color: var(--green); }
.s-orange { border-top-color: var(--orange); }
.s-total { border-top-color: var(--primary); }
.s-blue b { color: var(--blue); }
.s-green b { color: var(--green); }
.s-orange b { color: var(--orange); }
.s-total b { color: var(--primary); text-align: center; }

.quote-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}
.left-stack { display: grid; gap: 12px; }
.inner-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
}
.inner-title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
}
.quote-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}
.profit-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}
.profit-card {
  border: 1px solid var(--border);
  border-top-width: 2px;
  border-radius: 8px;
  padding: 10px;
  display: grid;
  gap: 4px;
  background: var(--bg-card);
}
.profit-card span { font-size: 13px; color: var(--text-muted); }
.profit-card b { font-size: 23px; line-height: 1.1; text-align: right; }
.profit-card em {
  font-style: normal;
  font-size: 15px;
  color: var(--text-muted);
  text-align: right;
}
.p-blue { border-top-color: var(--blue); }
.p-green { border-top-color: var(--green); }
.p-orange { border-top-color: var(--orange); }
.p-dark { border-top-color: var(--dark); }
.p-main { border-top-color: var(--primary); }

.ratio-wrap {
  display: flex;
  gap: 14px;
  align-items: center;
}
.ratio-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: conic-gradient(var(--blue) 0% 45.6%, var(--orange) 45.6% 49.49%, var(--green) 49.49% 61.79%, var(--dark) 61.79% 64.99%, var(--primary) 64.99% 76.79%);
  position: relative;
}
.ratio-ring::after {
  content: '成本占比';
  position: absolute;
  width: 98px;
  height: 96px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-card);
  color: var(--primary);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 16px;
}

.legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.legend li {
  display: grid;
  grid-template-columns: 10px 1fr auto;
  gap: 8px;
  align-items: center;
  font-size: 14px;
}
.legend i {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
}
.legend span { color: var(--text-muted); }
.legend b { color: var(--text-faint); font-weight: 500; }
.c1 { background: var(--blue); }
.c2 { background: var(--orange); }
.c3 { background: var(--green); }
.c4 { background: var(--dark); }
.c5 { background: var(--primary); }
.c6 { background: var(--text-faint); }

.data-panel { padding: 0; }
.section-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px 10px;
}
.section-head h3 {
  margin: 0;
  font-size: 15px;
}
.section-head span {
  font-size: 12px;
  background: rgba(59, 130, 246, 0.1);
  color: var(--blue);
  border-radius: 4px;
  padding: 2px 8px;
}
.data-split {
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.table-wrap { overflow-x: auto; }
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
th {
  background: var(--bg-panel);
  color: var(--text-faint);
  font-weight: 400;
  text-align: left;
  padding: 8px 10px;
  white-space: nowrap;
}
td {
  padding: 8px 10px;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
}
tr.alt { background: var(--bg-panel); }
tr.group { background: var(--bg-panel); font-weight: 600; }
.child { padding-left: 28px; color: var(--text-muted); }
.num { text-align: right; }

.side-card {
  border-left: 1px solid var(--border);
  padding: 12px;
}
.side-card h4 {
  margin: 0 0 8px;
  font-size: 13px;
}
.mini-ring {
  width: 140px;
  height: 140px;
  margin: 0 auto 10px;
  border-radius: 50%;
  background: conic-gradient(var(--orange) 0% 47.5%, var(--blue) 47.5% 74.6%, var(--green) 74.6% 100%);
  position: relative;
}
.mini-ring::after {
  content: '¥8.19';
  position: absolute;
  inset: 25px;
  border-radius: 50%;
  background: var(--bg-card);
  display: grid;
  place-items: center;
  color: var(--primary);
  font-weight: 700;
}
.expense-ring {
  width: 120px;
  height: 120px;
  margin: 0 auto 10px;
  border-radius: 50%;
  background: conic-gradient(var(--orange) 0% 24.8%, var(--blue) 24.8% 47%, var(--green) 47% 65.8%, var(--dark) 65.8% 76.7%, var(--accent) 76.7% 87.6%, var(--text-faint) 87.6% 100%);
  position: relative;
}
.expense-ring::after {
  content: '¥20.20';
  position: absolute;
  inset: 24px;
  border-radius: 50%;
  background: var(--bg-card);
  display: grid;
  place-items: center;
  color: var(--primary);
  font-weight: 700;
  font-size: 14px;
}
.legend.compact li {
  grid-template-columns: 8px 1fr auto;
  font-size: 12px;
}
.legend.compact i {
  width: 8px;
  height: 8px;
}

.bar {
  margin-bottom: 8px;
  display: grid;
  grid-template-columns: 42px 1fr auto;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.bar label { color: var(--text-muted); }
.bar span {
  height: 8px;
  border-radius: 4px;
  background: var(--green);
  display: block;
}
.bar b {
  color: var(--text-main);
  font-weight: 600;
}

@media (max-width: 1280px) {
  .product-layout,
  .quote-layout,
  .data-split {
    grid-template-columns: 1fr;
  }
  .summary-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .profit-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .quote-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .side-card { border-left: 0; border-top: 1px solid var(--border); }
}
@media (max-width: 760px) {
  .product-form-grid,
  .quote-grid,
  .profit-grid,
  .summary-cards {
    grid-template-columns: 1fr;
  }
  .field.wide { grid-column: span 1; }
  .ratio-wrap { flex-direction: column; align-items: flex-start; }
}
`

onMounted(() => {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const styleEl = document.createElement('style')
  styleEl.id = STYLE_ID
  styleEl.textContent = STYLE_TEXT
  document.head.appendChild(styleEl)
})
</script>
