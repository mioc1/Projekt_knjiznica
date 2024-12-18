<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-weight-bold">Popis rezervacija</h1>

    <q-table
      :rows="reservations"
      :columns="columns"
      row-key="id"
      table-class="text-black"
      table-style="border: 3px solid black"
      table-header-style="height: 65px"
      table-header-class="bg-red-2"
      bordered
      flat
      square
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reaktivni element za rezervacije
const reservations = ref([]);

// Kolone za tablicu
const columns = [
  { name: 'naslov', label: 'Naslov knjige', field: 'naslov' },
  { name: 'autor', label: 'Autor', field: 'autor' },
  { name: 'ime', label: 'Korisnik', field: 'ime' },
  { name: 'prezime', label: 'Prezime korisnika', field: 'prezime' },
  { name: 'datum_rezervacije', label: 'Datum rezervacije', field: 'datum_rezervacije' }
];

// Dohvaćanje rezervacija s backend-a
onMounted(() => {
  loadReservations();
});

async function loadReservations() {
  try {
    const response = await axios.get('http://localhost:3000/api/rezervirane_knjige');
    reservations.value = response.data.data;
    console.log(reservations.value);  // Provjera podataka u konzoli
  } catch (error) {
    console.error('Greška pri dohvaćanju rezervacija:', error);
  }
}
</script>

<style scoped>
/* Stiliziranje tablice */
</style>
