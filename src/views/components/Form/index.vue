<template>
  <div class="test">
    <re-search-form :formOptions="formOptions" />
  </div>
</template>

<script lang="ts" setup>
import formOptions from "./formConfig";
import { ReSearchForm } from "@/components/ReForm";
</script>
