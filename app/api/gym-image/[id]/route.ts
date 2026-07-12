import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Maps gym image IDs to the actual file paths where images are stored
const IMAGE_MAP: Record<string, string> = {
  '1': 'C:\\Users\\mayan\\.gemini\\antigravity\\brain\\cbe6f133-708d-4237-9ac3-0467a4b8db98\\media__1783536606825.jpg',
  '2': 'C:\\Users\\mayan\\.gemini\\antigravity\\brain\\cbe6f133-708d-4237-9ac3-0467a4b8db98\\media__1783536606891.jpg',
  '3': 'C:\\Users\\mayan\\.gemini\\antigravity\\brain\\cbe6f133-708d-4237-9ac3-0467a4b8db98\\media__1783536606979.jpg',
  '4': 'C:\\Users\\mayan\\.gemini\\antigravity\\brain\\cbe6f133-708d-4237-9ac3-0467a4b8db98\\media__1783536607034.jpg',
  '5': 'C:\\Users\\mayan\\.gemini\\antigravity\\brain\\cbe6f133-708d-4237-9ac3-0467a4b8db98\\media__1783536607103.jpg',
  'hanuman': 'C:\\Users\\mayan\\.gemini\\antigravity\\brain\\cbe6f133-708d-4237-9ac3-0467a4b8db98\\media__1783580473995.jpg',
  'logo': 'C:\\Users\\mayan\\.gemini\\antigravity\\brain\\cbe6f133-708d-4237-9ac3-0467a4b8db98\\media__1783618345726.jpg',
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const filePath = IMAGE_MAP[id]

  if (!filePath) {
    return new NextResponse('Image not found', { status: 404 })
  }

  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File does not exist on disk', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving image:', error)
    return new NextResponse('Error reading image', { status: 500 })
  }
}
