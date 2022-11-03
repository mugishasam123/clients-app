<script setup>
import Client from './Client.vue';
import { storeToRefs } from 'pinia';
import { useClientStore } from '../stores/clients';

const clientStore = useClientStore();
const { clients } = storeToRefs(clientStore);

</script>

<template>
  <table class="table table-bordered container">
    <thead>
      <tr>
        <th scope="col">
          <span>Name</span>
        </th>
        <th scope="col">
          <span>Email</span>
        </th>
        <th scope="col">
          <span>Phone</span>
        </th>
        <th scope="col">
          <span>Providers</span>
        </th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <Client v-for="client in clients" :key="client._id" :client="client" />
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100% !important;
}

th,
td {
  padding-left: 3rem;
  font-size: 1.8rem;
}

th {
  background-color: #f3f3f3;
}
</style>
