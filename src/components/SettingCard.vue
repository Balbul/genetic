<template>
  <q-card class="q-ma-sm" bordered flat>
    <q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">Réglage</div>
      </q-card-section>
    </q-card-section>
    <q-card-section horizontal>
      <q-card-section class="col">
        <q-badge label="popultation initiale" color="green" />
        <q-slider
          v-model="popultionInitiale"
          :min="1"
          :max="10"
          label
          label-always
          :marker-labels="(val) => `${val * 10}`"
          :label-value="`${popultionInitiale * 10} individus`"
          color="green"
          track-size="10px"
          thumb-color="black"
          markers
          @change="onChange"
        />
      </q-card-section>

      <q-separator vertical />
      <q-card-section class="col">
        <q-badge label="taille du génome" color="green" />
        <q-slider
          v-model="gnomeSize"
          :min="10"
          :max="70"
          label
          label-always
          :label-value="`taille : ${gnomeSize}`"
          color="green"
          track-size="10px"
          thumb-color="black"
          @change="onChange"
        />
      </q-card-section>
    </q-card-section>

    <q-card-sections>
      <q-banner rounded class="bg-primary text-white">
        <q-icon name="fas fa-info-circle" class="q-mr-sm" />
        nombre de solutions en brut force: {{ 2 ** gnomeSize }}
      </q-banner>
    </q-card-sections>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { iSettingBinary } from "../interfaces/settings.interfaces";
const popultionInitiale = ref(1);
const gnomeSize = ref(10);
const emits = defineEmits<{
  (e: "change", settings: iSettingBinary): void;
}>();

const onChange = () => {
  const settings: iSettingBinary = {
    population: popultionInitiale.value * 10,
    gnomeSize: gnomeSize.value,
  };

  emits("change", settings);
};
</script>

<style lang="scss" scoped></style>
