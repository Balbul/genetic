import { AbstractIndividual } from "./abstract-individual";

export interface iSettingsAbscratOperation {
  populationSize: number;
}

export abstract class AbstractGeneticOperation {
  populationSize: number = 0;
  population: AbstractIndividual[] = [];
  generation: number = 0;
  oldGeneration: {
    generation: number;
    population: AbstractIndividual[];
  }[] = [];

  constructor(settings: iSettingsAbscratOperation) {
    if (settings.populationSize === 0) {
      throw new Error("Merci de mettre une taille population supérieure à 0");
    }
    this.populationSize = settings.populationSize;
  }

  archiverGeneration() {
    this.oldGeneration.push({
      generation: this.generation,
      population: this.population,
    });
  }

  sortPopulation(): AbstractIndividual[] {
    return this.population.sort((a, b) => b.score - a.score);
  }

  /**
   * methode calcul du génome
   * @param options options permettant le calcul du génome
   */
  abstract buildGnome(options?: unknown): any[];

  /**
   * methode appelée lors de l'initialisation de la population
   */
  abstract initPopulation(): void;

  /**
   * Sélection sur la population de la génération actuelle par rapport au score (fitness)
   */
  abstract selection(): AbstractIndividual[];

  /**
   * Croisement des parents pour faire une nouvelle génération,
   * La stractégie de création de nouvelle génération dépend de
   * l'alorithme et du résultat voulu
   * @param parents parents sélectionnés pour créer une nouvelle génération.
   */
  abstract crossover(parents: AbstractIndividual[]): AbstractIndividual[];

  /**
   * mutation de la population, la stratégie dépend du résulat voulu.
   * Le facteur de mutation peut être plus ou moins élevé.
   * @param population population qui va subir la mutation
   */
  abstract mutation(population: AbstractIndividual[]): AbstractIndividual[];
}
