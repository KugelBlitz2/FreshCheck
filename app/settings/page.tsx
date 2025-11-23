import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut } from "lucide-react"

export default function SettingsPage() {
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
            <SettingsItem icon={Bell} label="Notifications" />
          </div>
        </section>

        {/* App Section */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Application</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={Shield} label="Privacy & Security" />
            <SettingsItem icon={HelpCircle} label="Help & Support" />
          </div>
        </section>

        <button className="w-full bg-white text-red-500 font-medium py-4 rounded-xl border border-gray-100 flex items-center justify-center gap-2 mt-4 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        <div className="text-center text-xs text-gray-400 mt-8">
          Yuka Clone v1.0.0
          <br />
          Powered by Open Food Facts
        </div>
      </div>
    </div>
  )
}

function SettingsItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-400" />
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300" />
    </button>
  )
}
