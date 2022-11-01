<script setup>
import Client from './Client.vue';
import { storeToRefs } from 'pinia';
import { useClientStore } from '../stores/clients';

const clientStore = useClientStore();
const { clients, fieldSort } = storeToRefs(clientStore);
const { sortByField } = clientStore;
</script>

<template>
  <table class="table table-bordered container">
    <thead>
      <tr>
        <th scope="col" :class="fieldSort.name ? 'active-sort' : ''">
          <div>
            <span>Name</span>
            <i
              class="fa-solid fa-sort"
              v-if="!fieldSort.name"
              @click="sortByField('name', 'Asc')"
            ></i>
            <i
              class="fa-solid fa-sort-up"
              v-else-if="fieldSort.name === 'Asc'"
              @click="sortByField('name', 'Desc')"
            ></i>
            <i
              class="fa-solid fa-sort-down"
              v-else-if="fieldSort.name === 'Desc'"
              @click="sortByField('name', 'Asc')"
            ></i>
          </div>
        </th>
        <th scope="col" :class="fieldSort.email ? 'active-sort' : ''">
          <div>
            <span>Email</span>
            <i
              class="fa-solid fa-sort"
              v-if="!fieldSort.email"
              @click="sortByField('email', 'Asc')"
            ></i>
            <i
              class="fa-solid fa-sort-up"
              v-else-if="fieldSort.email === 'Asc'"
              @click="sortByField('email', 'Desc')"
            ></i>
            <i
              class="fa-solid fa-sort-down"
              v-else-if="fieldSort.email === 'Desc'"
              @click="sortByField('email', 'Asc')"
            ></i>
          </div>
        </th>
        <th scope="col" :class="fieldSort.phone ? 'active-sort' : ''">
          <div>
            <span>Phone</span>
            <i
              class="fa-solid fa-sort"
              v-if="!fieldSort.phone"
              @click="sortByField('phone', 'Asc')"
            ></i>
            <i
              class="fa-solid fa-sort-up"
              v-else-if="fieldSort.phone === 'Asc'"
              @click="sortByField('phone', 'Desc')"
            ></i>
            <i
              class="fa-solid fa-sort-down"
              v-else-if="fieldSort.phone === 'Desc'"
              @click="sortByField('phone', 'Asc')"
            ></i>
          </div>
        </th>
        <th scope="col">
          <div>
            <span>Providers</span>
            <i
              class="fa-solid fa-sort"
              v-if="!fieldSort.providers"
              @click="sortByField('providers', 'Asc')"
            ></i>
            <i
              class="fa-solid fa-sort-up"
              v-else-if="fieldSort.providers === 'Asc'"
              @click="sortByField('providers', 'Desc')"
            ></i>
            <i
              class="fa-solid fa-sort-down"
              v-else-if="fieldSort.providers === 'Desc'"
              @click="sortByField('providers', 'Asc')"
            ></i>
          </div>
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

th.active-sort {
  background-color: #d5d3d3;
}

th div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fa-sort,
.fa-sort-up,
.fa-sort-down {
  cursor: pointer;
}
</style>
