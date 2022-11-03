<script setup>
import { ref } from 'vue';
import { useProviderStore } from '../stores/providers';

const { updateProvider, setProviderError } = useProviderStore();

const props = defineProps({
  provider: {
    type: Object,
    required: true,
  },
});

const providerName = ref(props.provider.name);

const editProvider = async () => {
  try {
    await updateProvider({ ...props.provider, name: providerName.value });
    props.provider.editing = false;
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
  <form class="edit-provider-form" @submit.prevent="editProvider">
    <input type="text" v-model="providerName" required />
    <br />
    <button
      type="button"
      class="m-3 btn btn-danger text-black "
      @click="() => (provider.editing = false)"
    >
      Cancel
    </button>
    <button type="submit" class="btn btn-secondary text-black">Update</button>
  </form>
</template>

<style scoped></style>
