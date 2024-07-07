<script lang="ts" setup>
import { FormInstance, FormItemRule, FormRules } from "element-plus";
import { reactive, ref, toRaw } from "vue";
import { FormDocx, FormDocxProject } from "../models/formDocx.model";

const emit = defineEmits(["submit"]);

const formRef = ref<FormInstance>();

const formDocx = reactive<FormDocx[]>([
  // TODO: 預設值另設
  {
    title: "儲槽T-3304、T-3310壁板中途漆膜厚",
    date: "113.05.30",
    no: "066",
    projects: [
      {
        title: "T-3310 S1-10",
        standard: "中途漆膜厚220μm(外側)",
        result: {
          content: "中途漆總膜厚",
          list: [],
        },
        fail: false,
      },
    ],
  },
]);

// TODO: 補驗證
const formDocxItemRules = reactive<FormItemRule>({
  required: true,
  message: "必填",
  trigger: "blur",
});

/**
 * 新增 結果項目
 */
function addResultItem(items: string[]) {
  items.push("");
}

/**
 * 新增 項次
 */
function addProjectItem(items: FormDocxProject[]) {
  // TODO: 預設值另設
  items.push({
    title: "",
    standard: "",
    result: {
      content: "",
      list: [],
    },
    fail: false,
  });
}

/**
 * 新增 抽查
 */
function addDataItem() {
  const { title, date, no } = formDocx[formDocx.length - 1];
  formDocx.push({
    title,
    date,
    no,
    // TODO: 預設值另設
    projects: [
      {
        title: "",
        standard: "",
        result: {
          content: "",
          list: [],
        },
        fail: false,
      },
    ],
  });
}

/**
 * 移除 item
 */
function removeItem(items: any[], item: any): void {
  const index = items.indexOf(item);
  if (index !== -1) {
    items.splice(index, 1);
  }
}

/**
 * 提交表單
 */
function submit() {
  if (!formRef.value) return;

  formRef.value.validate((valid) => {
    if (valid) {
      emit("submit", toRaw(formDocx));
    } else {
      ElMessage({
        message: "請檢查有無資訊未填寫",
        type: "error",
      });
    }
  });
}
</script>

<template>
  <el-form ref="formRef" :model="formDocx" label-width="auto">
    <div v-for="(data, index) in formDocx" :key="`data.${index}`">
      <el-form-item :label="`抽查 ${index + 1}`">
        <el-button type="danger" @click="removeItem(formDocx, data)">
          移除
        </el-button>
      </el-form-item>

      <el-form-item label="名稱">
        <el-input v-model="data.title" placeholder="請輸入名稱"></el-input>
      </el-form-item>

      <!-- TODO: 日期有值無法正常顯示，是有代值成功的 -->
      <el-form-item label="日期">
        <el-date-picker
          v-model="data.date"
          type="date"
          placeholder="請輸入日期"
          format="YYYY.MM.DD"
          value-format="YYYY.MM.DD"
        />
      </el-form-item>

      <el-form-item label="文件號">
        <el-input v-model="data.no" placeholder="請輸入文件號"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(project, i) in data.projects"
        :key="`project.${i}`"
        :label="`項次 ${i + 1}`"
      >
        <div class="flex w-full flex-col gap-4">
          <el-button
            type="danger"
            class="self-start"
            @click="removeItem(data.projects, data.projects[i])"
          >
            移除
          </el-button>

          <el-form-item label="項目">
            <el-input
              v-model="project.title"
              placeholder="請輸入項目"
            ></el-input>
          </el-form-item>

          <el-form-item label="標準">
            <el-input
              v-model="project.standard"
              placeholder="請輸入標準"
            ></el-input>
          </el-form-item>

          <el-form-item label="結果內容">
            <el-input
              v-model="project.result.content"
              placeholder="請輸入結果內容"
            ></el-input>
          </el-form-item>

          <el-form-item v-if="project.result.list" label="結果項目">
            <div class="flex w-full flex-col gap-4">
              <el-form-item
                v-for="(item, j) in project.result.list"
                :key="`project.${i}.result.${j}`"
              >
                <el-input
                  v-model="project.result.list[j]"
                  placeholder="請輸入結果項目"
                >
                  <template #append>
                    <el-button
                      class="text-6xl font-bold"
                      title="移除"
                      @click="
                        removeItem(project.result.list, project.result.list[j])
                      "
                    >
                      &ndash;
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>

              <el-button
                type="primary"
                class="self-start"
                @click="addResultItem(project.result.list)"
              >
                新增項目
              </el-button>
            </div>
          </el-form-item>

          <el-form-item label="不符合標準">
            <el-switch v-model="project.fail"></el-switch>
          </el-form-item>
        </div>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary" @click="addProjectItem(data.projects)">
          新增項次
        </el-button>
      </el-form-item>

      <hr
        v-if="formDocx.length > 0 && index !== formDocx.length - 1"
        class="my-6"
      />
    </div>
  </el-form>

  <el-button
    type="primary"
    class="fixed bottom-28 right-14"
    size="large"
    circle
    @click="addDataItem"
  >
    +
  </el-button>

  <el-button
    class="fixed bottom-14 right-14"
    size="large"
    circle
    plain
    @click="submit"
  >
    GO
  </el-button>
</template>
