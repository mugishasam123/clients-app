import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';

const dateWithoutTime = (str) => {
  let date = new Date(str),
    month = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join('-');
};

export const useClientStore = defineStore({
  id: 'client',
  state: () => ({
    clients: [],
    loading: false,
    oldestClientDate: null,
    newestClientDate: null,
    clientError: '',
    fieldSort: {
      name: '',
      email: '',
      phone: '',
      providers: '',
    },
    dateSort: 'createdAtAsc',
  }),
  actions: {
    setClientError(error) {
      this.clientError = error;
    },
    async fetchClients() {
      try {
        this.loading = true;
        const { data } = await axios.get(`${baseUrl}/clients/`);
        this.clients = data;
        this.loading = false;
        await this.setOldestClientDate();
        await this.setNewestClientDate();
      } catch (error) {
        console.error(error.message);
        this.loading = false;
      }
    },
    async createClient(payload) {
      try {
        const response = await axios.post(`${baseUrl}/clients/`, payload);
        if (response.status === 201) this.clients.push(response.data);
        await this.setOldestClientDate();
        await this.setNewestClientDate();
      } catch (error) {
        throw error;
      }
    },
    async updateClient(id, payload) {
      try {
        const response = await axios.patch(`${baseUrl}/clients/${id}`, payload);
        if (response.status === 200) {
          this.clients = this.clients.map((client) => {
            if (client._id === id) return { ...client, ...response.data };
            return client;
          });
        }
      } catch (error) {
        throw error;
      }
    },
    async deleteClient(id) {
      try {
        const res = await axios.delete(`${baseUrl}/clients/${id}`);
        if (res.status === 200)
          this.clients = this.clients.filter((client) => client._id !== id);
        await this.setOldestClientDate();
        await this.setNewestClientDate();
      } catch (error) {
        console.error(error.message);
      }
    },
    async removeClientProvider(id) {
      try {
        this.clients = this.clients.map((client) => ({
          ...client,
          providers: client.providers.filter((provider) => provider._id !== id),
        }));
      } catch (error) {
        console.error(error.message);
      }
    },
    sortByField(field, order) {
      Object.keys(this.fieldSort).forEach((key) => {
        if (key === field) {
          this.fieldSort[field] = order;
        } else {
          this.fieldSort[key] = '';
        }
      });
      switch (order) {
        case 'Asc':
          this.clients = this.clients.sort((a, b) => {
            if (field === 'providers') {
              return a[field].length > b[field].length ? 1 : -1;
            }
            return a[field] > b[field] ? 1 : -1;
          });
          break;
        case 'Desc':
          this.clients = this.clients.sort((a, b) => {
            if (field === 'providers') {
              return a[field].length < b[field].length ? 1 : -1;
            }
            return a[field] < b[field] ? 1 : -1;
          });
          break;
        default:
          this.clients = this.clients;
      }
    },
    sortByDate(dateType, order) {
      switch (order) {
        case 'Asc':
          this.clients = this.clients.sort((a, b) =>
            new Date(a[dateType]).getTime() > new Date(b[dateType]).getTime()
              ? 1
              : -1,
          );
          break;
        case 'Desc':
          this.clients = this.clients.sort((a, b) =>
            new Date(a[dateType]).getTime() < new Date(b[dateType]).getTime()
              ? 1
              : -1,
          );
          break;
        default:
          this.clients = this.clients;
      }
      this.dateSort = `${dateType}${order}`;
    },
    async filterByDate(date, category) {
      if (category === 'specificDate') {
        this.clients = this.clients.filter(
          (client) =>
            dateWithoutTime(client['createdAt']) === dateWithoutTime(date),
        );
      } else if (category === 'dateRange') {
        this.clients = this.clients.filter((client) => {
          let clientDate = new Date(client['createdAt']).getTime();
          let startDate = date.start.setHours(0, 0, 0, 0);
          let endDate =
            dateWithoutTime(new Date()) === dateWithoutTime(date.end)
              ? date.end.getTime()
              : date.end.setHours(23, 59, 59, 59);
          return startDate <= clientDate && clientDate <= endDate;
        });
      }
    },
    async filterByProviders(selectedProviders, selectionType) {
      if (selectionType === 'strictProvidersSelection') {
        this.clients = this.clients.filter(
          (client) =>
            client.providers.length === selectedProviders.length &&
            client.providers.every(
              (provider, index) => provider._id === selectedProviders[index],
            ),
        );
      } else if (selectionType === 'oneOfProvidersSelection') {
        this.clients = this.clients.filter((client) =>
          client.providers.some((provider) =>
            selectedProviders.includes(provider._id),
          ),
        );
      }
    },
    async setOldestClientDate() {
      const { data } = await axios.get(`${baseUrl}/clients/`);
      this.oldestClientDate = new Date(
        Math.min(
          ...data.map((client) => new Date(client['createdAt']).getTime()),
        ),
      );
    },
    async setNewestClientDate() {
      const { data } = await axios.get(`${baseUrl}/clients/`);
      this.newestClientDate = new Date(
        Math.max(
          ...data.map((client) => new Date(client['createdAt']).getTime()),
        ),
      );
    },
  },
});
