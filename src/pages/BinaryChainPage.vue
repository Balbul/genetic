<template>
  <SettingCard @change="onChangeSettings" />
  <q-card class="q-ma-sm" bordered flat>
    <q-card-actions>
      <q-btn flat color="primary" @click="onClickStart">
        Start gen {{ gen }}
      </q-btn>
    </q-card-actions>
    <q-card-section>
      <q-list>
        <q-item v-for="el in results" dense>
          <q-item-section>
            <q-item-label>{{ el.name }}</q-item-label>
            <q-item-label caption>{{ el.gnome }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge color="teal" :label="el.score" />
          </q-item-section> </q-item
      ></q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { iSettingBinary } from "src/interfaces/settings.interfaces";
import { BinaryChainOperation } from "src/genetic/binary-chain/binary-chain-operation";

import SettingCard from "../components/SettingCard.vue";
import { reactive, ref } from "vue";

const binarySettings = ref<iSettingBinary>({ population: 10, gnomeSize: 10 });

let binaryOperatorGenetic: BinaryChainOperation;

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
  if (binaryOperatorGenetic.generation === 0) {
    binaryOperatorGenetic.initPopulation();
  } else {
    binaryOperatorGenetic.archiverGeneration();
    const selection = binaryOperatorGenetic.selection();
    const children = binaryOperatorGenetic.crossover(selection);
    const population = binaryOperatorGenetic.mutation(children);

    binaryOperatorGenetic.population = population;
  }
  binaryOperatorGenetic.generation += 1;
  const sorted = binaryOperatorGenetic.sortPopulation();
  results.value = sorted.map((el) => {
    return {
      gnome: el.gnome.join(""),
      score: el.score,
      name: el.name,
    };
  });
  gen.value = binaryOperatorGenetic.generation;
};
</script>

<style scoped></style>
