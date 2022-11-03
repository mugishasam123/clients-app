<script setup>
import { useClientStore } from '../stores/clients';
import { useProviderStore } from '../stores/providers';
import EditClient from './EditClient.vue';

const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
});

const providerStore = useProviderStore();
const { deleteClient } = useClientStore();

const clientProviders = () => {
  return props.client.providers.map((prov) =>
    providerStore.providers.find((provider) => provider._id === prov._id),
  );
};

const showComma = (index) => {
  const numOfProviders = props.client.providers.length;
  return index < numOfProviders - 1 && numOfProviders;
};
</script>

<template>
  <tr>
    <td scope="row">{{ client.name }}</td>
    <td>{{ client.email }}</td>
    <td>{{ client.phone }}</td>
    <td>
      <span v-for="(provider, index) in clientProviders()" :key="index">{{ provider.name
      }}<span v-if="showComma(index)">,&nbsp;&nbsp;</span></span>
    </td>
    <td class="flex flex-wrap space-x-4">
      <button type="button" class="text-blue-400 underline  border-0 bg-transparent active:transform active:scale-[0.8]" data-bs-toggle="modal" :data-bs-target="`#editClientModal${client._id}`">
        Edit
      </button>
      <EditClient :client="client" />
      <button type="button" class="text-red-500 underline  border-0 bg-transparent active:transform active:scale-[0.8]" @click="deleteClient(client._id)">
        Delete
      </button>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding-left: 2.8rem;
  font-size: 1.7rem;
}

</style>
