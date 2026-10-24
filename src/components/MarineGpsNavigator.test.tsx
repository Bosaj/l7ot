import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MarineGpsNavigator } from './MarineGpsNavigator'

describe('MarineGpsNavigator', () => {
  it('renders nautical gyro compass, telemetry metrics, and nearest port', () => {
    render(<MarineGpsNavigator lang="ar" />)

    expect(screen.getByText(/نظام الملاحة في عرض البحر/i)).toBeInTheDocument()
    expect(screen.getByText(/خط العرض/i)).toBeInTheDocument()
    expect(screen.getByText(/خط الطول/i)).toBeInTheDocument()
    expect(screen.getByText(/السرعة العقدية/i)).toBeInTheDocument()
    expect(screen.getByText(/دقة مستشعر GPS/i)).toBeInTheDocument()
    expect(screen.getByText(/قناة النجدة الدولية VHF Canal 16/i)).toBeInTheDocument()
    expect(screen.getByText(/\+212 537 62 58 77/)).toBeInTheDocument()
  })

  it('allows switching to famous Moroccan fishing grounds and updates navigation solution', () => {
    render(<MarineGpsNavigator lang="fr" />)

    const tangierBtn = screen.getByRole('button', { name: /Détroit de Gibraltar & Fosse de Tanger/i })
    fireEvent.click(tangierBtn)

    // Tangier Med or Larache should be nearest port
    expect(screen.getByText(/PORT DE REFUGE & DÉBARQUEMENT/i)).toBeInTheDocument()
    expect(screen.getByText(/Sanctuaires Marins Protégés/i)).toBeInTheDocument()
  })

  it('supports selecting individual ports as direct navigation destination', () => {
    const handleFilter = vi.fn()
    render(<MarineGpsNavigator lang="ar" onSelectPortFilter={handleFilter} />)

    // Click on Safi port card
    const safiTexts = screen.getAllByText(/ميناء آسفي/i)
    expect(safiTexts.length).toBeGreaterThan(0)
    fireEvent.click(safiTexts[0]!)

    expect(screen.getByText(/ميناء الملاذ والرجوع المعتمد/i)).toBeInTheDocument()
  })
})
