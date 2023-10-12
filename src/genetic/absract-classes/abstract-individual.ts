export interface iSettingsAbstractIndividual {
  generation: number;
  indexPopulation: number;
  gnome: any[];
}

export abstract class AbstractIndividual {
  gnome: any[] = [];
  name: string = "";
  score: number = 0;
  constructor({
    generation,
    indexPopulation,
    gnome,
  }: iSettingsAbstractIndividual) {
    this.name = `${generation}-${indexPopulation}`;
    this.gnome = gnome;
    this.calcScore();
  }

  abstract calcScore(): void;
}
