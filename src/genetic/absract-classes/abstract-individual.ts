export interface iSettingsAbstractIndividual {
  name: string;
  gnome: any[];
}

export abstract class AbstractIndividual {
  gnome: any[] = [];
  name: string = "";
  score: number = 0;
  constructor({ name, gnome }: iSettingsAbstractIndividual) {
    this.name = name;
    this.gnome = gnome;
  }

  abstract getScore(): number;
}
