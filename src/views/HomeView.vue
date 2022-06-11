<template>
  <div class="common-layout">
    <el-container>
      <!-- Header -->
      <el-header style="background: #213d5b">
        <el-page-header :icon="ArrowLeft" content="detail" />
      </el-header>
      <el-container>
        <!-- Left -->
        <el-aside width="200px" style="{height= 100vh,background: #CFD3DC}">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            style="height: 100vh; background: #cfd3dc; color: white"
            router
          >
            <el-menu-item index="/home/first">
              <el-icon>
                <Location />
              </el-icon>
              <span>Table</span>
            </el-menu-item>
            <el-menu-item index="/home/ECharts">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>ECharts</span>
            </el-menu-item>
            <el-menu-item index="/home/dream">
              <el-icon>
                <document />
              </el-icon>
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="/home/dream">
              <el-icon>
                <setting />
              </el-icon>
              <span>Navigator Four</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- Main -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
// 组件
import { ArrowLeft } from "@element-plus/icons-vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
// 数据和方法
const router = useRouter();
const route = useRoute();
</script>
<style lang="scss" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
}

.el-container {
  width: 100vw;
  height: 100vh;
}

.el-header {
  display: flex;
  align-items: center;
  color: white;

  .el-page-header__content {
    color: white;
  }
}
</style>