<template>
  <div class="q-pa-md full-width packages-table" style="max-width: 1200px">
    <q-table
      v-model:pagination="pagination"
      flat
      bordered
      title="Treats"
      row-key="index"
      hide-pagination
      separator="vertical"
      :rows="rows"
      :columns="columns"
      :loading="registryPackagesStore.isLoading"
      @row-click="(evt, row) => dialogsStore.selectedPackageInfo = row"
    >
      <template v-slot:body-cell-name="props">
        <q-td
          :props="props"
          v-text-ellipsis
        >
          {{ props.row.name }}
        </q-td>
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props" v-text-ellipsis>
          {{ props.row.description }}
        </q-td>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        size="sm"
        :max="rows.length / pagination.rowsPerPage"
        :max-pages="7"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRegistryPackagesStore } from 'stores/node-packages';
import { date } from 'quasar';
import { useDialogsStore } from 'stores/dialogs';

const columns = [
  {
    name: 'index',
    label: '#',
    field: 'index',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    sortable: true,
  },
  {
    name: 'author',
    label: 'Author',
    field: 'author',
    sortable: true,
  },
  {
    name: 'date',
    label: 'Date',
    field: 'date',
    sortable: true,
    format: (val: string) => date.formatDate(val, 'DD-MM-YYYY'),
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    sortable: true,
  },
  {
    name: 'version',
    label: 'Version',
    field: 'version',
    sortable: true,
  },
];
const registryPackagesStore = useRegistryPackagesStore();
const dialogsStore = useDialogsStore();
const pagination = ref({
  rowsPerPage: 10,
  page: 1,
});

const rows = computed(() =>
  !registryPackagesStore.registryPackages
    ? []
    : registryPackagesStore.registryPackages.objects.map((item, index) => ({
        index: index + 1,
        name: item.package.name,
        author: item.package.author?.name,
        date: item.package.date,
        description: item.package.description,
        version: item.package.version,
      }))
);
</script>

<style scoped></style>
