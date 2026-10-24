import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FishScanner } from './FishScanner'
import { MOROCCAN_FISH } from '../data/fish'

describe('FishScanner Component', () => {
  it('renders the AI vision scanner masthead and action controls', () => {
    render(<FishScanner allFish={MOROCCAN_FISH} lang="fr" onSelectFish={() => {}} />)

    expect(screen.getByText(/Scanner Visuel IA & Caméra du Souk/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ouvrir la Caméra en Direct/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Prendre une photo \/ Importer/i })).toBeInTheDocument()
  })

  it('renders sample fish specimens for instant testing', () => {
    render(<FishScanner allFish={MOROCCAN_FISH} lang="fr" onSelectFish={() => {}} />)

    expect(screen.getByText(/Ou testez immédiatement le scanner avec un spécimen/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /سردين/i }).length).toBeGreaterThan(0)
  })

  it('triggers sample analysis and displays species dossier with voice and metrics', async () => {
    render(<FishScanner allFish={MOROCCAN_FISH} lang="fr" onSelectFish={() => {}} />)

    const sardineBtn = screen.getAllByRole('button', { name: /سردين/i })[0]!
    fireEvent.click(sardineBtn)

    expect(await screen.findByText(/IMAGE ANALYSÉE/i)).toBeInTheDocument()
  })
})
