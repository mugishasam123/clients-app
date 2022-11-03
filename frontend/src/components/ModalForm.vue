<script setup>
import { storeToRefs } from 'pinia';
import { ref, getCurrentInstance } from 'vue';
import { useClientStore } from '../stores/clients';
import { useProviderStore } from '../stores/providers';
import Providers from './Providers.vue';

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  properties: {
    type: Object,
    required: true,
  },
});

const clientStore = useClientStore();

const { clientError } = storeToRefs(clientStore);

const { emit } = getCurrentInstance();

const checkboxEmitter = (checkbox) => {
  emit('toggle-provider', checkbox);
};

const providerName = ref('');

const providerStore = useProviderStore();

const { providerError } = storeToRefs(providerStore);

const { createProvider, setProviderError } = providerStore;

const addProvider = async () => {
  try {
    await createProvider({
      name: providerName.value,
    });
    providerName.value = '';
    setProviderError('');
  } catch ({ response }) {
    const { error } = response.data;
    if (error.match('name_1 dup key')) {
      setProviderError(
        `The provider with the name ${providerName.value} already exists`,
      );
    } else {
      console.error(error);
    }
  }
};
</script>
<template>
  <div
    class="modal fade"
    :id="modal.id"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    :aria-labelledby="`${modal.id}Label`"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`${modal.id}Label`">
            {{ modal.title }}
          </h5>
        </div>
        <div class="modal-body">
          <p class="error-message">{{ clientError }}</p>
          <p class="error-message">{{ providerError }}</p>
          <form :id="modal.formId" @submit.prevent="$emit('submit-client')">
            <div class="mb-3 input-container">
              <label for="name">Name:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="properties.name"
                required
              />
            </div>
            <div class="mb-3 input-container">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                v-model="properties.email"
                required
              />
            </div>
            <div class="mb-3 input-container">
              <label for="phoneNumber">Phone:</label>
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                v-model="properties.phone"
                required
              />
            </div>
            <form
              @submit.prevent="addProvider"
              class="mb-3 input-container"
              :id="`providers${modal.formId}`"
            >
              <label for="provider">Providers: </label>
              <div>
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="provider"
                    v-model="providerName"
                    required
                  />
                  <Providers
                    @toggle-provider="checkboxEmitter"
                    :clientProviders="properties.providers"
                    :clientId="properties.id"
                  />
                </div>
                <button
                  type="submit"
                  :form="`providers${modal.formId}`"
                  class="add-provider"
                >
                  Add Provider
                </button>
              </div>
            </form>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="delete-btn hover:bg-gray-300 hover:text-black"
            @click="$emit('delete-client')"
            v-show="modal.title === 'Edit Client'"
          >
            Delete Client
          </button>
          <button
            type="button"
            data-bs-dismiss="modal"
            @click="$emit('cancel-operation')"
           
          >
            Cancel
          </button>
          <button type="submit" :form="modal.formId">
            {{ modal.type }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  width: 65%;
  margin-inline: auto;
  gap: 1rem;
}

label {
  display: block;
  text-align: right;
  width: 20%;
  font-size: 1.5rem;
  font-weight: 500;
}

.input-container input {
  padding: 0.5em;
  font-size: 1.4rem;
  width: 80%;
}

.input-container > div {
  display: flex;
  width: 80%;
  gap: 1rem;
}

.input-container > div > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
}

.input-container > div > div > input {
  width: 100%;
}

.input-container:last-child > label {
  align-self: flex-start;
  margin-top: 0.5rem;
}

.add-provider,
.modal-footer > button {
  outline: none;
  padding: 0.6rem 1em;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.7rem;
}

.add-provider,
.modal-footer button:nth-child(2),
.modal-footer button:nth-child(3) {
  background-color: #f3f3f3;
  border: solid rgb(192, 191, 191);
}

.add-provider {
  width: 25%;
  align-self: flex-start;
  margin-top: 0.2rem;
}

.delete-btn {
  align-self: flex-start;
  border: none;
  background: #ec3e42;
  color: #ffff;
  margin-right: auto;
}

.modal {
  padding: 0 !important;
}

.modal-dialog {
  min-width: clamp(60%, 80rem, 80%) !important;
}

.error-message {
  width: 75%;
  background-color: #da7c7e;
  margin-inline: auto;
  color: white;
  font-size: 1.8rem;
  text-align: center;
}

.modal-title {
  color: #35748a;
  font-size: 2.5rem;
}
</style>