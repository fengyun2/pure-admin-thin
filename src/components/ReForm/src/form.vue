<template>
  <div class="re-form">
    <div class="form-header">
      <slot name="header" />
    </div>
    <el-form
      ref="formRef"
      :model="formValues"
      :rules="rules"
      :label-width="labelWidth"
    >
      <el-row>
        <template v-for="(formItem, index) in formItems" :key="formItem.field">
          <el-col
            v-bind="colLayout"
            :class="{ search: hasSearchBtn && index === formItems.length - 1 }"
          >
            <!-- 通过条件判断来渲染不同的表单 -->
            <el-form-item
              :label="formItem.label"
              :prop="formItem.prop"
              :rules="formItem.rules"
              :style="formItem.style || itemStyle"
              v-if="!formItem.isHidden"
            >
              <!-- 渲染普通input和password -->
              <template
                v-if="formItem.type === 'input' || formItem.type === 'password'"
              >
                <el-input
                  v-bind="formItem.attrs"
                  v-model="formValues[`${formItem.prop}`]"
                  :type="formItem.type"
                />
              </template>
              <!-- 渲染select表单 -->
              <template v-if="formItem.type === 'select'">
                <el-select
                  :style="{
                    width: '100%'
                  }"
                  v-bind="formItem.attrs"
                  v-model="formValues[`${formItem.prop}`]"
                >
                  <el-option
                    v-for="item in formItem.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
              <!-- 渲染checkbox表单 -->
              <!-- 渲染date表单 -->
              <template v-if="formItem.type === 'date'">
                <el-date-picker
                  :style="{
                    width: '100%'
                  }"
                  v-bind="formItem.attrs"
                  v-model="formValues[`${formItem.prop}`]"
                />
              </template>
              <!-- 渲染textarea表单 -->
              <template v-if="formItem.type === 'textarea'">
                <el-input
                  v-bind="formItem.attrs"
                  v-model="formValues[`${formItem.prop}`]"
                  :type="formItem.type"
                />
              </template>
              <!-- 渲染radio表单 -->
              <template v-if="formItem.search">
                <el-button @click="handleReset">重置</el-button>
                <el-button type="primary" @click="handleSearch">查询</el-button>
                <el-button text
                  >更多
                  <IconifyIconOffline :icon="ArrowDown" class="dark:text-white"
                /></el-button>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="form-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref, computed } from "vue";
import type { FormInstance } from "element-plus";
import ArrowDown from "@iconify-icons/ri/arrow-down-s-line";
import { IFormItem, Emits } from "./types";

defineOptions({
  name: "ReForm"
});

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  labelWidth: { type: String, default: "100px" },
  itemStyle: { type: Object, default: () => ({ padding: "0" }) },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
});
const emit = defineEmits<Emits>();
const formRef = ref<FormInstance>();
// TODO: 这里解构有坑，导致无法emit('update:modelValue')，改为computed这里取出表单数据的拷贝，如果修改表单数据的时候，即清空数据，由于这里的代码只能执行一次，所以不能被清除。我们可以使用watch来监听，然后当表单数据清空后，我们就可以重新拷贝了。
// const formValues = ref({ ...props.modelValue });

const formValues = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});

const hasSearchBtn = computed(() => props.formItems?.some(item => item.search));

// watch(
//   formValues,
//   newFormValues => {
//     // console.warn("watch form values change: ", newFormValues);
//     emit("update:modelValue", newFormValues);
//   },
//   { deep: true }
// );

const handleReset = () => {
  // 将事件传入父组件
  emit("reset");
};

// 处理搜索
const handleSearch = () => {
  formRef.value.validate((valid, fields) => {
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
<style lang="scss" scoped>
.re-form {
  padding: 20px 10px;

  .search {
    margin-left: auto;
  }

  .form-header {
    text-align: center;
  }

  .form-footer {
    text-align: right;
  }
}
</style>
