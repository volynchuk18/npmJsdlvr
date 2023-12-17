import { defineStore } from 'pinia';
import { RegistryPackages } from 'src/models';
import { api } from 'boot/axios';

interface RootState {
  registryPackages: RegistryPackages | null;
  isLoading: boolean;
}
export const useRegistryPackagesStore = defineStore('registryPackages', {
  state: () =>
    ({
      registryPackages: null,
      isLoading: false,
    } as RootState),
  actions: {
    fetchRegistryPackages(value: string) {
      this.isLoading = true;
      return api
        .get<string, { data: RegistryPackages }>(
          `https://registry.npmjs.org/-/v1/search?text=${value}&size=250`
        )
        .then((res) => (this.registryPackages = res.data))
        .catch(console.error)
        .finally(() => (this.isLoading = false));
    },
  },
});
