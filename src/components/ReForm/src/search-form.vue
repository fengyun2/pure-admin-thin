<template>
  <div class="re-search-form">
    <re-form v-bind="formOptions" ref="formRef" v-model="formValues">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <el-button plain size="small" type="danger" @click="handleClear"
          >重置</el-button
        >
        <el-button plain size="small" type="primary" @click="handleSearch"
          >搜索</el-button
        >
      </template>
    </re-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, PropType } from "vue";
// import type { FormInstance } from "element-plus";
import ReForm from "./form.vue";
import { IForm, SearchFormEmits } from "./types";

defineOptions({
  name: "ReSearchForm"
});

const props = defineProps({
  formOptions: {
    type: Object as PropType<IForm>,
    required: true
  }
});

const emit = defineEmits<SearchFormEmits>();

const formRef = ref();

const originFormValues: any = {};
props.formOptions.formItems?.forEach(item => {
  originFormValues[`${item.prop}`] = "";
});
// 定义表单相关的数据。
const formValues = ref(originFormValues);

watch(
  formValues,
  newFormValues => {
    console.warn("watch 【search form】 values change: ", newFormValues);
  },
  { deep: true }
);

// 处理清空按钮
const handleClear = () => {
  // formValues.value = originFormValues
  for (const key in originFormValues) {
    formValues.value[`${key}`] = originFormValues[key];
  }

  // 将事件传入父组件
  emit("clear");
};

// 处理搜索
const handleSearch = () => {
  formRef.value.formRef.validate((valid, fields) => {
    if (valid) {
      console.warn(formValues.value, " search successfully!");
      emit("search", formValues.value);
    } else {
      console.error("handleSearch error: ", fields);
    }
  });
};

defineExpose({ formRef });
</script>
