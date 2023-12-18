<template>
  <q-dialog
    @update:model-value="dialogsStore.selectedPackageInfo = {}"
    :model-value="dialogsStore.showDialog"
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
import { onUpdated, ref, watch } from 'vue';
import { useDialogsStore } from 'stores/dialogs';
import { api } from 'boot/axios';
import { JsdelivrPackageStatsModel, JsdelivrPackageModel } from 'src/models';
import { unknownValue } from 'src/constants';

const dialogsStore = useDialogsStore();

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
  const packages = api
    .get<
      string,
      {
        data: JsdelivrPackageModel;
      }
    >(`https://data.jsdelivr.com/v1/packages/npm/${name}`)
    .then((res) => res)
    .catch(console.error);

  const stats = api
    .get<
      string,
      {
        data: JsdelivrPackageStatsModel;
      }
    >(`https://data.jsdelivr.com/v1/stats/packages/npm/${name}?period=year`)
    .then((res) => res)
    .catch(console.error);

  await Promise.all([packages, stats])
    .then(([packages, stats]) => {
      if (packages) {
        const { value } = JSDelivrData;
        const { data } = packages;
        value.latest = data.tags.latest ?? unknownValue;
        value.beta = data.tags.beta ?? unknownValue;
      }

      if (stats) {
        const { value } = JSDelivrData;
        const { data } = stats;
        value.hitsTotal = data.hits.total ?? unknownValue;
        value.hitsRank = data.hits.rank ?? unknownValue;
        value.bandwidthTotal = data.bandwidth.total ?? unknownValue;
        value.bandwidthRank = data.bandwidth.rank ?? unknownValue;
      }
    })
    .finally(() => (isLoading.value = false));
};

watch(
  () => dialogsStore.showDialog,
  (newValue) => {
    if (!newValue) {
      dialogsStore.selectedPackageInfo = {};
    }
  }
);

onUpdated(() => {
  if (dialogsStore.showDialog) {
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
