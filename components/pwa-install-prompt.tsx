import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Wifi, WifiOff } from 'lucide-react'
import { usePWA } from '@/hooks/use-pwa'

export function PWAInstallPrompt() {
  const { canInstall, install, isOffline, isInstalled } = usePWA()

  useEffect(() => {
    if (isInstalled) {
      console.log('App is installed')
    }
  }, [isInstalled])

  if (isInstalled) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {isOffline && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm">Mode hors ligne</span>
        </div>
      )}
      
      {canInstall && !isOffline && (
        <Button
          onClick={install}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Installer l'app
        </Button>
      )}
    </div>
  )
}
