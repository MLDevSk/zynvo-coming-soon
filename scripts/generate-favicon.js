const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
    
    // Convert to PNG with different sizes
    const sizes = [16, 32, 48];
    const pngBuffers = await Promise.all(
      sizes.map(size =>
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );
    
    // Write the PNG files
    pngBuffers.forEach((buffer, index) => {
      fs.writeFileSync(
        path.join(__dirname, `../public/favicon-${sizes[index]}.png`),
        buffer
      );
    });
    
    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon(); 