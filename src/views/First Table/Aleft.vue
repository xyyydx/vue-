<template>
  <el-dialog v-model="alerts" title="Warning" width="20%" center>
    <span style="display: inline-block; width: 100%; text-align: center"
      >你确定要删除吗
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('no')">取消<slot name="sss"></slot></el-button>
        <el-button @click="$emit('sure')" type="primary">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { toRef } from "@vue/reactivity";
import { defineProps } from "vue";
export default {
  props: {
    alerts: Boolean,
  },
  setup(props) {
    console.log(props.alerts);
    const { alerts } = toRef(props);
    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>