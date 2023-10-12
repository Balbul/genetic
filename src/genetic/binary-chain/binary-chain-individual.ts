import {
  AbstractIndividual,
  iSettingsAbstractIndividual,
} from "../absract-classes/abstract-individual";

export interface iSettingsBinaryChainIndividual
  extends iSettingsAbstractIndividual {
  gnome: number[];
}

export class BinaryChainIndividual extends AbstractIndividual {
  constructor(settings: iSettingsBinaryChainIndividual) {
    super(settings);
  }

  calcScore(): void {
    let score = 0;
    this.gnome.forEach((num) => {
      score += num;
    });
    this.score = score;
  }
}
