"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllWaitlistEntries, getWaitlistCount } from "@/lib/waitlist"
import type { WaitlistEntry } from "@/lib/waitlist"
import { Users, Mail, Calendar, Download } from "lucide-react"

export default function AdminDashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [waitlistEntries, count] = await Promise.all([getAllWaitlistEntries(), getWaitlistCount()])

        setEntries(waitlistEntries)
        setTotalCount(count)
      } catch (error) {
        console.error("Error loading admin data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const exportToCSV = () => {
    const csvContent = [
      ["Email", "Date", "Status", "Source"],
      ...entries.map((entry) => [
        entry.email,
        entry.timestamp?.toDate?.()?.toLocaleDateString() || "N/A",
        entry.status,
        entry.source,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `zynvo-waitlist-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Zynvo Admin Dashboard</h1>
          <p className="text-gray-400">Manage your waitlist and track signups</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{totalCount.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Total Signups</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {
                    entries.filter((entry) => {
                      const today = new Date()
                      const entryDate = entry.timestamp?.toDate?.() || new Date()
                      return entryDate.toDateString() === today.toDateString()
                    }).length
                  }
                </p>
                <p className="text-gray-400 text-sm">Today's Signups</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <div className="flex items-center">
              <Mail className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {entries.filter((entry) => entry.status === "pending").length}
                </p>
                <p className="text-gray-400 text-sm">Pending</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Waitlist Entries</h2>
          <Button onClick={exportToCSV} className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Waitlist Table */}
        <Card className="bg-gray-900 border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4 text-white">{entry.email}</td>
                    <td className="p-4 text-gray-400">{entry.timestamp?.toDate?.()?.toLocaleDateString() || "N/A"}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          entry.status === "pending"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : entry.status === "verified"
                              ? "bg-green-900/30 text-green-400"
                              : "bg-blue-900/30 text-blue-400"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{entry.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
