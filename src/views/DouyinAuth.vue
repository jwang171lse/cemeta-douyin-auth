<template>
  <div class="DouyinAuth flex">
    <div class="DouyinAuth-header p-3 flex items-center">
      <img :src="img" alt="" />
    </div>
    <div class="DouyinAuth-body">
      <div class="DouyinAuth-body-left"></div>
      <div class="DouyinAuth-body-center"></div>
      <div class="DouyinAuth-body-right"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getDouyin } from "@/api/user";
import { ref } from "vue";
const img = ref();
getDouyin().then((res) => {
  console.log(res);
  const url = window.URL.createObjectURL(res as Blob);
  img.value = url;
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
  }
}
</style>
