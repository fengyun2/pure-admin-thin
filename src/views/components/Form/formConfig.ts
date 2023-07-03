// 配置文件ts
import { IForm, IFormItem } from "@/components/ReForm/src/types";
const formItemOptions: IFormItem[] = [
  {
    field: "name",
    label: "角色名",
    type: "input",
    placeholder: "请输入角色名",
    rules: [
      {
        required: true,
        message: "Please input Activity name",
        trigger: "blur"
      },
      {
        min: 3,
        max: 5,
        message: "Length should be 3 to 5",
        trigger: "blur"
      }
    ]
  },
  {
    field: "time",
    label: "根据时间选择内容",
    type: "datepicker",
    otherOptions: {
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      type: "daterange"
    }
  }
];

const formOptions: IForm = {
  formItems: formItemOptions,
  labelWidth: "120px",
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
