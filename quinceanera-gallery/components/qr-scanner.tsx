"use client"

import { useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QrScannerProps {
  onResult: (result: string) => void
  onError: (error: any) => void
}

export function QrScanner({ onResult, onError }: QrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("qr-reader")

    scannerRef.current
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onResult(decodedText)
          if (scannerRef.current) {
            scannerRef.current.stop()
          }
        },
        (error) => {
          onError(error)
        },
      )
      .catch((err) => {
        console.error(err)
      })

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current = null
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  }, [onResult, onError])

  return <div id="qr-reader" className="w-full aspect-square" />
}

