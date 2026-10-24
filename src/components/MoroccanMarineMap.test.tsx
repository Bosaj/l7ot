import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MoroccanCoastalRadar } from './MoroccanCoastalRadar'

describe('MoroccanCoastalRadar', () => {
  it('renders correctly in Arabic with coastal GIS header', () => {
    render(<MoroccanCoastalRadar lang="ar" />)
    expect(screen.getByText(/نظام المعلومات الجغرافي البحري المغربي/i)).toBeInTheDocument()
    expect(screen.getByText(/الأطلس التفاعلي للموانئ، المحميات البحرية/i)).toBeInTheDocument()
    expect(screen.getAllByText(/3,500/i).length).toBeGreaterThan(0)
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

  it('renders unified interactive marine map with working Nautical Marks and Lighthouses toggle', () => {
    render(<MoroccanCoastalRadar lang="fr" />)
    const marksBtn = screen.getByRole('button', { name: /Phares & Balises/i })
    expect(marksBtn).toBeInTheDocument()
    expect(marksBtn).toHaveClass('bg-amber-400')

    // Toggle Nautical Marks off and on
    fireEvent.click(marksBtn)
    expect(marksBtn).not.toHaveClass('bg-amber-400')
    fireEvent.click(marksBtn)
    expect(marksBtn).toHaveClass('bg-amber-400')

    // Toggle Tactical Radar EEZ
    const radarBtn = screen.getByRole('button', { name: /Radar ZEE/i })
    expect(radarBtn).toBeInTheDocument()
    fireEvent.click(radarBtn)
    expect(radarBtn).toHaveClass('bg-cyan-400')
  })

  it('renders satellite and marine ocean tile controls on unified map', () => {
    render(<MoroccanCoastalRadar lang="fr" />)
    expect(screen.getByRole('button', { name: /Satellite/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Océans/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Relief/i })).toBeInTheDocument()
  })

  it('triggers onFilterSpeciesByPort when filter button is clicked', () => {
    const filterSpy = vi.fn()
    render(<MoroccanCoastalRadar lang="fr" onFilterSpeciesByPort={filterSpy} />)
    const filterBtn = screen.getByRole('button', { name: /Filtrer les poissons de/i })
    fireEvent.click(filterBtn)
    expect(filterSpy).toHaveBeenCalled()
  })
})
