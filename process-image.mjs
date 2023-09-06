import Jimp from 'jimp'
import fs from 'fs/promises'

const sizes = {
  desktop: [50, 25],
  mobile: [30, 50]
}

async function getRGBColorsArrayFromImage(imagePath) {
  try {
    const image = await Jimp.read(imagePath)
      .then(img => img.cover(...sizes.mobile))
      .then(img => img.rotate(270))
      .then(img => img.mirror(true, false))

    const width = image.getWidth();
    const height = image.getHeight();
    const colorsArray = [];

    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));
        row.push([r, g, b]);
      }
      colorsArray.push(row);
    }

    return colorsArray;
  } catch (error) {
    console.error('Error occurred while processing the image:', error);
    throw error;
  }
}

const imagePath = './paintings-source/example.jpg'

getRGBColorsArrayFromImage(imagePath)
  .then((colorsArray) => {
    console.log(colorsArray);
    const jsonData = JSON.stringify(colorsArray, null, 2);

    // Write JSON data to a file
    const outputFilePath = './src/paintings-data/example.json';
    return fs.writeFile(outputFilePath, jsonData, 'utf8')
  })
  .then(
    () => {
      console.log('Result written to output.json successfully!');
    },
    (err) => {
      console.error('Error writing to the file:', err);
    }
  );


  
  
  
  
  
  
  