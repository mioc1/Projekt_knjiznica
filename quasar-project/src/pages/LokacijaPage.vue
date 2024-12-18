<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-weight-bold">Lokacija knjižnice</h1>
    <div id="map" style="height: 400px; margin-top: 20px;"></div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  const map = L.map('map').setView([45.815399, 15.966568], 13) // Postavite koordinate svoje lokacije

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
})
</script>
