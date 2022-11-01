<script setup>
import { storeToRefs } from 'pinia';
import { useProviderStore } from '../stores/providers';

defineProps({
  providersFilterProps: {
    type: Object,
    required: true,
  },
});

defineEmits(['toggle-checkbox'])

const { providers } = storeToRefs(useProviderStore());
</script>

<template>
  <div class="providers-filter-container">
    <h5 class="filter-title">Providers</h5>
    <v-select
      multiple
      class="providers-dropdown"
      placeholder="Select some providers"
      v-model="providersFilterProps.selected"
      label="name"
      :options="providers"
      :reduce="(option) => option._id"
    ></v-select>
    <div class="providers-filter-conditions">
      <div>
        <input
          type="checkbox"
          id="strictly-all-selected"
          name="provider-selection"
          @click="$emit('toggle-checkbox', $event.target)"
          :checked="providersFilterProps.exactMatching"
          @change="
            (e) => {
              providersFilterProps.exactMatching = e.target.checked;
            }
          "
        />
        <label for="strictly-all-selected">Exactly All Selected</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="either-of-selected"
          name="provider-selection"
          @click="$emit('toggle-checkbox', $event.target)"
          :checked="!providersFilterProps.exactMatching"
          @change="
            (e) => {
              providersFilterProps.exactMatching = !e.target.checked;
            }
          "
        />
        <label for="either-of-selected">At least One Of Selected</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  font-size: 1.7rem;
}

form span {
  font-size: 1.7rem;
}

.providers-filter-container {
  width: 100%;
}

.providers-dropdown {
  font-size: 1.4rem;
  margin: 1.4rem;
}

.providers-filter-conditions {
  display: flex;
  justify-content: center;
  gap: 5rem;
  font-size: 1.4rem;
  font-style: italic;
  margin: 1rem 0;
}

.providers-filte-conditions > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
