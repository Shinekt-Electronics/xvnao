"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simulated photo data
const initialPhotos = [
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
]

export default function Gallery() {
  const [photos, setPhotos] = useState(initialPhotos)
  const [showCamera, setShowCamera] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, we would upload the file to storage
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file)
      setPhotos([url, ...photos])
    }
  }

  const handleCameraCapture = () => {
    // Simulate taking a photo
    const newPhoto = "/placeholder.svg?height=400&width=300"
    setPhotos([newPhoto, ...photos])
    setShowCamera(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800">Photo Gallery</h1>
            <div className="flex gap-4">
              <Button onClick={() => setShowCamera(!showCamera)} className="bg-purple-600 hover:bg-purple-700">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
              <label>
                <Button variant="outline" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          {showCamera && (
            <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
              <div className="aspect-video bg-gray-100 rounded flex items-center justify-center mb-4">
                <p className="text-gray-500">Camera Preview (Simulated)</p>
              </div>
              <Button onClick={handleCameraCapture} className="w-full bg-purple-600 hover:bg-purple-700">
                Capture Photo
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="aspect-[3/4] bg-white rounded-lg shadow-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Gallery photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

