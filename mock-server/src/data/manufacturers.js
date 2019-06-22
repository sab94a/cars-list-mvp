module.exports = [
  {
    name: "Audi",
    models: ["100", "200", "50", "80/90", "A1", "A2", "A3", "A4", "A4 Allroad", "A5", "A6", "A6 Allroad", "A7", "A8", "Allroad", "Cabriolet", "Coupe", "Q2", "Q3", "Q5", "Q7", "Quattro", "R8", "RS 3", "RS 4", "RS 5", "RS 6", "RS 7", "RS Q3", "S1", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "SQ7", "TT", "TT Roadster", "V8"]
  },
  {
    name: "BMW",
    models: ["1er", "2er", "3er", "4er", "5er", "6er", "7er", "8er", "X1", "X2", "X3", "X4", "X5", "X6", "Z1", "Z3", "Z4", "Z8", "i3", "i8"]
  },
  {
    name: "Chrysler",
    models: ["300 C", "300 M", "Crossfire", "Daytona Shelby", "ES", "GS", "GTS", "Grand Voyager", "Le Baron", "Neon", "New Yorker", "PT Cruiser", "Saratoga", "Sebring", "Stratus", "Viper", "Vision", "Voyager"]
  },
  {
    name: "Dodge",
    models: ["Avenger", "Caliber", "Journey", "Nitro"]
  },
  {
    name: "Fiat",
    models: ["124 Spider", "124 Sport/Spider", "126", "127", "131", "500", "500L", "500X", "850 T/900 T/-E", "Albea", "Argenta", "Barchetta", "Brava", "Bravo", "Cinquecento", "Coupe", "Croma", "Doblo", "Ducato", "Fiorino", "Freemont", "Fullback", "Grande Punto", "Idea", "Linea", "Marea", "Multipla", "Palio", "Panda", "Punto", "Qubo", "Regata", "Ritmo", "Scudo", "Sedici", "Seicento", "Stilo", "Strada", "Talento", "Tempra", "Tipo", "Ulysse", "Uno", "X 1/9"]
  },
  {
    name: "Mercedes-Benz",
    models: ["107 Coupe/Roadster", "123", "190/190 E", "207 D - 210 D", "A-Klasse", "B-Klasse", "C-Klasse", "CL-Coupe", "CLA-Klasse", "CLC-Klasse", "CLK-Klasse", "CLS-Klasse", "Citan", "SLC-Klasse", "E-Klasse", "E-Klasse T Modell", "G-Modell", "GL-Klasse", "GLA-Klasse", "GLC-Klasse", "GLE-Klasse", "GLK-Klasse", "GLS-Klasse", "GT AMG", "M-Klasse", "MB 100 D", "R-Klasse", "S-Coupe", "S-Klasse", "SL-Klasse", "SLK-Klasse", "SLR McLaren", "SLS AMG", "Sprinter", "Strich Acht", "Transporter", "V-Klasse", "Vaneo", "Viano", "Vito", "Vito Tourer", "X-Klasse"]
  },
  {
    name: "Porsche",
    models: ["718 Boxster", "718 Cayman", "911", "918 Spyder", "924", "928", "944", "968", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera", "Panamera Sport Turismo"]
  },
  {
    name: "Skoda",
    models: ["Citigo", "Fabia", "Favorit", "Felicia", "Forman", "Karoq", "Kodiaq", "Octavia", "Pickup", "Rapid", "Roomster", "Skoda 105", "Skoda 120", "Skoda 130", "Superb", "Yeti"]
  },
  {
    name: "Tesla",
    models: ["Model S", "Model X", "Roadster"]
  },
  {
    name: "Volkswagen",
    models: ["Amarok", "Arteon", "Beetle / New Beetle", "Bora", "CC", "Caddy", "Corrado", "Crafter", "Derby", "Eos", "Fox", "Golf I", "Golf II", "Golf III", "Golf IV", "Golf Plus", "Golf V", "Golf VI", "Golf VII", "Golf VII Sportsvan", "Jetta", "Kaefer 1200", "LT", "Lupo", "Passat", "Phaeton", "Polo", "Santana", "Scirocco", "Scirocco II", "Sharan", "T-Roc", "T3", "T4", "T5", "T6", "Taro", "Tiguan", "Tiguan Allspace", "Touareg", "Touran", "Vento"]
  }
].map(manufacturer => ({
  ...manufacturer,
  models: manufacturer.models.map(modelString => ({
    name: modelString,
  })),
}));
