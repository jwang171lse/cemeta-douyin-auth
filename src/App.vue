<template>
  <div class="DouyinAuth flex">
    <div class="DouyinAuth-header p-3 flex items-center">
      <img :src="logo" alt="" />
    </div>
    <div class="DouyinAuth-body">
      <div class="DouyinAuth-body-left">
        <h3 style="font-weight: 600; font-size: 16px">快捷安全登录</h3>
        <p>使用 <span style="color: red">抖音APP</span></p>
        <p>打开「首页 - 扫一扫」</p>
        <img :src="img" alt="" />
      </div>
      <div class="DouyinAuth-body-center"></div>
      <div class="DouyinAuth-body-right">
        <h1 style="font-weight: 600; font-size: 13px">
          全民营销助手 <span style="color: #ccc">将获得以下权限</span>
        </h1>
        <ul>
          <li>获取你的抖音头像、昵称</li>
          <li>
            <p>为提升帐号安全，是否允许将</p>
            <p>你在抖音绑定的手机号，绑定至</p>
            <p>全民营销助手,并使用相关服务？</p>
          </li>
          <li>获取公开视频列表能力</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getDouyin } from "@/api/user";
import { ref } from "vue";
const logo = ref(
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODYiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBkPSJNMTIuMzgyIDE0LjE3MnYtMS40MDZhMTAuOTAzIDEwLjkwMyAwIDAgMC03LjcyNCAxOS43NCAxMC45MDEgMTAuOTAxIDAgMCAxIDcuNzI0LTE4LjMzNFoiIGZpbGw9IiMwMEZBRjAiLz48cGF0aCBkPSJNMTIuNjM4IDMwLjA2YTQuOTg3IDQuOTg3IDAgMCAwIDQuOTc1LTQuNzk2VjEuNTA0aDQuMzQxYy0uMDkzLS40OTUtLjE0LTEtLjE0LTEuNTA0SDE1Ljg4djIzLjc1OWE0Ljk3NSA0Ljk3NSAwIDAgMS03LjI4NyA0LjIyNCA0Ljk4MyA0Ljk4MyAwIDAgMCA0LjA0NiAyLjA3OFpNMzAuMDcgOS41N1Y4LjI1MmE4LjIgOC4yIDAgMCAxLTQuNDkxLTEuMzM2QTguMjY2IDguMjY2IDAgMCAwIDMwLjA3IDkuNTdaIiBmaWxsPSIjMDBGQUYwIi8+PHBhdGggZD0iTTI1LjU3OSA2LjkxMmE4LjIxMSA4LjIxMSAwIDAgMS0yLjAyOS01LjQwN2gtMS41ODdhOC4yNjggOC4yNjggMCAwIDAgMy42MTYgNS40MDdaTTEwLjkxIDE4LjU5YTQuOTgxIDQuOTgxIDAgMCAwLTIuMzE4IDkuMzkzIDQuOTY4IDQuOTY4IDAgMCAxIDUuNTEtNy42NXYtNi4wNjFhMTAuODcgMTAuODcgMCAwIDAtMS40Ny0uMTA2aC0uMjU3djQuNjQ4YTQuOSA0LjkgMCAwIDAtMS40NjQtLjIyNVoiIGZpbGw9IiNGRjAwNTAiLz48cGF0aCBkPSJNMzAuMDcgOS41N3Y0LjYxNmExNC4xMDQgMTQuMTA0IDAgMCAxLTguMjQ3LTIuNjUxdjEyLjA0OGExMC45MDQgMTAuOTA0IDAgMCAxLTE3LjE3IDguOTM0IDEwLjkwNCAxMC45MDQgMCAwIDAgMTguODkzLTcuNDNWMTMuMDNhMTQuMTA2IDE0LjEwNiAwIDAgMCA4LjI1IDIuNjUyVjkuNzQ2YTguMjk4IDguMjk4IDAgMCAxLTEuNzI2LS4xNzZaIiBmaWxsPSIjRkYwMDUwIi8+PHBhdGggZD0iTTIxLjgyMyAyMy41NzJWMTEuNTI0YTE0LjEwMyAxNC4xMDMgMCAwIDAgOC4yNDcgMi42NjNWOS41N2E4LjI2NiA4LjI2NiAwIDAgMS00LjQ5MS0yLjY1OCA4LjI2NyA4LjI2NyAwIDAgMS0zLjYxNi01LjQwN2gtNC4zNDF2MjMuNzU5YTQuOTc1IDQuOTc1IDAgMCAxLTkuMDMgMi43MiA0Ljk4MSA0Ljk4MSAwIDAgMSAyLjMxMy05LjM5NWMuNDk5LjAwMi45OTUuMDggMS40Ny4yMzF2LTQuNjQ4YTEwLjkgMTAuOSAwIDAgMC03LjcyMyAxOC4zMzUgMTAuOTAzIDEwLjkwMyAwIDAgMCAxNy4xNjktOC45MzVoLjAwMloiIGZpbGw9IiNmZmYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQzLjIzMiA3LjExNGgtMi41MTV2My43MDhoLTIuOTIydjIuNTE0aDIuOTIydjUuMTM2bC0yLjkyMi40MzR2Mi42NjRsMi45MjItLjQzN3Y0LjQwNmEuNjM3LjYzNyAwIDAgMS0uNjM2LjYzNmgtMi4xMDV2Mi41MDRoMy4xNTdhMi4xMiAyLjEyIDAgMCAwIDIuMTEtMi4xMXYtNS44MTJsMi41NTQtLjM4di0yLjY2MmwtMi41NTUuMzgxdi00Ljc2aDIuNTU1di0yLjUxNGgtMi41NjVWNy4xMTRabTE0LjI5MiAwaC0yLjUxMnYxMy4xODFsLTguMjk1LjcxdjIuNjY0bDguMjk1LS43MTN2NS45M2gyLjUxMlYyMi43M2wyLjU0Ny0uMjN2LTIuNjY0bC0yLjU0Ny4yMzFWNy4xMTRabS05Ljc3IDEuODcyIDUuOTU2IDEuMDYydjIuNjYzbC01Ljk1Ni0xLjA2NXYtMi42NlptNS45NTYgNi41OTItNS45NTYtMS4wNjN2Mi42NjFsNS45NTYgMS4wNjV2LTIuNjYzWm0yNy4yMjItMy4xNTctLjM5NiAyLjA0NGg0LjkzOHYyLjQ2NWgtMjIuMjV2LTIuNDY1aDUuMDMzbC0uMzE2LTIuMDQ0aDIuNjYzbC4zMTYgMi4wNDRoNi45NTVsLjM5NC0yLjA0NGgyLjY2M1ptMy44MzgtMy41NjNoLTguNDM0bC0uNDI1LTEuNzQ0aC0zLjI3NWwuNDI2IDEuNzQ0aC05LjEzNnYyLjQ0N0g4NC43N1Y4Ljg1OFptLTE3LjQxOCA5Ljg4N2gxMy45OTRhMi4xMiAyLjEyIDAgMCAxIDIuMTIgMi4xMXY1Ljc2NWEyLjEyIDIuMTIgMCAwIDEtMi4xMiAyLjExSDY3LjM1MmEyLjEyIDIuMTIgMCAwIDEtMi4xMi0yLjExdi01Ljc1NGEyLjEyIDIuMTIgMCAwIDEgMi4xMi0yLjEyWm0xMy4xMDUgMi4yNzNINjguMjM4YS42MzYuNjM2IDAgMCAwLS42MzIuNjM2djEuMDI3aDEzLjQ4N3YtMS4wMjdhLjYzNi42MzYgMCAwIDAtLjYzNi0uNjM2Wm0tMTIuMjE5IDUuNDM5aDEyLjIyYS42MzcuNjM3IDAgMCAwIC42MzEtLjYzNlYyNC43OEg2Ny42MDJ2MS4wNGEuNjM2LjYzNiAwIDAgMCAuNjM2LjYzN1oiIGZpbGw9IiNmZmYiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDg1LjQ3NHYzNkgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg=="
);
const img = ref();
getDouyin().then((res) => {
  const url = window.URL.createObjectURL(res as Blob);
  img.value = url;
  console.log(url);
});
</script>
<style scoped lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
}
.DouyinAuth {
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  &-header {
    height: 8%;
    background: #000;
  }
  &-body {
    height: 35%;
    margin-top: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(22, 24, 35, 0.12);
    border-radius: 12px;
    background: radial-gradient(
        16.94% 22.31% at 92.06% 92.63%,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      radial-gradient(
        63% 56.89% at 78.19% -21.62%,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(247, 252, 252, 0.8) 34.14%,
        rgba(255, 255, 255, 0) 100%
      ),
      radial-gradient(
        38.69% 102.05% at 36.88% 102.05%,
        #f6fdfa 0%,
        #fff 29.12%,
        rgba(255, 255, 255, 0) 100%
      ),
      url(https://lf-cdn-tos.bytescm.com/obj/static/ies/tiktok_open_h5/connect/image/auth_bg.f185ff8f.png),
      linear-gradient(
        180deg,
        rgba(253, 219, 234, 0.2) 0%,
        rgba(190, 253, 254, 0.2) 100%
      );
    &-center {
      width: 1px;
      height: 80%;
      border: 1px solid #ece7e7;
    }
    &-left {
      font-size: 12px;
      width: 49%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      h3 {
        margin-bottom: 5px;
      }
      img {
        padding: 10px;
        width: 80%;
        max-width: 300px;
      }
    }
    &-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      width: 49%;
      height: 70%;
      font-size: 12px;
      ul {
        li {
          list-style-type: disc;
          margin: 8px 0;
        }
      }
    }
  }
}
</style>
