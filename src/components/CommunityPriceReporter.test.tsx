import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommunityPriceReporter } from './CommunityPriceReporter'
import { MOROCCAN_FISH } from '../data/fish'

describe('CommunityPriceReporter Component', () => {
  it('renders the Bourse Citoyenne masthead and reports list', () => {
    render(<CommunityPriceReporter allFish={MOROCCAN_FISH} lang="fr" />)

    expect(screen.getByText(/Bourse Citoyenne/i)).toBeInTheDocument()
    expect(screen.getByText(/Prix Réels au Kilo/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Déclarer un prix au souk \+/i })).toBeInTheDocument()
  })

  it('filters reports by city', () => {
    render(<CommunityPriceReporter allFish={MOROCCAN_FISH} lang="fr" />)

    const casablancaBtn = screen.getByRole('button', { name: 'Casablanca' })
    fireEvent.click(casablancaBtn)

    // Should display reports from Casablanca
    expect(screen.getAllByText(/Casablanca/i).length).toBeGreaterThan(0)
  })

  it('opens submission form drawer on click', () => {
    render(<CommunityPriceReporter allFish={MOROCCAN_FISH} lang="fr" />)

    const addBtn = screen.getByRole('button', { name: /Déclarer un prix au souk \+/i })
    fireEvent.click(addBtn)

    expect(screen.getByText(/Déclaration d’un prix d’achat au marché/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Publier ce rapport/i })).toBeInTheDocument()
  })

  it('allows citizens to confirm / upvote a reported price', () => {
    render(<CommunityPriceReporter allFish={MOROCCAN_FISH} lang="fr" />)

    const confirmButtons = screen.getAllByRole('button', { name: /Confirmer/i })
    expect(confirmButtons.length).toBeGreaterThan(0)

    fireEvent.click(confirmButtons[0]!)
    expect(screen.getByText(/Confirmé ✓/i)).toBeInTheDocument()
  })
})
