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

  getScore(): number {
    if (this.score === 0) {
      this.gnome.forEach((num) => {
        this.score += num;
      });
    }
    return this.score;
  }
}
