import { defineStore } from 'pinia';

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
});
