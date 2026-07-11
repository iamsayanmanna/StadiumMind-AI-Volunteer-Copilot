import { useEffect } from 'react'

/**
 * Reusable hook to update the browser tab document title.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `StadiumMind | ${title}`
  }, [title])
}
