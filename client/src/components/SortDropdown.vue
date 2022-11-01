<script setup>
import { storeToRefs } from 'pinia';
import { useClientStore } from '../stores/clients';

const { dateSort } = storeToRefs(useClientStore());
const { sortByDate } = useClientStore();
</script>

<template>
  <div class="btn-group">
    <button
      type="button"
      class="btn btn-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      data-bs-display="static"
      aria-expanded="false"
    >
      Sorty By
    </button>
    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
      <li :class="dateSort === 'createdAtDesc' ? 'date-sort-active' : ''">
        <button
          class="dropdown-item"
          type="button"
          @click="sortByDate('createdAt', 'Desc')"
        >
          Newest to Oldest (Created)
        </button>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li :class="dateSort === 'createdAtAsc' ? 'date-sort-active' : ''">
        <button
          class="dropdown-item"
          type="button"
          @click="sortByDate('createdAt', 'Asc')"
        >
          Oldest to Newest (Created)
        </button>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li :class="dateSort === 'updatedAtDesc' ? 'date-sort-active' : ''">
        <button
          class="dropdown-item"
          type="button"
          @click="sortByDate('updatedAt', 'Desc')"
        >
          Newest to Oldest (Updated)
        </button>
      </li>
      <li><hr class="dropdown-divider" /></li>
      <li :class="dateSort === 'updatedAtAsc' ? 'date-sort-active' : ''">
        <button
          class="dropdown-item"
          type="button"
          @click="sortByDate('updatedAt', 'Asc')"
        >
          Oldest to Newest (Updated)
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li > button {
  font-size: 1.4rem;
}
.date-sort-active {
  border-left: 0.5rem solid #35748a;
  border-right: 0.5rem solid #35748a;
  background-color: #d9e3eb;
}
</style>
