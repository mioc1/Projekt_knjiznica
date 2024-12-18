<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-weight-bold">Pretraživanje knjiga</h1>
    <q-input v-model="searchTerm" label="Unesite naslov ili autora" class="q-mt-md" />
    <q-btn @click="searchBooks" color="primary" label="Pretraži" class="q-mt-md" />

    <q-list class="q-mt-md">
      <q-item v-for="book in filteredBooks" :key="book.id">
        <q-item-section>
          <q-item-label>{{ book.naslov }} - {{ book.autor }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const books = ref([
  { id: 1, naslov: 'Knjiga 1', autor: 'Autor 1' },
  { id: 2, naslov: 'Knjiga 2', autor: 'Autor 2' },
  { id: 3, naslov: 'Knjiga 3', autor: 'Autor 3' }
])

const searchTerm = ref('')
const filteredBooks = ref([])

function searchBooks() {
  filteredBooks.value = books.value.filter(
    (book) =>
      book.naslov.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
}
</script>
