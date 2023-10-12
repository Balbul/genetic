<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-avatar>
          <img src="dna.svg" />
        </q-avatar>

        <q-toolbar-title> Genetic </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab :to="ROUTE_PATH.BINARY" label="Binaire chaine" />
        <q-route-tab :to="ROUTE_PATH.TRAVEL" label="Traveling salesman" />
        <q-route-tab :to="ROUTE_PATH.MOVEMENT" label="Créature en mouvement" />
        <q-route-tab
          :to="ROUTE_PATH.FOXES_VS_RABITS"
          label="Renards VS Lapins"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ROUTE_PATH } from "../constants/routes.const";
</script>
