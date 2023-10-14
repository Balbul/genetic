<template>
  <SettingCard @change="onChangeSettings" />
  <q-card class="q-ma-sm" bordered flat dark>
    <q-card-section horizontal>
      <q-card-section class="col">
        <q-card-actions>
          <q-btn flat color="primary" @click="onClickStart">
            RUN BRUT FORCE
          </q-btn>
        </q-card-actions>

        <q-card-section>
          <q-banner dark>RESULTAT DU BRUT FORCE + TIMER</q-banner>
          <q-banner dark>pourcentage de chargement du brut force</q-banner>
        </q-card-section>
      </q-card-section>

      <q-separator vertical inset color="white" />

      <q-card-section class="col"
        ><q-card-actions>
          <q-btn flat color="primary" @click="onClickStart">
            Start gen {{ gen }}
          </q-btn>
        </q-card-actions>
        <q-card-section>
          <q-list>
            <q-item v-for="el in results" dense>
              <q-item-section>
                <q-item-label>{{ el.name }}</q-item-label>
                <q-item-label caption class="text-white">{{
                  el.gnome
                }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-badge color="teal" :label="el.score" />
              </q-item-section> </q-item
          ></q-list> </q-card-section
      ></q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { iSettingBinary } from "src/interfaces/settings.interfaces";
import { BinaryChainOperation } from "src/genetic/binary-chain/binary-chain-operation";

import SettingCard from "../components/SettingCard.vue";
import { reactive, ref } from "vue";

const binarySettings = ref<iSettingBinary>({ population: 10, gnomeSize: 10 });

let binaryOperatorGenetic: BinaryChainOperation = new BinaryChainOperation({
  gnomeLength: binarySettings.value.gnomeSize,
  populationSize: binarySettings.value.population,
});

const results = ref<
  {
    gnome: string;
    score: number;
    name: string;
  }[]
>([]);
const gen = ref(0);

const onChangeSettings = (settings: iSettingBinary) => {
  binarySettings.value.population = settings.population;
  binarySettings.value.gnomeSize = settings.gnomeSize;
  binaryOperatorGenetic = new BinaryChainOperation({
    gnomeLength: binarySettings.value.gnomeSize,
    populationSize: binarySettings.value.population,
  });
  results.value = [];
  gen.value = 0;
};

const onClickStart = () => {
  const run = binaryOperatorGenetic.runGeneration();

  gen.value = run.generation;
  results.value = run.population.map((p) => {
    return {
      gnome: p.gnome.join(""),
      name: p.name,
      score: p.getScore(),
    };
  });
};
</script>

<style scoped></style>
