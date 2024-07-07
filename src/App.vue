<script setup lang="ts">
import { ref } from "vue";
import { renderDocx } from "./utils/renderDocx";
import { FormDocx } from "./models/formDocx.model";
import { UploadFile, UploadRawFile } from "element-plus";

const docxPath = ref("/template.docx");

/**
 * 上傳檔案
 */
function uploadFile(uploadFile: UploadFile): void {
  docxPath.value = window.URL.createObjectURL(uploadFile.raw as UploadRawFile);
}

/**
 * 產出檔案
 */
function outputFile(e: FormDocx[]): void {
  e[e.length - 1].raw_loop_pagebreak = "";

  renderDocx(docxPath.value, {
    raw_loop_pagebreak: `<w:br w:type="page" />`,
    data: e,
  });
}

/** */
</script>

<template>
  <div class="mx-auto my-10 max-w-3xl">
    <el-upload :auto-upload="false" :on-change="uploadFile" accept=".docx">
      <el-button type="success" plain>選擇檔案</el-button>
    </el-upload>

    <hr class="my-6" />

    <CFormDocx @submit="outputFile" />
  </div>
</template>

<style scoped></style>
