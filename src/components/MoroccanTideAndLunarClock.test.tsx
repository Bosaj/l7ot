import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MoroccanTideAndLunarClock } from './MoroccanTideAndLunarClock'

describe('MoroccanTideAndLunarClock', () => {
  it('renders correctly in Arabic with lunar and tide elements', () => {
    render(<MoroccanTideAndLunarClock lang="ar" />)
    expect(screen.getByText(/مرصد المد والجزر والدورات القمرية/i)).toBeInTheDocument()
    expect(screen.getByText(/الطور القمري الحالي/i)).toBeInTheDocument()
    expect(screen.getByText(/معامل المد/i)).toBeInTheDocument()
  })

  it('renders correctly in French', () => {
    render(<MoroccanTideAndLunarClock lang="fr" />)
    expect(screen.getByText(/Horloge des Marées & Baromètre Lunaire/i)).toBeInTheDocument()
    expect(screen.getByText(/Coefficient de Marée/i)).toBeInTheDocument()
  })

  it('allows switching ports and updates tide label', () => {
    render(<MoroccanTideAndLunarClock lang="fr" />)
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'agadir' } })
    expect(screen.getByText(/Port de Agadir/i)).toBeInTheDocument()
  })
})
