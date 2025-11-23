import { ArrowLeft, Share, MoreVertical, Download } from "lucide-react"
import Link from "next/link"

export default function InstallPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/settings" className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold">Install App</h1>
      </div>

      <div className="p-6 space-y-8 max-w-md mx-auto">
        {/* iOS Instructions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center text-sm">
              iOS
            </span>
            iPhone & iPad
          </h2>
          <ol className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">1.</span>
              <span>
                Tap the <Share className="w-4 h-4 inline mx-1" /> <strong>Share</strong> button in Safari.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">2.</span>
              <span>
                Scroll down and tap <strong>Add to Home Screen</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">3.</span>
              <span>
                Tap <span className="font-bold">Add</span> in the top right corner.
              </span>
            </li>
          </ol>
        </div>

        {/* Android Instructions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-[#3DDC84] text-white rounded-lg flex items-center justify-center text-sm">
              And
            </span>
            Android
          </h2>
          <ol className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">1.</span>
              <span>
                Tap the <MoreVertical className="w-4 h-4 inline mx-1" /> <strong>Menu</strong> icon in Chrome.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">2.</span>
              <span>
                Tap <strong>Install App</strong> or <strong>Add to Home screen</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-gray-900">3.</span>
              <span>Follow the on-screen prompts to install.</span>
            </li>
          </ol>
        </div>

        {/* Native Instructions */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-sm text-white">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
            <Download className="w-5 h-5" />
            Build Native App
          </h2>
          <p className="text-sm opacity-90 mb-4">Want a real APK? You can build this project using Capacitor.</p>
          <div className="bg-black/20 rounded-lg p-3 font-mono text-xs overflow-x-auto whitespace-nowrap">
            npx cap add android
            <br />
            npx cap run android
          </div>
        </div>
      </div>
    </div>
  )
}
