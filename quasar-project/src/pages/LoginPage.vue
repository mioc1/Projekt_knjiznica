<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card style="width: 400px;">
      <q-card-section>
        <h1 class="text-h5 text-center">Prijava</h1>
      </q-card-section>

      <q-card-section>
        <q-input v-model="username" label="Korisničko ime" />
        <q-input v-model="password" type="password" label="Lozinka" class="q-mt-md" />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="Prijavi se" @click="login" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function login() {
  console.log('Prijava:', username.value, password.value)
}
</script>
