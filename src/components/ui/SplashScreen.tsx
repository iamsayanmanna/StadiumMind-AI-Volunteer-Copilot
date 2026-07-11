import React, { useEffect, useState } from 'react'

/**
 * Fullscreen application bootloader screen.
 * Displays a pulsing gradient logo mark and a progress bar before transitioning.
 */
export const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Fade animation trigger
    const fadeTimer = setTimeout(() => {
      setVisible(false)
    }, 1400)

    // Complete unmount trigger
    const unmountTimer = setTimeout(() => {
      setShouldRender(false)
    }, 1800)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(unmountTimer)
    }
  }, [])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-crowd-slate-950 flex flex-col items-center justify-center space-y-4 transition-all duration-500 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="relative">
        {/* Glow backdrop ring */}
        <div className="absolute inset-0 bg-stadium-green-500/20 blur-xl rounded-2xl animate-pulse"></div>
        {/* Glowing logo badge */}
        <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-tr from-stadium-green-600 to-energy-gold-500 flex items-center justify-center font-bold text-white text-3xl shadow-hud-glow">
          SM
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold tracking-wider text-slate-100 uppercase">StadiumMind</h2>
        <p className="text-[10px] text-stadium-green-500 font-semibold tracking-widest uppercase mt-1 animate-pulse-slow">
          AI Volunteer Copilot
        </p>
      </div>

      {/* Access Progress Indicator */}
      <div className="w-40 h-[3px] bg-crowd-slate-900 rounded-full overflow-hidden mt-6 relative">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-stadium-green-500 to-energy-gold-500 h-full w-full animate-shimmer shimmer-bg"></div>
      </div>
    </div>
  )
}
