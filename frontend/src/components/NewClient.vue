<script setup>
import { reactive } from 'vue';
import { useClientStore } from '../stores/clients';
import { useProviderStore } from '../stores/providers';
import ModalForm from './ModalForm.vue';

const { createClient, setClientError } = useClientStore();
const { setProviderError } = useProviderStore();

let clientProviders = [];

const modal = {
  id: 'newClientModal',
  type: 'Create Client',
  formId: 'newClientForm',
  title: 'New Client',
};

const properties = reactive({
  name: '',
  email: '',
  phone: '',
});

const toggleProvider = (checkbox) => {
  if (checkbox.checked) {
    const provider = {
      _id: checkbox.id,
    };
    clientProviders.push(provider);
  } else {
    clientProviders = clientProviders.filter(
      (provider) => provider._id !== checkbox.id,
    );
  }
};

const resetInputData = () => {
  properties.name = '';
  properties.email = '';
  properties.phone = '';
  clientProviders = [];
  setProviderError('');
  setClientError('');
  const checkboxes = document.getElementsByName('newClientProvider');
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
};

const submitClient = async () => {
  let { name, email, phone } = properties;
  const payload = { name, email, phone, providers: clientProviders };
  try {
    await createClient(payload);
    resetInputData();
    $('#newClientModal').modal('toggle');
  } catch ({ response }) {
    const { error } = response.data;
    if (error.match('email_1 dup key')) {
      setClientError(`The account with the email ${email} already exists`);
    } else {
      console.error(error);
    }
  }
};
</script>

<template>
  <ModalForm
    :modal="modal"
    :properties="properties"
    @toggle-provider="toggleProvider"
    @submit-client="submitClient"
    @cancel-operation="resetInputData"
  />
</template>
