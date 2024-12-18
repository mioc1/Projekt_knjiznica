<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <!-- Gumb za otvaranje/skrivanje izbornika -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <q-img src="~assets/logo.png" style="width: 40px; height: 40px; margin-right: 10px;" />
          Knjižnica
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Drawer (Bočna Navigacija) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Izbornik</q-item-label>

        <!-- Navigacijski linkovi -->
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Početna</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/popis_knjiga">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>Popis knjiga</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/pretrazivanje">
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
          <q-item-section>Pretraživanje</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/o_nama">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>O nama</q-item-section>
        </q-item>
        <!-- Dodajte Rezervacije u izbornik -->
        <q-item clickable v-ripple to="/rezervacije">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Rezervacije</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Glavni Sadržaj -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
