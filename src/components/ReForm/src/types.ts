// https://juejin.cn/post/7032109872577511454

type IFormType =
  | "input"
  | "password"
  | "textarea"
  | "select"
  | "datepicker"
  | "date";
export interface IFormItem {
  // 来获取对应表单项的数据,我们会将表单全部数据，通过Object传递，所以需要他动态获取。
  prop?: string;
  // formitem的选项，表单类型
  type?: IFormType;
  // 表单项的文本
  label?: string;
  // 表单验证规则
  rules?: any[];
  // 表单的提示文字
  // placeholder?: any;
  // 针对select
  options?: any[];
  // 针对特殊的属性
  attrs?: any;
  style?: CSSStyleDeclaration;
  // 是否显示该表单项
  isHidden?: boolean;
  // 是否是搜索按钮
  search?: boolean;
}

// 整个表单的props对象的约束。
export interface IForm {
  // 表单的每一项配置
  formItems: IFormItem[];
  // label的宽度
  labelWidth?: string;
  // 通过el-row, el-col做响应式
  colLayout?: any;
  // 每个表单项的样式
  itemStyle?: any;
  // 校验规则
  rules?: any[];
}

export interface Emits {
  (e: "update:modelValue", val: any): void;
  (e: "search", val: any): void;
  (e: "reset"): void;
  (e: "clear"): void;
}

export interface SearchFormEmits {
  (e: "search", val: any): void;
  (e: "reset"): void;
  (e: "clear"): void;
}
