import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { CAR_MAKES, CAR_MODELS } from '../src/utils/constants.js';

const INPUT_DIR = 'public/images/cars/originals';
const OUTPUT_DIR = 'public/images/cars';
const WEBP_QUALITY = 80;
const SIZES = {
  thumbnail: 300,
  medium: 600,
  large: 1200
};

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputPath, width) {
  await sharp(inputPath)
    .resize(width, null, { fit: 'contain' })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);
}

async function processCarImages() {
  await ensureDirectoryExists(OUTPUT_DIR);

  // Process default car image
  const defaultCarInput = path.join(INPUT_DIR, 'default-car.jpg');
  const defaultCarOutput = path.join(OUTPUT_DIR, 'default-car.webp');
  await optimizeImage(defaultCarInput, defaultCarOutput, SIZES.medium);

  // Process hero images
  const heroInput = path.join(INPUT_DIR, 'hero-bg.jpg');
  const heroOutput = path.join(OUTPUT_DIR, 'hero-bg.webp');
  await optimizeImage(heroInput, heroOutput, SIZES.large);

  // Process car model images
  for (const make of CAR_MAKES) {
    const models = CAR_MODELS[make];
    for (const model of models) {
      const formattedMake = make.toLowerCase();
      const formattedModel = model.toLowerCase().replace(/\s+/g, '-');
      const filename = `${formattedMake}-${formattedModel}`;
      
      const inputPath = path.join(INPUT_DIR, `${filename}.jpg`);
      const outputPath = path.join(OUTPUT_DIR, `${filename}.webp`);
      
      try {
        await optimizeImage(inputPath, outputPath, SIZES.medium);
        console.log(`Processed: ${filename}`);
      } catch (error) {
        console.warn(`Failed to process ${filename}: ${error.message}`);
      }
    }
  }
}

processCarImages().catch(console.error);