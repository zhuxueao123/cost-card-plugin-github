<template>
  <section class="page-wrap">
    <header class="hero">
      <div>
        <h1>电子成本卡报表看板</h1>
        <p>演示页：用于客户展示成本结构与利润概览，数据可先使用静态样例。</p>
      </div>
      <div class="tag">DEMO</div>
    </header>

    <section class="kpi-grid">
      <article class="kpi kpi-blue">
        <h3>材料成本</h3>
        <div class="value">¥45.60</div>
        <p>占比 52.2%</p>
      </article>
      <article class="kpi kpi-green">
        <h3>人工成本</h3>
        <div class="value">¥12.30</div>
        <p>占比 14.1%</p>
      </article>
      <article class="kpi kpi-orange">
        <h3>费用成本</h3>
        <div class="value">¥15.00</div>
        <p>占比 17.2%</p>
      </article>
      <article class="kpi kpi-deep">
        <h3>总成本</h3>
        <div class="value">¥87.40</div>
        <p>成本卡版本 1.0</p>
      </article>
    </section>

    <section class="panel-grid">
      <article class="panel">
        <div class="panel-head">
          <h2>成本占比</h2>
        </div>
        <div class="ring-wrap">
          <div class="ring"></div>
          <ul>
            <li><span class="dot d1"></span>原辅料 45.60%</li>
            <li><span class="dot d2"></span>包材 3.89%</li>
            <li><span class="dot d3"></span>直接人工 12.30%</li>
            <li><span class="dot d4"></span>固定费用 11.80%</li>
          </ul>
        </div>
      </article>

      <article class="panel">
        <div class="panel-head">
          <h2>利润摘要</h2>
        </div>
        <table>
          <tbody>
            <tr><td>边际贡献</td><td>¥51.20</td><td>51.20%</td></tr>
            <tr><td>毛利额</td><td>¥50.51</td><td>50.51%</td></tr>
            <tr><td>税前利润</td><td>¥35.51</td><td>35.51%</td></tr>
            <tr><td>所得税</td><td>¥4.62</td><td>4.62%</td></tr>
            <tr><td>净利润</td><td>¥30.89</td><td>30.89%</td></tr>
          </tbody>
        </table>
      </article>
    </section>

    <section class="panel">
      <div class="panel-head">
        <h2>费用构成</h2>
      </div>
      <div class="bars">
        <div class="bar-item"><label>销售费用</label><div class="bar"><span style="width: 24.8%"></span></div><b>¥5.00</b></div>
        <div class="bar-item"><label>固定制造</label><div class="bar"><span style="width: 22.3%"></span></div><b>¥4.50</b></div>
        <div class="bar-item"><label>管理费用</label><div class="bar"><span style="width: 18.8%"></span></div><b>¥3.80</b></div>
        <div class="bar-item"><label>变动制造</label><div class="bar"><span style="width: 15.8%"></span></div><b>¥3.20</b></div>
      </div>
    </section>
  </section>
</template>

<script setup>
</script>

<style scoped>
.page-wrap {
  padding: 20px;
  display: grid;
  gap: 16px;
  background: linear-gradient(180deg, #f4f7fb 0%, #edf2f8 100%);
  min-height: 100vh;
  color: #182230;
}
.hero {
  background: linear-gradient(135deg, #15324d 0%, #244c73 100%);
  color: #fff;
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hero h1 {
  margin: 0 0 6px;
  font-size: 24px;
}
.hero p {
  margin: 0;
  opacity: 0.9;
}
.tag {
  background: #f59e0b;
  color: #17202a;
  font-weight: 700;
  border-radius: 999px;
  padding: 6px 10px;
}
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(160px, 1fr));
  gap: 12px;
}
.kpi {
  border-radius: 10px;
  background: #fff;
  border: 1px solid #dce3ec;
  padding: 14px;
  box-shadow: 0 3px 10px rgba(16, 24, 40, 0.06);
}
.kpi h3 {
  margin: 0;
  font-size: 13px;
  color: #5b6878;
}
.kpi .value {
  margin-top: 8px;
  font-size: 30px;
  line-height: 1.1;
  font-weight: 700;
}
.kpi p {
  margin: 6px 0 0;
  color: #6a7788;
}
.kpi-blue { border-top: 4px solid #3b82f6; }
.kpi-green { border-top: 4px solid #10b981; }
.kpi-orange { border-top: 4px solid #f59e0b; }
.kpi-deep { border-top: 4px solid #1e3a5f; }
.panel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.panel {
  background: #fff;
  border: 1px solid #dce3ec;
  border-radius: 10px;
  padding: 14px;
}
.panel-head h2 {
  margin: 0 0 10px;
  font-size: 15px;
}
.ring-wrap {
  display: flex;
  gap: 16px;
  align-items: center;
}
.ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(#3b82f6 0% 45.6%, #f59e0b 45.6% 49.49%, #10b981 49.49% 61.79%, #64748b 61.79% 73.59%, #1e3a5f 73.59% 100%);
  position: relative;
}
.ring::after {
  content: "100%";
  position: absolute;
  inset: 24px;
  border-radius: 50%;
  background: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #244c73;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 8px;
}
.d1 { background: #3b82f6; }
.d2 { background: #f59e0b; }
.d3 { background: #10b981; }
.d4 { background: #64748b; }
table {
  width: 100%;
  border-collapse: collapse;
}
td {
  padding: 8px;
  border-bottom: 1px solid #edf2f7;
}
td:nth-child(2), td:nth-child(3) {
  text-align: right;
}
.bars {
  display: grid;
  gap: 10px;
}
.bar-item {
  display: grid;
  grid-template-columns: 90px 1fr 56px;
  align-items: center;
  gap: 10px;
}
.bar-item label {
  color: #5b6878;
  font-size: 13px;
}
.bar {
  height: 9px;
  border-radius: 999px;
  background: #edf2f7;
  overflow: hidden;
}
.bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}
.bar-item b {
  text-align: right;
  font-size: 13px;
}
@media (max-width: 1100px) {
  .kpi-grid { grid-template-columns: repeat(2, minmax(160px, 1fr)); }
  .panel-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .hero { flex-direction: column; align-items: flex-start; gap: 10px; }
  .kpi-grid { grid-template-columns: 1fr; }
  .bar-item { grid-template-columns: 80px 1fr 52px; }
}
</style>
