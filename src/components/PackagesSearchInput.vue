<template>
  <q-input
    style="max-width: 300px"
    @update:model-value="registryPackagesStore.fetchRegistryPackages"
    v-model="searchValue"
    label="Search"
    dense
    debounce="500"
    min-length="1"
    :loading="registryPackagesStore.isLoading"
  >
    <template v-if="!registryPackagesStore.isLoading" v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRegistryPackagesStore } from 'stores/node-packages';

const searchValue = ref('');

const registryPackagesStore = useRegistryPackagesStore();
</script>

<style scoped></style>
