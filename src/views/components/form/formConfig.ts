// 配置文件ts
import { IForm, IFormItem } from "@/components/ReForm/src/types";

const departmentList = [
  {
    value: "1",
    label: "信息管理部"
  },
  {
    value: "2",
    label: "财务部"
  },
  {
    value: "3",
    label: "人力资源部"
  },
  {
    value: "4",
    label: "投资部"
  }
];
const docStatusList = [
  { value: "NEW", label: "草稿" },
  { value: "ING", label: "审批中" },
  { value: "REJECT", label: "作废" },
  { value: "PASS", label: "通过" }
];
const formItemOptions: IFormItem[] = [
  {
    prop: "createdBy",
    label: "制单人",
    type: "input",
    rules: [
      {
        required: true,
        message: "请输入制单人",
        trigger: "blur"
      },
      {
        min: 3,
        max: 5,
        message: "长度 3 到 5 个字符",
        trigger: "blur"
      }
    ],
    attrs: {
      placeholder: "请输入制单人"
    }
  },
  {
    prop: "createdDate",
    label: "制单日期",
    type: "date",
    attrs: {
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      type: "daterange"
    }
  },
  {
    prop: "department",
    label: "部门",
    type: "select",
    options: departmentList,
    attrs: {
      clearable: true,
      filterable: true
    }
  },
  {
    prop: "docStatus",
    label: "单据状态",
    type: "select",
    options: docStatusList,
    attrs: {
      clearable: true,
      filterable: true
    }
  },
  {
    search: true
  }
];

const formOptions: IForm = {
  formItems: formItemOptions,
  labelWidth: "80px",
  colLayout: {
    xl: 6, // >1920px 4个
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  }
  // itemStyle: { padding: '20px 40px' }
};

export default formOptions;
