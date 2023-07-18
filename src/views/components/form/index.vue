<template>
  <div class="test">
    <re-form
      v-bind="formOptions"
      v-model="formValues"
      @reset="reset"
      @search="search"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import formOptions from "./formConfig";
import { ReForm } from "@/components/ReForm";
defineOptions({
  name: "ComponentsForm"
});

const formValues = reactive({
  createdBy: "刘德华"
});

const reset = () => {
  console.log("重置了吗？");
  Object.keys(formValues).forEach(key => {
    if (Array.isArray(formValues[key])) {
      formValues[key] = [];
    } else if (typeof formValues[key] === "number") {
      formValues[key] = 0;
    } else {
      formValues[key] = "";
    }
  });
};

const search = () => {
  console.log("搜索", formValues);
};

watch(
  formValues,
  newFormValues => {
    console.warn("父级formValues: ", newFormValues);
  },
  { deep: true }
);
</script>
