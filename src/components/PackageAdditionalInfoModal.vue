<template>
  <q-dialog
    @update:model-value="dialogsStore.selectedPackageInfo = {}"
    :model-value="showDialog"
  >
    <q-card class="packages-card q-pa-sm items-center flex column">
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-weight-bold">
            {{ dialogsStore.selectedPackageInfo.name }}
          </span>
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section v-if="!isLoading" class="full-width">
        <ul>
          <li>Latest: {{ JSDelivrData.latest }} <br /></li>
          <li>Beta: {{ JSDelivrData.beta }}</li>
          <li>Hits total: {{ JSDelivrData.hitsTotal }}</li>
          <li>Hits rand: {{ JSDelivrData.hitsRank }}</li>
          <li>Bandwidth total: {{ JSDelivrData.bandwidthTotal }}</li>
          <li>Bandwidth rank: {{ JSDelivrData.bandwidthRank }}</li>
        </ul>
      </q-card-section>

      <div v-else class="full-width flex col-grow justify-center items-center">
        <q-spinner color="primary" size="3em" :thickness="10" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, onUpdated, ref, watch } from 'vue';
import { useDialogsStore } from 'stores/dialogs';
import { api } from 'boot/axios';

const dialogsStore = useDialogsStore();

const showDialog = computed(
  () => !!Object.keys(dialogsStore.selectedPackageInfo).length
);

const unknownValue = 'unknown';

const JSDelivrDataDefault: Record<string, string | number> = {
  latest: unknownValue,
  beta: unknownValue,
  hitsTotal: unknownValue,
  hitsRank: unknownValue,
  bandwidthTotal: unknownValue,
  bandwidthRank: unknownValue,
};

let JSDelivrData = ref(JSDelivrDataDefault);
let isLoading = ref(false);

const fetchJSDelivrData = async () => {
  isLoading.value = true;
  const { name } = dialogsStore.selectedPackageInfo;
  await api
    .get<
      string,
      {
        data: {
          tags: {
            latest?: number;
            beta?: number;
          };
        };
      }
    >(`https://data.jsdelivr.com/v1/packages/npm/${name}`)
    .then((res) => {
      JSDelivrData.value.latest = res.data.tags.latest ?? unknownValue;
      JSDelivrData.value.beta = res.data.tags.beta ?? unknownValue;
    })
    .catch(console.error);

  await api
    .get<
      string,
      {
        data: {
          hits: {
            total?: number;
            rank?: number;
          };
          bandwidth: {
            total?: number;
            rank?: number;
          };
        };
      }
    >(`https://data.jsdelivr.com/v1/stats/packages/npm/${name}?period=year`)
    .then((res) => {
      JSDelivrData.value.hitsTotal = res.data.hits.total ?? unknownValue;
      JSDelivrData.value.hitsRank = res.data.hits.rank ?? unknownValue;
      JSDelivrData.value.bandwidthTotal =
        res.data.bandwidth.total ?? unknownValue;
      JSDelivrData.value.bandwidthRank =
        res.data.bandwidth.rank ?? unknownValue;
    })
    .catch(console.error);

  isLoading.value = false;
};

watch(showDialog, (newValue) => {
  if (!newValue) {
    dialogsStore.selectedPackageInfo = {};
  }
});

onUpdated(() => {
  if (showDialog.value) {
    fetchJSDelivrData();
  }
});
</script>

<style scoped>
.packages-card {
  width: 400px;
  height: 260px;
}
</style>
