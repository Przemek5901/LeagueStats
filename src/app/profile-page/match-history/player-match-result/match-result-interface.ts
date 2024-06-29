export interface Spell {
  id: string;
  name: string;
  key: number;
}

export interface ListOfSpells {
  [spellName: string]: Spell;
}

export interface SpellsData {
  data: ListOfSpells;
}

export interface Item {
  name: string;
  description: string;
  id: string;
  icon: string;
}

export interface Rune {
  id: number;
  key: string;
  icon: string;
  name: string;
}
