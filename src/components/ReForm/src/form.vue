<template>
  <div class="re-form">
    <div class="form-header">
      <slot name="header" />
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="formItem in formItems" :key="formItem.field">
          <el-col v-bind="colLayout">
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
import { PropType, ref, watch } from "vue";
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
// 这里取出表单数据的拷贝，如果修改表单数据的时候，即清空数据，由于这里的代码只能执行一次，所以不能被清除。我们可以使用watch来监听，然后当表单数据清空后，我们就可以重新拷贝了。
const formValues = ref({ ...props.modelValue });

watch(
  formValues,
  newFormValues => {
    emit("update:value", newFormValues);
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.re-form {
  padding: 20px 10px;

  .form-header {
    text-align: center;
  }

  .form-footer {
    text-align: right;
  }
}
</style>
