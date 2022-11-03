<script setup>
import { storeToRefs } from 'pinia';
import { useProviderStore } from '../stores/providers';
import EditProvider from './EditProvider.vue';

const props = defineProps({
  clientProviders: {
    type: Array,
  },
  clientId: {
    type: String,
  },
});

const { providers } = storeToRefs(useProviderStore());
const { deleteProvider } = useProviderStore();

const checkedBox = (provider) => {
  if (props.clientProviders) {
    return props.clientProviders.some((prov) => prov._id == provider._id);
  }
  return false;
};
</script>

<template>
  <form class="providers">
    <div v-for="provider in providers" :key="provider._id">
      <EditProvider :provider="provider" v-if="provider.editing" />
      <div v-else class="provider">
        <div>
          <input
            class="form-check-input"
            :name="
              clientProviders
                ? `editClientProvider${clientId}`
                : 'newClientProvider'
            "
            type="checkbox"
            :checked="checkedBox(provider)"
            :id="provider._id"
            @click="$emit('toggle-provider', $event.target)"
          />
          <label class="form-check-label px-3" :for="provider._id">{{
            provider.name
          }}</label>
        </div>
        <div class="edit-delete-provider">
          <i
            class="fa-solid fa-pen-to-square"
            @click="() => (provider.editing = true)"
          ></i>
          <i
            class="fa-solid fa-trash-can"
            @click="deleteProvider(provider._id)"
          ></i>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.providers {
  margin-top: 2rem;
  width: 100%;
  background-color: #E6ECEC ;
  font-size: 2rem;
}

.providers .provider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem 2rem;
}

.edit-delete-provider {
  display: flex;
  gap: 5rem;
}

.edit-delete-provider > i {
  cursor: pointer;
}
</style>
