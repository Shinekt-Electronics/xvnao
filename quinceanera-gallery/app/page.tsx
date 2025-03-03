"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { QrScanner } from "@/components/qr-scanner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [isScanning, setIsScanning] = useState(false)
  const [adminMode, setAdminMode] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const router = useRouter()

  // Simulate QR code validation
  const handleQRSuccess = (result: string) => {
    // In a real app, validate the QR code against a database
    if (result.startsWith("QUINCE-")) {
      router.push("/gallery")
    } else {
      alert("Invalid QR code")
    }
  }

  // Simulate admin login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === "admin123") {
      router.push("/admin")
    } else {
      alert("Invalid admin credentials")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-purple-800">Quinceañera Gallery</h1>
            <p className="text-gray-600">Capture and share beautiful moments</p>
          </div>

          {!adminMode ? (
            <div className="space-y-6">
              {isScanning ? (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <QrScanner onResult={handleQRSuccess} onError={(error) => console.log(error)} />
                  <Button className="w-full mt-4" variant="outline" onClick={() => setIsScanning(false)}>
                    Cancel Scanning
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setIsScanning(true)}>
                    Scan Your Bracelet QR
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => router.push("/gallery")}>
                    Skip QR Scan (Demo)
                  </Button>
                </div>
              )}
              <div className="text-center">
                <button onClick={() => setAdminMode(true)} className="text-sm text-purple-600 hover:underline">
                  Admin Access
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Login as Admin
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAdminMode(false)}
                  className="text-sm text-purple-600 hover:underline"
                >
                  Back to Guest Access
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

