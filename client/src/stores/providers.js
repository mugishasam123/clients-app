import { defineStore } from 'pinia';
import axios from 'axios';
import { useClientStore } from './clients';

const baseUrl = 'http://localhost:5000/api';

export const useProviderStore = defineStore({
  id: 'provider',
  state: () => ({
    providers: [],
    providerError: '',
  }),
  actions: {
    setProviderError(error) {
      this.providerError = error;
    },
    async fetchProviders() {
      try {
        const { data } = await axios.get(`${baseUrl}/providers`);
        this.providers = data.map((provider) => ({
          ...provider,
          editing: false,
        }));
      } catch (error) {
        console.error(error.message);
      }
    },
    async createProvider(payload) {
      try {
        const response = await axios.post(`${baseUrl}/providers`, payload);
        if (response.status === 200)
          this.providers.push({ ...response.data, editing: false });
      } catch (error) {
        throw error;
      }
    },
    async updateProvider(payload) {
      try {
        const response = await axios.patch(
          `${baseUrl}/providers/${payload._id}`,
          payload,
        );
        if (response.status === 200) {
          this.providers = this.providers.map((provider) => {
            if (provider._id === payload._id) {
              return { ...provider, ...response.data };
            }
            return provider;
          });
        }
      } catch (error) {
        throw error;
      }
    },
    async deleteProvider(id) {
      try {
        const response = await axios.delete(`${baseUrl}/providers/${id}`);
        if (response.status === 200) {
          this.providers = this.providers.filter(
            (provider) => provider._id !== id,
          );
          const { removeClientProvider } = useClientStore();
          removeClientProvider(id);
        }
      } catch (error) {
        console.error(error.message);
      }
    },
  },
});
