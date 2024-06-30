
const fs = require('fs');
const { createCanvas, registerFont } = require('canvas');
const svg2png = require('svg2png');
const readlineSync = require('readline-sync');

// Function to generate the SVG
function generateSVG(text, textColor, shape, shapeColor) {
  // Canvas dimensions
  const width = 300;
  const height = 200;

  // Create a canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Set text properties
  ctx.fillStyle = textColor;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw text
  ctx.fillText(text, width / 2, height / 2);

  // Set shape properties
  ctx.fillStyle = shapeColor;

  // Draw shape based on user input
  switch (shape) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 50, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2 - 50);
      ctx.lineTo(width / 2 + 50, height / 2 + 50);
      ctx.lineTo(width / 2 - 50, height / 2 + 50);
      ctx.closePath();
      ctx.fill();
      break;
    case 'square':
      ctx.fillRect(width / 2 - 50, height / 2 - 50, 100, 100);
      break;
    default:
      console.log('Invalid shape selection.');
      return;
  }

  // Generate SVG content
  const svgContent = `<?xml version="1.0"?>
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        svg { background-color: white; }
        text { font: bold 48px Arial; fill: ${textColor}; text-anchor: middle; dominant-baseline: middle; }
        .shape { fill: ${shapeColor}; }
      </style>
      <text x="${width / 2}" y="${height / 2}">${text}</text>
      <g class="shape">${getShapeSVG(shape)}</g>
    </svg>`;

  // Save SVG to file
  fs.writeFileSync('logo.svg', svgContent);

  console.log('Generated logo.svg');
}

// Function to get SVG markup for shapes
function getShapeSVG(shape) {
  switch (shape) {
    case 'circle':
      return `<circle cx="150" cy="100" r="50"/>`;
    case 'triangle':
      return `<polygon points="150,50 200,150 100,150"/>`;
    case 'square':
      return `<rect x="100" y="50" width="100" height="100"/>`;
    default:
      return '';
  }
}

module.exports = generateSVG;