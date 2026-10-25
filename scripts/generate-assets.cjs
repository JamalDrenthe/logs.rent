const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BG_COLOR = '#080C14';

// Pure master logo SVG (transparent vector, white fill)
const MASTER_LOGO_SVG = `
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 22 18 L 36 18 L 36 84 L 84 84 L 84 98 L 22 98 Z" fill="#ffffff"/>
  <path d="M 44 18 L 96 18 C 108 18 116 26 116 38 C 116 50 108 58 94 58 L 74 58 L 88 44 L 92 44 C 98 44 102 41 102 38 C 102 35 98 32 92 32 L 44 32 Z" fill="#ffffff"/>
  <path d="M 44 38 L 58 24 L 118 98 L 98 98 Z" fill="#ffffff"/>
  <path d="M 46 48 L 60 48 L 60 78 L 46 78 Z" fill="#ffffff"/>
</svg>
`;

function createIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(count, 4); // Number of images

  let offset = 6 + (16 * count);
  const entries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
}

async function run() {
  console.log('🎨 LogoAnywhere: Genereren van complete Digital Asset Pack voor logs.rent...');

  const masterBuffer = Buffer.from(MASTER_LOGO_SVG);

  // 1. Favicon PNG (32x32)
  await sharp(masterBuffer, { density: 300 })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.png'));
  console.log('  ✓ favicon.png (32x32)');

  // 2. Multi-size Favicon ICO (16x16, 32x32, 48x48)
  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map(async (size) => {
      const buffer = await sharp(masterBuffer, { density: 300 })
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
      return { width: size, height: size, buffer };
    })
  );
  const icoFile = createIco(icoBuffers);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoFile);
  console.log('  ✓ favicon.ico (16x16, 32x32, 48x48 multi-size)');

  // 3. Apple Touch Icon (180x180, solid #080C14 background, safe zone logo ~140x140)
  const appleLogo = await sharp(masterBuffer, { density: 300 })
    .resize(136, 136, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: BG_COLOR
    }
  })
    .composite([{ input: appleLogo, gravity: 'center' }])
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('  ✓ apple-touch-icon.png (180x180, solid safe zone)');

  // 4. Android Chrome 192x192 (safe zone inner ~150x150)
  const pwa192Logo = await sharp(masterBuffer, { density: 300 })
    .resize(144, 144, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: BG_COLOR
    }
  })
    .composite([{ input: pwa192Logo, gravity: 'center' }])
    .png()
    .toFile(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'));
  console.log('  ✓ android-chrome-192x192.png (192x192)');

  // 5. Android Chrome 512x512 (safe zone inner ~384x384)
  const pwa512Logo = await sharp(masterBuffer, { density: 300 })
    .resize(384, 384, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: BG_COLOR
    }
  })
    .composite([{ input: pwa512Logo, gravity: 'center' }])
    .png()
    .toFile(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'));
  console.log('  ✓ android-chrome-512x512.png (512x512)');

  // 6. Social Media Avatar (1000x1000 with 20% safe zone margin for circular crops)
  const avatarLogo = await sharp(masterBuffer, { density: 300 })
    .resize(700, 700, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 1000,
      height: 1000,
      channels: 4,
      background: BG_COLOR
    }
  })
    .composite([{ input: avatarLogo, gravity: 'center' }])
    .png()
    .toFile(path.join(PUBLIC_DIR, 'social-avatar.png'));
  console.log('  ✓ social-avatar.png (1000x1000, 20% margin)');

  // 7. Open Graph Preview (1200x630, rendered from updated public/og-image.svg)
  const ogSvgPath = path.join(PUBLIC_DIR, 'og-image.svg');
  const ogSvgBuffer = fs.readFileSync(ogSvgPath);

  await sharp(ogSvgBuffer, { density: 150 })
    .resize(1200, 630)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));
  console.log('  ✓ og-image.png (1200x630 preview card)');

  console.log('🎉 Complete LogoAnywhere brand asset suite succesvol gegenereerd!');
}

run().catch((err) => {
  console.error('Fout bij asset generatie:', err);
  process.exit(1);
});
