import { MockNavigationRepository } from './MockNavigationRepository'
import { MockNavigationAnalyzer } from './MockNavigationAnalyzer'
import { MockNavigationProvider } from './MockNavigationProvider'
import { MockNavigationService } from './MockNavigationService'

const repository = new MockNavigationRepository()
const analyzer = new MockNavigationAnalyzer()
const provider = new MockNavigationProvider()

export const navigationService = new MockNavigationService(repository, analyzer, provider)
export const navigationAnalyzer = analyzer

export * from './INavigationRepository'
export * from './MockNavigationRepository'
export * from './INavigationAnalyzer'
export * from './MockNavigationAnalyzer'
export * from './INavigationProvider'
export * from './MockNavigationProvider'
export * from './INavigationService'
export * from './MockNavigationService'
