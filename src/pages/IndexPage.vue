<template>
  <q-page class="q-pa-md items-center flex column">
    <PackagesSearchInput />
    <PackagesTable />
    <PackageAdditionalInfoModal />
  </q-page>
</template>

<script setup lang="ts">
import PackagesSearchInput from 'components/PackagesSearchInput.vue';
import PackagesTable from "components/PackagesTable.vue";
import PackageAdditionalInfoModal from "components/PackageAdditionalInfoModal.vue";
</script>
