<script setup>
import { storeToRefs } from 'pinia';
import ClientsTable from './ClientsTable.vue';
import NewClient from './NewClient.vue';
import { useClientStore } from '../stores/clients';
import { useProviderStore } from '../stores/providers';

const clientStore = useClientStore();
const { loading } = storeToRefs(clientStore);
const { fetchProviders } = useProviderStore();
const { fetchClients } = clientStore;

fetchProviders();
fetchClients();

</script>

<template>
  <div class="container">
    <div class="p-10 bg-gray-100 mt-12">
      <div class="flex justify-between items-center">
        <h2 class="text-blue-600 text-[20px] font-semibold">Clients</h2>
        <button
          type="button"
          class=" border-gray-400 outline-none  border-2  rounded-md bg-gray-50 py-2 px-3 hover:bg-gray-400 font-bold text-gray-800 text-[1.6rem]"
          data-bs-toggle="modal"
          data-bs-target="#newClientModal"
        >
          New Client
        </button>
      </div>
      <div class="d-flex gap-3 align-items-center">
       
        <div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="spinner-border text-[28px] fixed top-[25%] left-[50%] width-[64px] h-[64px]" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <NewClient />
    <ClientsTable />
  </div>
</template>

<style>
.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: solid rgb(240, 237, 237);
}
</style>
