// Hungarian accents in the order of the classifiers labeling
const accentMap: { [key: string]: string[] } = {
  a: ["a", "á"],
  e: ["e", "é"],
  i: ["i", "í"],
  o: ["o", "ó", "ö", "ő"],
  u: ["u", "ú", "ü", "ű"],
};

// Hungarian uppercase accents in the order of the classifiers labeling
const accentMapUpper: { [key: string]: string[] } = {
  a: ["A", "Á"],
  e: ["E", "É"],
  i: ["I", "Í"],
  o: ["O", "Ó", "Ö", "Ő"],
  u: ["U", "Ú", "Ü", "Ű"],
};

// The length of the sliding window.
const window: number = 4;

export { accentMap, accentMapUpper, window };
