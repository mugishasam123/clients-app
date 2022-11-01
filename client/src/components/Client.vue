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
    <td class="edit-delete-btns">
      <button type="button" class="edit-btn" data-bs-toggle="modal" :data-bs-target="`#editClientModal${client._id}`">
        Edit
      </button>
      <EditClient :client="client" />
      <button type="button" class="delete-btn" @click="deleteClient(client._id)">
        Delete
      </button>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding-left: 3rem;
  font-size: 1.8rem;
}

.edit-delete-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.edit-delete-btns>button {
  border: none;
  background: none;
}

.edit-btn {
  color: #35748a;
  text-decoration: solid underline #35748a;
}

.delete-btn {
  color: red;
  text-decoration: solid underline red;
}

.edit-delete-btns>button:active {
  transform: scale(0.9);
}
</style>
