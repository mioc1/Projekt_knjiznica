<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-weight-bold">Popis knjiga</h1>

    <!-- Pretraživanje -->
    <q-input
      v-model="searchQuery"
      label="Pretraži knjige"
      placeholder="Pretraži po naslovu ili autoru"
      class="q-mb-md"
      debounce="300"
    />

    <!-- Rezervacija -->
    <q-select
      v-model="selectedBookId"
      :options="books.map(book => ({ label: book.naslov, value: book.id }))"
      label="Odaberi knjigu"
      class="q-mb-md"
      filled
    />

    <q-input
      v-model="selectedUserId"
      label="Unesi ID korisnika"
      type="number"
      class="q-mb-md"
      filled
    />

    <q-btn
      @click="reserveBook"
      label="Rezerviraj knjigu"
      color="primary"
      class="full-width"
    />

    <!-- Tablica knjiga -->
    <q-table
      :rows="filteredBooks"
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
            <span v-if="col.name !== 'slika' && col.name !== 'opis'">
              {{ col.value }}
            </span>
            <div v-if="col.name === 'opis'">
              <div class="tbl_opis">
                {{ props.row.opis }}
              </div>
            </div>
            <q-img
              :src="props.row.slika"
              v-if="col.name === 'slika'"
              size="100px"
              class="shadow-10"
            ></q-img>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const books = ref([]);
const searchQuery = ref("");
const selectedBookId = ref(null);
const selectedUserId = ref(null);

const columns = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'naslov', label: 'Naslov', field: 'naslov' },
  { name: 'autor', label: 'Autor', field: 'autor' },
  { name: 'opis', label: 'Opis', field: 'opis' },
  { name: 'slika', label: 'Slika', field: 'slika' },
  { name: 'stanje', label: 'Stanje', field: 'stanje' }
];

// Filtriranje knjiga prema pretraživanju
const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const searchText = searchQuery.value.toLowerCase();
    return (
      book.naslov.toLowerCase().includes(searchText) ||
      book.autor.toLowerCase().includes(searchText)
    );
  });
});

// Dohvaćanje knjiga s backend-a
onMounted(() => {
  loadBooks();
});

async function loadBooks() {
  try {
    const response = await axios.get('http://localhost:3000/api/knjiga', {
      params: {
        naslov: searchQuery.value // Pretraživanje prema naslovu
      }
    });
    books.value = response.data.data;
  } catch (error) {
    console.error('Greška pri dohvaćanju knjiga:', error);
  }
}

// Rezervacija knjige
async function reserveBook() {
  if (!selectedBookId.value || !selectedUserId.value) {
    alert('Molimo odaberite knjigu i unesite ID korisnika.');
    return;
  }

  try {
    await axios.post('http://localhost:3000/api/rezervacije', {
      korisnik_id: selectedUserId.value,
      knjiga_id: selectedBookId.value
    });
    this.$q.notify({
      type: 'positive',
      message: 'Knjiga uspješno rezervirana!',
    });
  } catch (error) {
    console.error('Greška pri rezervaciji knjige:', error);
    alert('Došlo je do greške pri rezervaciji knjige.');
  }
}
</script>

<style scoped>
.tbl_opis {
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
