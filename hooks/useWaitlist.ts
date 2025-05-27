"use client"

import { useState, useEffect } from "react"
import { addToWaitlist, getWaitlistCount, syncOfflineEmails } from "@/lib/waitlist"

export const useWaitlist = () => {
  const [count, setCount] = useState<number>(12847) // Starting count
  const [isLoading, setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasPermissionError, setHasPermissionError] = useState(false)

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)

      // Only try to sync if we don't have permission errors
      const permissionError = localStorage.getItem("zynvo_permission_error")
      if (!permissionError || permissionError === "false") {
        setTimeout(() => {
          syncOfflineEmails().then(() => {
            loadCount()
          })
        }, 1000)
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine)
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  // Load count with comprehensive error handling
  const loadCount = async () => {
    try {
      const firebaseCount = await getWaitlistCount()
      setCount(firebaseCount)
      setHasLoaded(true)

      // Check if we have permission errors
      const permissionError = localStorage.getItem("zynvo_permission_error")
      setHasPermissionError(permissionError === "true")
    } catch (error: any) {
      console.error("Error loading waitlist count:", error)

      // Check for permission errors
      if (error.code === "permission-denied" || error.message?.includes("permission")) {
        setHasPermissionError(true)
        localStorage.setItem("zynvo_permission_error", "true")
      }

      // Keep the default count if loading fails
      setHasLoaded(true)
    }
  }

  // Load initial count
  useEffect(() => {
    // Small delay to allow Firebase to initialize
    const timer = setTimeout(() => {
      loadCount()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const addEmail = async (email: string) => {
    setIsLoading(true)
    try {
      const result = await addToWaitlist(email)

      if (result.success) {
        // Increment local count
        setCount((prev) => prev + 1)
      }

      return result
    } catch (error) {
      console.error("Error in addEmail:", error)
      return {
        success: false,
        message: "Network error. Please try again.",
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    count,
    addEmail,
    isLoading,
    isOnline,
    hasLoaded,
    hasPermissionError,
  }
}
