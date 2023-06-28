<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ref, unref, onMounted, nextTick } from "vue";

defineOptions({
  name: "FrameView"
});

const { t } = useI18n();
const loading = ref(true);
const currentRoute = useRoute();
const frameSrc = ref<string>("");
const frameRef = ref<HTMLElement | null>(null);

if (unref(currentRoute.meta)?.frameSrc) {
  frameSrc.value = unref(currentRoute.meta)?.frameSrc as string;
}
unref(currentRoute.meta)?.frameLoading === false && hideLoading();

function hideLoading() {
  loading.value = false;
}

function iframeOnLoad() {
  console.warn("iframeOnLoad =======>");
  hideLoading();

  const iframe = unref(frameRef);
  if (!iframe) return;
  const _frame = iframe as any;

  if (_frame && _frame.contentWindow) {
    // otherWindow.postMessage(message, targetOrigin, [transfer]);
    console.warn(_frame.contentWindow, " _frame.contentWindow =====>");
    // 在iframe加载完成后，主页面发送数据
    const params = {
      id: "mainFrame",
      data: {
        user: "刘亦菲",
        age: 16
      }
    };
    _frame.contentWindow.postMessage(JSON.stringify(params), "*");
    // 主页面接收参数
    window.addEventListener("message", (e: any) => {
      try {
        const data = JSON.parse(e.data);
        console.warn(data, " 主页面接收参数");
      } catch (error) {
        console.error(error);
      }
    });

    // // iframe页面向主页面发送数据
    // window.parent?.postMessage(
    //   JSON.stringify({
    //     from: "qq",
    //     event: "close",
    //     code: 0
    //   }),
    //   "*"
    // );
    // // iframe页面接收主页面传递过来的数据
    // window.addEventListener("message", (event: any) => {
    //   try {
    //     const data = JSON.parse(event.data);
    //     console.warn(data, " iframe页面接收参数");
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });
  }
}

function init() {
  nextTick(() => {
    const iframe = unref(frameRef);
    if (!iframe) return;
    const _frame = iframe as any;
    if (_frame.attachEvent) {
      _frame.attachEvent("onload", () => {
        iframeOnLoad();
      });
    } else {
      iframe.onload = () => {
        iframeOnLoad();
      };
    }
  });
}

onMounted(() => {
  init();
});
</script>

<template>
  <div
    class="frame"
    v-loading="loading"
    :element-loading-text="t('status.hsLoad')"
  >
    <iframe :src="frameSrc" class="frame-iframe" ref="frameRef" />
  </div>
</template>

<style lang="scss" scoped>
.frame {
  z-index: 998;
  height: calc(100vh - 88px);

  .frame-iframe {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}

.main-content {
  margin: 2px 0 0 !important;
}
</style>
