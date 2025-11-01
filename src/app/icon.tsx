import { ImageResponse } from 'next/og'
import * as fs from 'fs';
import * as path from 'path';

export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  const imagePath = path.resolve(process.cwd(), 'src/app/afarrhb-LOGO-768px.png');
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={dataUrl} alt="AfarRHB Pro" style={{ width: '100%', height: '100%' }} />
      </div>
    ),
    {
      ...size,
    }
  )
}
