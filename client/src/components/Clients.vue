<script setup>
import { storeToRefs } from 'pinia';
import ClientsTable from './ClientsTable.vue';
import NewClient from './NewClient.vue';
//import FilterModal from './FilterModal.vue';
//import SortDropdown from './SortDropdown.vue';
import { useClientStore } from '../stores/clients';
import { useProviderStore } from '../stores/providers';

const clientStore = useClientStore();
const { loading } = storeToRefs(clientStore);
const { fetchProviders } = useProviderStore();
const { fetchClients } = clientStore;

fetchProviders();
fetchClients();

const refresh = async () => {
  await fetchProviders();
  await fetchClients();
  Object.keys(clientStore.fieldSort).forEach(
    (key) => (clientStore.fieldSort[key] = ''),
  );
  clientStore.dateSort = 'createdAtAsc';
};
</script>

<template>
  <div class="container">
    <div class="table-header">
      <div class="title-section">
        <h2>Clients</h2>
        <button
          type="button"
          class="new-client-btn"
          data-bs-toggle="modal"
          data-bs-target="#newClientModal"
        >
          New Client
        </button>
      </div>
      <div class="d-flex gap-3 align-items-center">
       
        <div>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#filterModal"
          >
            <span>Filter</span>
            &nbsp;&nbsp;
            <i class="fa-solid fa-filter"></i>
          </button>
     
        </div>
        <button
          type="button"
          class="refresh"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Refresh"
          @click="refresh"
        >
          <i class="fa-solid fa-rotate"></i>
        </button>
      </div>
    </div>
    <div v-if="loading" class="spinner-border loading-spinner" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <NewClient />
    <ClientsTable />
  </div>
</template>

<style>
.table-header {
  padding: 2.5rem 2.5rem;
  background-color: #f0f5f9;
  margin-inline: auto;
  margin-top: 3rem;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-section > h2 {
  color: #35748a;
  font-size: 2.8rem;
}

.btn {
  font-size: 1.3rem;
}

.new-client-btn {
  border: solid rgb(192, 191, 191);
  outline: none;
  padding: 0.3rem 1rem;
  font-size: 1.7rem;
  background-color: #f3f3f3;
  border-radius: 0.7rem;
}

.refresh {
  font-size: 2rem;
  color: #6c757d;
  border: none;
  background: none;
}

.loading-spinner {
  position: fixed;
  top: 25%;
  left: 50%;
  width: 4rem;
  height: 4rem;
  font-size: 1.8rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: solid rgb(240, 237, 237);
}
</style>
