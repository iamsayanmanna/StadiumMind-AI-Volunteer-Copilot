import React from 'react'

/**
 * Shimmering loading skeletons representing dashboard grids.
 * Used during lazy-load Suspense transitions.
 */
export const SkeletonLoader: React.FC = () => {
  return (
    <div
      className="w-full min-h-[60vh] p-6 space-y-6 animate-pulse"
      role="status"
      aria-label="Loading page structure"
    >
      {/* Header element skeleton */}
      <div className="h-8 bg-crowd-slate-800/50 rounded-lg w-1/4"></div>

      {/* Layout grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main section */}
        <div className="md:col-span-2 space-y-4">
          <div className="h-48 bg-crowd-slate-850/30 rounded-2xl border border-white/5 p-6 space-y-4">
            <div className="h-6 bg-crowd-slate-800/60 rounded w-1/3"></div>
            <div className="h-4 bg-crowd-slate-800/40 rounded w-full"></div>
            <div className="h-4 bg-crowd-slate-800/40 rounded w-4/5"></div>
            <div className="h-10 bg-crowd-slate-800/50 rounded-lg w-1/4 mt-4"></div>
          </div>

          <div className="h-36 bg-crowd-slate-850/30 rounded-2xl border border-white/5 p-6 space-y-3">
            <div className="h-5 bg-crowd-slate-800/60 rounded w-1/4"></div>
            <div className="h-4 bg-crowd-slate-800/40 rounded w-full"></div>
            <div className="h-4 bg-crowd-slate-800/40 rounded w-5/6"></div>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-4">
          <div className="h-40 bg-crowd-slate-850/30 rounded-2xl border border-white/5 p-6 space-y-3">
            <div className="h-5 bg-crowd-slate-800/60 rounded w-1/2"></div>
            <div className="h-4 bg-crowd-slate-800/40 rounded w-full"></div>
            <div className="h-4 bg-crowd-slate-800/40 rounded w-2/3"></div>
          </div>

          <div className="h-44 bg-crowd-slate-850/30 rounded-2xl border border-white/5 p-6 space-y-3">
            <div className="h-5 bg-crowd-slate-800/60 rounded w-1/2"></div>
            <div className="h-4 bg-crowd-slate-800/40 rounded w-full"></div>
            <div className="h-4 bg-crowd-slate-800/40 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
