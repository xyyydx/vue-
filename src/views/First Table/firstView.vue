<template>
  <div>
    <!-- 名字搜索 ID搜索 时间搜索 -->
    <el-row style="border: 1px solid #ccc; padding: 15px 20px">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span>名字搜索:</span>
          <el-input
            v-model="input1"
            class="w-50 m-2"
            size="large"
            placeholder="名字搜索"
            style="width: 70%"
            @input="nameIpt"
          />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <span>ID搜索:</span>
          <el-input
            v-model="input2"
            class="w-50 m-2"
            size="large"
            placeholder="Please Input"
            style="width: 70%"
            @input="idIpt"
          />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              start-placeholder="Start Date"
              end-placeholder="End Date"
              :default-time="defaultTime"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 筛选数据的button -->
    <el-row>
      <el-col
        :span="24"
        style="border: 1px solid #ccc; padding: 15px 20px; margin: 10px 0"
      >
        <div class="grid-content bg-purple-dark">
          <el-button
            v-for="(item, index) in allType"
            :key="index"
            @click="handleClick(item, index)"
            :type="btnIndex === index ? 'primary' : 'success'"
            :disabled="btnIndex === index ? true : false"
          >
            {{ item }}
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 批量删除按钮 -->
    <el-row class="mb-4" style="margin: 10px 0">
      <el-button type="danger" v-show="selectData.length" @click="alertBtn"
        >Danger</el-button
      >
    </el-row>
    <!-- 确认弹窗 -->
    <CenterDialogVisible :alerts="alerts" @no="no" @sure="sure" />
    <!-- 编辑弹窗 -->
    <EditAlert
      :edit="edit"
      :dialogFormVisible="dialogFormVisible"
      @editNo="editNo"
      @editSure="editSure"
    />
    <!-- 数据 -->
    <el-table
      :data="dataList"
      style="width: 100%"
      @selection-change="checkChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="Date" width="300px" />
      <el-table-column prop="time" label="时间" width="300px" />
      <el-table-column prop="name" label="Address" width="300px" />
      <el-table-column prop="price" label="price" />
      <el-table-column prop="pay" label="支付方式" />
      <el-table-column prop="state" label="订单状态" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            size="small"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
// 引入组件
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
// 请求
import axios from "axios";
import { ElMessage } from "element-plus";
// 弹窗
import CenterDialogVisible from "./Aleft";
import EditAlert from "./editAlert.vue";

import { debounce } from "lodash";
// ##############################数据#######################################
// 数据
const dataList = ref([]);
// 筛选条件[全部订单]
const allType = ref([
  "全部订单",
  "待付款",
  "代发货",
  "已发货",
  "已完成",
  "已关闭",
]);
// 默认的渲染的数据
const allTypeInit = ref("全部订单");
// 筛选按钮默认
const btnIndex = ref(0);
// 名字module
const input1 = ref("");
// id   Module
const input2 = ref("");
// 时间module
const value1 = ref("");
// 时间默认值
const defaultTime = [
  new Date(2000, 1, 1, 12, 0, 0),
  new Date(2000, 2, 1, 8, 0, 0),
];
// 多选的数据
const selectData = ref([]);
// 编辑弹窗得开关
const dialogFormVisible = ref(false);
// 编辑得数据
let edit = reactive({
  name: "",
  price: "",
  pay: "",
  state: "",
});
// 单个删除得数据
const OnwDelete = ref("");
// 弹窗得开关
const alerts = ref(false);

// ################################方法####################################

// 获取后端数据(id)
const getData = async (
  id = null,
  value = null,
  type,
  ownId = null,
  assign = null,
  time = null
) => {
  const res = await axios.post("/api/data", {
    id: id,
    value: value,
    allTypeInit: type,
    ownId: ownId,
    edit: assign,
  });
  if (id && value) {
    dataList.value = res.data.data;
    // 获取到数据之后把单个删除数据清空
    OnwDelete.value = "";
    return;
  }
  ElMessage("成功获取数据");
  dataList.value = res.data.data;
  // 获取到数据之后把单个删除数据清空
  OnwDelete.value = "";
};
// 名字搜索
const nameIpt = debounce((e: string | null | undefined) => {
  console.log(e);
  if (e === "") {
    getData(null, null, allTypeInit.value, null, null);
    return;
  }
  getData(1, e, null, null, null);
}, 580);
//id搜索
const idIpt = debounce((e: string | null | undefined) => {
  if (e === "") {
    getData(null, null, allTypeInit.value, null, null);
    return;
  }
  getData(2, e, null, null, null);
}, 580);
// 筛选按钮
const handleClick = debounce((item: string, index: number) => {
  btnIndex.value = index;
  allTypeInit.value = item;
  getData(null, null, allTypeInit.value, null, null);
}, 580);
// 单个数据删除
const handleDelete = (index: number, row: any) => {
  OnwDelete.value = row.id;
  alerts.value = true;
};
// 编辑
const handleEdit = (index: number, row: any) => {
  // console.log(index, row);
  edit.value = {
    id: row.id,
    name: row.name,
    price: row.price,
    pay: row.pay,
    state: row.state,
  };
  // console.log(edit);
  dialogFormVisible.value = true;
};
// 编辑弹窗得取消按钮
const editNo = () => {
  dialogFormVisible.value = false;
};
// 编辑弹窗得确认按钮
const editSure = (value) => {
  console.log(value);
  dialogFormVisible.value = false;
  const data = edit.value;
  console.log(edit.value.id);
  getData(null, null, null, null, edit.value);
};
// 多选改变
const checkChange = (selection: any, row: any) => {
  selectData.value = selection.map((item) => {
    return item.id;
  });
};
// 批量删除
const alertBtn = () => {
  alerts.value = true;
};
// 弹窗取消
const no = () => {
  alerts.value = false;
};
// 弹窗确认
const sure = () => {
  if (OnwDelete.value) {
    console.log(OnwDelete.value);
    getData(null, null, null, OnwDelete.value, null);
    alerts.value = false;
  } else {
    console.log(111);
    const newData = dataList.value.filter((item) => {
      return !selectData.value.includes(item.id);
    });
    dataList.value = newData;
    alerts.value = false;
  }
};
// ######################初始化数据##########################
onMounted(() => {
  getData(null, null, allTypeInit.value, null, null);
  document.documentElement.style.background = "white";
});
</script>
<style lang="scss" scoped>
.grid-content {
  display: flex;
  justify-items: center;
  font-size: 14px;

  span {
    display: flex;
    justify-items: center;
    line-height: 40px;
  }
}

.el-input__wrapper {
  margin-left: 5px;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>