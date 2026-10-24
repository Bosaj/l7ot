import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MoroccanCoastalRadar } from './MoroccanCoastalRadar'

describe('MoroccanCoastalRadar', () => {
  it('renders correctly in Arabic with coastal GIS header', () => {
    render(<MoroccanCoastalRadar lang="ar" />)
    expect(screen.getByText(/نظام المعلومات الجغرافي البحري المغربي/i)).toBeInTheDocument()
    expect(screen.getByText(/الأطلس التفاعلي للموانئ، المحميات البحرية/i)).toBeInTheDocument()
    expect(screen.getByText(/3,500 km/i)).toBeInTheDocument()
  })

  it('renders correctly in French', () => {
    render(<MoroccanCoastalRadar lang="fr" />)
    expect(screen.getByText(/SIG Maritime & Cartographie des Côtes du Maroc/i)).toBeInTheDocument()
    expect(screen.getByText(/Toutes les Couches/i)).toBeInTheDocument()
  })

  it('allows switching layers between Ports and Reserves', () => {
    render(<MoroccanCoastalRadar lang="fr" />)
    const reservesBtn = screen.getByRole('button', { name: /Aires Marines \(AMP\)/i })
    fireEvent.click(reservesBtn)
    expect(reservesBtn).toHaveClass('bg-emerald-500')
  })

  it('triggers onFilterSpeciesByPort when filter button is clicked', () => {
    const filterSpy = vi.fn()
    render(<MoroccanCoastalRadar lang="fr" onFilterSpeciesByPort={filterSpy} />)
    const filterBtn = screen.getByRole('button', { name: /Filtrer les poissons de/i })
    fireEvent.click(filterBtn)
    expect(filterSpy).toHaveBeenCalled()
  })
})
