<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="q-ma-sm" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">genetic</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Alorithme génétique</div>
          <div class="text-caption text-grey">
            Le but de ce projet est d'expérimenter et de présenter l'intêt des
            alorithme génétique.
          </div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img class="rounded-borders" src="dna.svg" />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn
          flat
          round
          icon="fa-brands fa-github"
          href="https://github.com/Balbul/genetic.git"
          target="_blank"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts"></script>
