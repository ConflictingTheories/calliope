// Dark Mode (Can be set in config)
//
const dark = {
  // Colours
  primaryColor: "rgba(37, 1, 63, 0.52)",
  secondaryColor: "#ab00aa77",
  dark: "#222",
  textColor: "white",
  linkColor: "#61dafb",

  // Grays
  darkGray: "#444",
  midGray: "#777",
  lightGray: "#aaa",
  slateGray: "#30404d",

  // Mid Tones
  coldGray: "#455",
  rustGray: "#544",
  warmGray: "#664",

  // Gradients
  primaryGrad: "linear-gradient(45deg, @primaryColor, black)",
  secondaryGrad: "linear-gradient(45deg,indigo,black)",
};

// Light Mode (Default)
const light = {
  // Colours
  primaryColor: "#5BBFBA",
  secondaryColor: "#5F6CAF",
  dark: "#222",
  textColor: "#111",
  linkColor: "#61dafb",

  // Mid Tones
  green: "#A4D4AE",
  orange: "#F0CF85",
  yellow: "#E7F0C3",

  // Grays
  darkGray: "#444",
  midGray: "#777",
  lightGray: "#aaa",
  slateGray: "#30404d",

  // Gradients
  primaryGrad: "linear-gradient(45deg, #5BBFBA, #5F6CAF)",
  secondaryGrad: "linear-gradient(45deg,#5F6CAF,white)",
};

module.exports = {
  light,
  dark,
};
