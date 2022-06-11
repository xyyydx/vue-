<template>
  <div>
    <div id="main" style="width: 1500px; height: 800px"></div>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, onMounted, ref } from "vue";
import * as echarts from "echarts";
import axios from "axios";

const ChartData = ref([]);
const getData = async () => {
  const res = await axios.post("/api/Chart", {
    allTypeInit: "全部订单",
  });
  console.log(res);

  const myChart = echarts.init(document.getElementById("main"));

  myChart.setOption(res.data.option);

  myChart.on("mouseover", function (params) {
    // 控制台打印数据的名称
    document.documentElement.style.background = "#67C23A";
  });
  myChart.on("mouseout", function (params) {
    // 控制台打印数据的名称
    document.documentElement.style.background = "#909399";
  });
};
onMounted(() => {
  getData();
});
</script>