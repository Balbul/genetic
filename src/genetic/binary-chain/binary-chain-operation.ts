import {
  AbstractGeneticOperation,
  iSettingsAbscratOperation,
} from "../absract-classes/abstract-genetic-operation";

import { AbstractIndividual } from "../absract-classes/abstract-individual";
import { BinaryChainIndividual } from "./binary-chain-individual";

interface iSettingsBinaryOperation extends iSettingsAbscratOperation {
  gnomeLength: number;
}

export class BinaryChainOperation extends AbstractGeneticOperation {
  gnomeLength: number;

  constructor(settings: iSettingsBinaryOperation) {
    super(settings);
    this.gnomeLength = settings.gnomeLength;
  }

  initPopulation(): void {
    this.population = [];
    for (let i = 0; i < this.populationSize; i++) {
      this.population.push(
        new BinaryChainIndividual({
          name: `${this.generation}.${i}`,
          gnome: this.buildGnome(),
        })
      );
    }
  }

  buildGnome(): number[] {
    const gnome: number[] = [];
    for (let i = 0; i < this.gnomeLength; i++) {
      gnome.push(Math.random() < 0.5 ? 1 : 0);
    }
    return gnome;
  }

  selection(): BinaryChainIndividual[] {
    const sorted = this.sortPopulation();
    // on choisi la moitié des plus performant
    return sorted.slice(0, Math.floor(sorted.length / 2));
  }

  crossover(parents: BinaryChainIndividual[]): BinaryChainIndividual[] {
    // on conserve le premier pour être certain de conserver se performance
    // on ne lui appliquera pas de mutation.
    const newPopulation = [parents[0]];

    for (let i = 1; i < this.populationSize; i++) {
      // on imaginne que les parents peuvent être eu même,
      // plus la population est grande et moins ça a un risque d'arriver...
      const parent1 = parents[Math.floor(Math.random() * parents.length)];
      const parent2 = parents[Math.floor(Math.random() * parents.length)];

      // un enfent sera la combinaison entre le début du p1 et p2
      // par rapport à un pivot random
      const point = Math.floor(Math.random() * this.gnomeLength);
      const child = new BinaryChainIndividual({
        name: `${this.generation + 1}.${i}+${parent1.name.split("+")[0]}x${
          parent2.name.split("+")[0]
        }`,
        gnome: [
          ...parent1.gnome.slice(0, point),
          ...parent2.gnome.slice(point, this.gnomeLength),
        ],
      });
      newPopulation.push(child);
    }
    return newPopulation;
  }

  mutation(population: BinaryChainIndividual[]): BinaryChainIndividual[] {
    // on choisi de ne pas muter le meilleur de la dernière génération
    const mutatedPopulation = [population[0]];
    const mutationRate = 0.5;

    for (let i = 1; i < this.populationSize; i++) {
      if (Math.random() < mutationRate) {
        // la mutation consiste ici de prendre un gene aléatoirement
        // sur l'individu et de le changer de 0 à 1 ou de 1 à 0
        const muted = population[i];

        const randomIndex = Math.floor(Math.random() * this.gnomeLength);
        muted.gnome[randomIndex] = muted.gnome[randomIndex] === 0 ? 1 : 0;
        muted.name = "M" + muted.name;
        mutatedPopulation.push(muted);
      } else {
        mutatedPopulation.push(population[i]);
      }
    }
    return mutatedPopulation;
  }

  runGeneration(): { population: BinaryChainIndividual[]; generation: number } {
    if (this.generation === 0) {
      this.initPopulation();
    } else {
      const selection = this.selection();
      const children = this.crossover(selection);
      const newPopulation = this.mutation(children);

      this.population = newPopulation;
    }
    this.generation += 1;
    return {
      generation: this.generation,
      population: this.sortPopulation(),
    };
  }
}
