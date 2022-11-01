<script setup>
import { storeToRefs } from 'pinia';
import { useClientStore } from '../stores/clients';
//import 'v-calendar/dist/style.css';
//import 'vue-select/dist/vue-select.css';

defineProps({
  dateProperties: {
    type: Object,
    required: true,
  },
});

defineEmits(['toggle-checkbox']);

const clientStore = useClientStore();

const { oldestClientDate, newestClientDate } = storeToRefs(clientStore);
</script>

<template>
  <h5 class="filter-title">Registration Date</h5>
  <div class="date-category">
    <div>
      <label for="specific-date">Specific Date</label>
      <input
        type="checkbox"
        name="date-category"
        id="specific-date"
        @click="$emit('toggle-checkbox', $event.target)"
        :checked="dateProperties.specificDate"
        @change="
          (e) => {
            dateProperties.specificDate = e.target.checked;
            dateProperties.dateRange = false;
          }
        "
      />
    </div>
    <v-date-picker
      v-model="dateProperties.dateValue"
      mode="date"
      :available-dates="{
        start: oldestClientDate,
        end: newestClientDate,
      }"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <input
          class="date-input"
          placeholder="MM/DD/YYYY"
          :value="inputValue"
          v-on="inputEvents"
          :disabled="!dateProperties.specificDate"
          required
        />
      </template>
    </v-date-picker>
  </div>
  <div class="date-category">
    <div>
      <label for="date-range">Select Range</label>
      <input
        type="checkbox"
        name="date-category"
        id="date-range"
        @click="$emit('toggle-checkbox', $event.target)"
        :checked="dateProperties.dateRange"
        @change="
          (e) => {
            dateProperties.dateRange = e.target.checked;
            dateProperties.specificDate = false;
          }
        "
      />
    </div>
    <div class="date-range">
      <v-date-picker
        v-model="dateProperties.startDate"
        mode="date"
        :available-dates="{
          start: oldestClientDate,
          end: newestClientDate,
        }"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="date-input"
            placeholder="MM/DD/YYYY"
            :value="inputValue"
            v-on="inputEvents"
            :disabled="!dateProperties.dateRange"
            required
          />
        </template>
      </v-date-picker>
      <i class="fa-solid fa-arrow-right-long"></i>
      <v-date-picker
        v-model="dateProperties.endDate"
        mode="date"
        :available-dates="{
          start: oldestClientDate,
          end: newestClientDate,
        }"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="date-input"
            placeholder="MM/DD/YYYY"
            :value="inputValue"
            v-on="inputEvents"
            :disabled="!dateProperties.dateRange"
            required
          />
        </template>
      </v-date-picker>
    </div>
  </div>
</template>

<style scoped>
.date-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.date-input {
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
}

.date-category div:first-child {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.date-category label {
  font-size: 1.7rem;
  font-style: italic;
}

.fa-arrow-right-long {
  font-size: 1.7rem;
}
</style>
