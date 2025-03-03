"use client"

import { useState } from "react"
import { Trash2, Download, QrCode, Users, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Simulated data
const initialPhotos = [
  {
    id: 1,
    url: "/placeholder.svg?height=400&width=300",
    uploadedBy: "Guest #1234",
    date: "2024-02-22",
  },
  {
    id: 2,
    url: "/placeholder.svg?height=400&width=300",
    uploadedBy: "Guest #5678",
    date: "2024-02-22",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=400&width=300",
    uploadedBy: "Guest #9012",
    date: "2024-02-22",
  },
]

const initialQRCodes = [
  { id: 1, code: "QUINCE-ABC123", status: "active", lastUsed: "2024-02-22", usageCount: 5 },
  { id: 2, code: "QUINCE-DEF456", status: "active", lastUsed: "2024-02-22", usageCount: 3 },
  { id: 3, code: "QUINCE-GHI789", status: "revoked", lastUsed: "2024-02-21", usageCount: 1 },
]

export default function AdminDashboard() {
  const [photos, setPhotos] = useState(initialPhotos)
  const [qrCodes, setQrCodes] = useState(initialQRCodes)
  const [eventSettings, setEventSettings] = useState({
    eventName: "Julia's Quinceañera",
    eventDate: "2024-05-15",
    uploadLimit: "50",
    allowedFormats: "jpg,png,heic",
    autoApprove: true,
    watermark: false,
    theme: "purple",
  })

  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter((photo) => photo.id !== id))
  }

  const generateNewQR = () => {
    const newCode = {
      id: qrCodes.length + 1,
      code: `QUINCE-${Math.random().toString(36).substr(2, 9)}`,
      status: "active",
      lastUsed: "Never",
      usageCount: 0,
    }
    setQrCodes([...qrCodes, newCode])
  }

  const handleBatchQRGeneration = () => {
    const newCodes = Array.from({ length: 5 }, (_, index) => ({
      id: qrCodes.length + index + 1,
      code: `QUINCE-${Math.random().toString(36).substr(2, 9)}`,
      status: "active",
      lastUsed: "Never",
      usageCount: 0,
    }))
    setQrCodes([...qrCodes, ...newCodes])
  }

  const toggleQRStatus = (id: number) => {
    setQrCodes(
      qrCodes.map((code) =>
        code.id === id ? { ...code, status: code.status === "active" ? "revoked" : "active" } : code,
      ),
    )
  }

  const handleSettingChange = (key: string, value: string | boolean) => {
    setEventSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-purple-800">Admin Dashboard</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Gallery Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600">Total Photos</p>
                <p className="text-2xl font-bold">{photos.length}</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-sm text-pink-600">Active Users</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600">Active QR Codes</p>
                <p className="text-2xl font-bold">{qrCodes.filter((code) => code.status === "active").length}</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-sm text-pink-600">Total Uploads Today</p>
                <p className="text-2xl font-bold">25</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="qr-management" className="bg-white rounded-lg shadow-lg p-6">
            <TabsList className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <TabsTrigger value="qr-management" className="flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                QR Management
              </TabsTrigger>
              <TabsTrigger value="gallery-settings" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Gallery Settings
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Manage Photos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qr-management" className="space-y-6">
              <div className="flex gap-4 mb-6">
                <Button onClick={generateNewQR} className="bg-purple-600 hover:bg-purple-700">
                  Generate Single QR
                </Button>
                <Button onClick={handleBatchQRGeneration} variant="outline">
                  Generate Batch (5)
                </Button>
                <Button
                  variant="outline"
                  className="ml-auto"
                  onClick={() => alert("QR codes would be downloaded as PDF")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export QR Codes
                </Button>
              </div>

              <div className="border rounded-lg">
                <div className="grid grid-cols-5 gap-4 p-4 border-b bg-gray-50 font-medium">
                  <div>QR Code</div>
                  <div>Status</div>
                  <div>Last Used</div>
                  <div>Usage Count</div>
                  <div>Actions</div>
                </div>
                {qrCodes.map((code) => (
                  <div key={code.id} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center">
                    <div className="font-mono text-sm">{code.code}</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          code.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {code.status}
                      </span>
                    </div>
                    <div className="text-gray-600">{code.lastUsed}</div>
                    <div>{code.usageCount} times</div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => toggleQRStatus(code.id)}>
                        {code.status === "active" ? "Revoke" : "Activate"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gallery-settings" className="space-y-6">
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <h3 className="text-lg font-semibold">Event Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input
                        id="eventName"
                        value={eventSettings.eventName}
                        onChange={(e) => handleSettingChange("eventName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={eventSettings.eventDate}
                        onChange={(e) => handleSettingChange("eventDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <h3 className="text-lg font-semibold">Upload Settings</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="uploadLimit">Upload Limit per User</Label>
                      <Input
                        id="uploadLimit"
                        type="number"
                        value={eventSettings.uploadLimit}
                        onChange={(e) => handleSettingChange("uploadLimit", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowedFormats">Allowed Formats</Label>
                      <Input
                        id="allowedFormats"
                        value={eventSettings.allowedFormats}
                        onChange={(e) => handleSettingChange("allowedFormats", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <h3 className="text-lg font-semibold">Gallery Settings</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoApprove">Auto-approve uploads</Label>
                      <Switch
                        id="autoApprove"
                        checked={eventSettings.autoApprove}
                        onCheckedChange={(checked) => handleSettingChange("autoApprove", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="watermark">Add watermark</Label>
                      <Switch
                        id="watermark"
                        checked={eventSettings.watermark}
                        onCheckedChange={(checked) => handleSettingChange("watermark", checked)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Gallery Theme</Label>
                      <Select
                        value={eventSettings.theme}
                        onValueChange={(value) => handleSettingChange("theme", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="purple">Purple Dream</SelectItem>
                          <SelectItem value="pink">Pink Paradise</SelectItem>
                          <SelectItem value="blue">Ocean Blue</SelectItem>
                          <SelectItem value="gold">Golden Elegance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700">Save Settings</Button>
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Manage Photos</h3>
                <Button variant="outline" onClick={() => alert("Gallery would be downloaded as ZIP")}>
                  <Download className="w-4 h-4 mr-2" />
                  Download All Photos
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={`Photo ${photo.id}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Uploaded by: {photo.uploadedBy}</p>
                      <p className="text-sm text-gray-500">Date: {photo.date}</p>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDeletePhoto(photo.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

