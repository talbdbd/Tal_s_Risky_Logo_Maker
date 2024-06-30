
const readlineSync = require('readline-sync');
const generateSVG = require('./utils/generateSVG');

function main() {
  console.log('Welcome to the SVG Logo Generator');

  // Get user input
  const text = readlineSync.question('Enter up to three characters for the logo text: ');
  const textColor = readlineSync.question('Enter text color (color name or hex code): ');
  const shapeOptions = ['circle', 'triangle', 'square'];
  const shapeIndex = readlineSync.keyInSelect(shapeOptions, 'Choose a shape for the logo: ');
  const shape = shapeOptions[shapeIndex];
  const shapeColor = readlineSync.question(`Enter ${shape} color (color name or hex code): `);

  // Generate SVG
  generateSVG(text.toUpperCase().slice(0, 3), textColor, shape, shapeColor);
}

main();