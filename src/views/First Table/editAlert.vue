<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="edit.value.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Promotion price" :label-width="formLabelWidth">
        <el-input v-model="edit.value.price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="edit.value.pay" placeholder="Please select a zone">
          <el-option label="微信" value="微信" />
          <el-option label="支付宝" value="支付宝" />
        </el-select>
      </el-form-item>
      <el-form-item label="Promotion type" :label-width="formLabelWidth">
        <el-select
          v-model="edit.value.state"
          placeholder="Please select a zone"
        >
          <el-option label="待付款" value="待付款" />
          <el-option label="代发货" value="代发货" />
          <el-option label="已发货" value="已发货" />
          <el-option label="已完成" value="已完成" />
          <el-option label="已关闭" value="已关闭" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editNo">Cancel</el-button>
        <el-button type="primary" @click="editSure">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { toRef, ref, onMounted, defineEmits, defineProps } from "vue";
const props = defineProps(["edit", "dialogFormVisible"]);
const emits = defineEmits(["editNo", "editSure"]);
const editNo = () => {
  emits("editNo");
};
const editSure = () => {
  emits("editSure", "1111");
};
const formLabelWidth = ref("140px");
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>