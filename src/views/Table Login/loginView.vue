<template>
  <div class="banner">
    <div class="block">
      <el-carousel style="width: 100%; height: 100%">
        <el-carousel-item
          v-for="item in imgList"
          :key="item"
          style="width: 100vw; height: 100vh"
        >
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="username" prop="user">
          <el-input v-model="ruleForm.user" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :plain="true"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >Submit</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import img1 from "@/assets/1.jpeg";
import img2 from "@/assets/2.jpeg";
import img3 from "@/assets/3.jpeg";
import img4 from "@/assets/4.jpeg";
import img5 from "@/assets/5.jpeg";
import img6 from "@/assets/6.jpeg";
import { debounce } from "lodash";
const imgList = [img1, img2, img3, img4, img5, img6];

import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const store = useStore();

const validateUser = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("Please input the username"));
  } else {
    if (ruleForm.user !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkUser", () => null);
    }
    callback();
  }
};
const validatePass = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  user: "",
  pass: "",
  checkPass: "",
});

const rules = reactive({
  user: [{ validator: validateUser, trigger: "blur" }],
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      axios
        .post("/api/login", {
          user: ruleForm.user,
          pass: ruleForm.pass,
        })
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res);
            store.commit("SET_USER_TOKEN", {
              isLogin: true,
              token: res.data.token,
              user: ruleForm.user,
            });
            ElMessage({
              message: "登陆成功",
              type: "success",
            });
            router.push("/home");
          } else {
            ElMessage.error(res.data.message);
          }
        });
    } else {
      return false;
    }
  });
};
const debounces = (fn, delay = 500) => {
  //timer 是闭包中的
  let timer: any = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.dir(arguments);
      fn.apply(null, arguments);
    }, delay);
  };
};
const resetForm = debounces((formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
}, 2000);
</script>
<style scoped>
.banner {
  width: 100%;
  height: 100%;
}
.block {
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__container {
  height: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__arrow {
  display: none;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__indicator {
  display: none;
}
.el-form {
  position: absolute;
  width: 400px;
  height: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  /* align-items: center; */
}
.el-form-item {
  display: flex;
  align-items: center;
}
#el-id-989-1 {
  color: white;
}
</style>