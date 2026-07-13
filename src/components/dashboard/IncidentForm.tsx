import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Incident } from '@/types/incident'
import { incidentService } from '@/services/incident'
import { useToast } from '@/context/ToastContext'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Camera } from 'lucide-react'

const incidentSchema = z.object({
  category: z.enum(['Crowd Control', 'Medical', 'Security', 'Facilities', 'Other'] as const),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical'] as const),
  location: z.string().min(3, 'Location details must be at least 3 characters.'),
  description: z.string().min(5, 'Please provide a detailed description (min 5 characters).'),
})

type IncidentFormInputs = z.infer<typeof incidentSchema>

interface IncidentFormProps {
  onIncidentSubmitted: (incident: Incident) => void
}

export const IncidentForm: React.FC<IncidentFormProps> = ({ onIncidentSubmitted }) => {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IncidentFormInputs>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      category: 'Crowd Control',
      priority: 'Medium',
      location: '',
      description: '',
    },
  })

  const simulatePhotoAttach = () => {
    if (photoUrl) {
      setPhotoUrl(undefined)
      showToast('Incident photo attachment removed.', 'info')
    } else {
      setPhotoUrl(
        'https://images.unsplash.com/photo-1540747737956-37872404f802?auto=format&fit=crop&w=300&q=80'
      )
      showToast('Incident photo attached successfully.', 'success')
    }
  }

  const onSubmit = async (data: IncidentFormInputs) => {
    setIsSubmitting(true)
    try {
      const created = await incidentService.submitIncident({
        ...data,
        photoUrl,
      })
      showToast(`Incident ${created.id} submitted successfully.`, 'success')
      onIncidentSubmitted(created)
      reset()
      setPhotoUrl(undefined)
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Failed to submit incident.'
      showToast(errMsg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4 text-left border border-white/5 relative">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-alert-red-500 animate-pulse"></span>
          Report New Incident
        </h3>
        <span className="text-[10px] text-crowd-slate-400 font-mono">SECURE FEED</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 text-left">
            <label
              htmlFor="category-select"
              className="block text-xs font-semibold text-crowd-slate-400 uppercase tracking-wider"
            >
              Incident Category
            </label>
            <select
              id="category-select"
              {...register('category')}
              className="w-full px-3 py-2.5 rounded-lg text-sm bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 transition-all"
            >
              <option value="Crowd Control">Crowd Control</option>
              <option value="Medical">Medical Assistance</option>
              <option value="Security">Security Alert</option>
              <option value="Facilities">Facilities Issue</option>
              <option value="Other">Other / Miscellaneous</option>
            </select>
          </div>

          <div className="space-y-1.5 text-left">
            <label
              htmlFor="priority-select"
              className="block text-xs font-semibold text-crowd-slate-400 uppercase tracking-wider"
            >
              Severity Level
            </label>
            <select
              id="priority-select"
              {...register('priority')}
              className="w-full px-3 py-2.5 rounded-lg text-sm bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 transition-all"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Severity</option>
              <option value="High">High Severity</option>
              <option value="Critical">Critical Emergency</option>
            </select>
          </div>
        </div>

        <Input
          id="location-field"
          label="Target Location / Sector Zone"
          placeholder="e.g. Gate 4 entrance ramp, Row 14"
          error={errors.location?.message}
          {...register('location')}
        />

        <div className="space-y-1.5 text-left">
          <label
            htmlFor="description-field"
            className="block text-xs font-semibold text-crowd-slate-400 uppercase tracking-wider"
          >
            Incident Description & Context
          </label>
          <textarea
            id="description-field"
            rows={3}
            placeholder="Provide relevant details of the situation..."
            {...register('description')}
            className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-crowd-slate-950 border border-crowd-slate-700 text-slate-100 placeholder-crowd-slate-600 focus:outline-none focus:border-stadium-green-500 focus:ring-1 focus:ring-stadium-green-500 disabled:opacity-50 transition-all ${
              errors.description
                ? 'border-alert-red-500/80 focus:border-alert-red-500 focus:ring-alert-red-500'
                : ''
            }`}
          />
          {errors.description && (
            <p className="text-xs text-alert-red-500 font-medium tracking-wide" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={simulatePhotoAttach}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
              photoUrl
                ? 'bg-stadium-green-500/10 border-stadium-green-500/30 text-stadium-green-400'
                : 'bg-crowd-slate-900 border-crowd-slate-700 text-slate-350 hover:bg-crowd-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            {photoUrl ? 'Photo Attached (Click to remove)' : 'Simulate Camera Upload'}
          </button>

          <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting}>
            Submit Incident Logs
          </Button>
        </div>
      </form>
    </div>
  )
}
