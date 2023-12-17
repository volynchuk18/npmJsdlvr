import { defineStore } from 'pinia';
import { computed } from 'vue';

interface RootState {
  selectedPackageInfo: {
    name?: string;
  };
}
export const useDialogsStore = defineStore('dialogs', {
  state: () =>
    ({
      selectedPackageInfo: {},
    } as RootState),
  getters: {
    showDialog: (state) => !!Object.keys(state.selectedPackageInfo).length,
  },
});
