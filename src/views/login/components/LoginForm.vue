<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">Cemeta</div>
    <div class="login-form-sub-title">OPS系统</div>
    <div class="login-form-error-msg">{{}}</div>
    <a-form
      :model="formModel"
      ref="loginForm"
      class="login-form"
      layout="vertical"
      :loading="loading"
    >
      <a-form-item field="account" hide-label>
        <a-input
          allow-clear
          v-model="formModel.account"
          placeholder="请输入账号"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" hide-label>
        <a-input-password
          allow-clear
          v-model="formModel.password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button
          type="primary"
          :html-type="'submit'"
          :disabled="!formModel.account || !formModel.password"
          long
          :loading="loading"
          @click="login"
        >
          登录
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { apiLogin } from "@/api/user";
import { useRouter } from "vue-router";
import { setUserInfo } from "@/util/user";
const router = useRouter();
let loading = ref(false);

let formModel = reactive({
  account: "",
  password: "",
});

async function login() {
  loading.value = true;
  let userInfo = await apiLogin(formModel).finally(() => {
    loading.value = false;
  });
  setUserInfo(userInfo);
  router.push({
    name: "homeIndex",
  });
}
</script>

<style lang="scss" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
