"use client"

import { ChevronRight, User, Bell, Shield, HelpCircle, Trash2, Smartphone, Info } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [historyCount, setHistoryCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const notifications = localStorage.getItem("freshcheck_notifications")
    if (notifications !== null) {
      setNotificationsEnabled(notifications === "true")
    }

    const history = JSON.parse(localStorage.getItem("yuka_history") || "[]")
    setHistoryCount(history.length)
  }, [])

  const toggleNotifications = () => {
    const newValue = !notificationsEnabled
    setNotificationsEnabled(newValue)
    localStorage.setItem("freshcheck_notifications", newValue.toString())
  }

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all scan history? This action cannot be undone.")) {
      localStorage.removeItem("yuka_history")
      setHistoryCount(0)
      alert("History cleared successfully!")
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-white p-6 border-b border-gray-100 mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6 px-4">
        {/* Account Section */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Account</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={User} label="My Profile" />
            <SettingsToggle
              icon={Bell}
              label="Notifications"
              enabled={notificationsEnabled}
              onToggle={toggleNotifications}
            />
          </div>
        </section>

        {/* App Section */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Application</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Link href="/settings/install">
              <SettingsItem icon={Smartphone} label="Install App" />
            </Link>
            <Link href="/settings/about">
              <SettingsItem icon={Info} label="About FreshCheck" />
            </Link>
            <SettingsItem icon={Shield} label="Privacy & Security" />
            <SettingsItem icon={HelpCircle} label="Help & Support" />
          </div>
        </section>

        {/* Data Section */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Data</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button onClick={clearHistory} className="w-full">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-500" />
                  <div className="text-left">
                    <span className="text-gray-700 font-medium block">Clear Scan History</span>
                    <span className="text-xs text-gray-400">{historyCount} items stored</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            </button>
          </div>
        </section>

        <div className="text-center text-xs text-gray-400 mt-8">
          FreshCheck v1.0.0
          <br />
          Powered by Open Food Facts
        </div>
      </div>
    </div>
  )
}

function SettingsItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-400" />
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300" />
    </div>
  )
}

function SettingsToggle({
  icon: Icon,
  label,
  enabled,
  onToggle,
}: {
  icon: any
  label: string
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <button onClick={onToggle} className="w-full">
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-gray-400" />
          <span className="text-gray-700 font-medium">{label}</span>
        </div>
        <div className={`w-11 h-6 rounded-full transition-colors ${enabled ? "bg-green-600" : "bg-gray-300"} relative`}>
          <div
            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </div>
      </div>
    </button>
  )
}
