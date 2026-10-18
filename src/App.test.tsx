import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { App } from './App'

describe('L7OT App', () => {
  it('renders the header and Moroccan fish encyclopedia by default', () => {
    render(<App />)
    expect(screen.getAllByText(/L7OT/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: /موسوعة الأسماك/i })).toBeInTheDocument()
    expect(screen.getAllByText(/سردين/i).length).toBeGreaterThan(0)
  })

  it('filters fish when searching in Arabic or Latin', () => {
    render(<App />)
    const searchInput = screen.getByPlaceholderText(/ابحث باسم الحوت/i)
    fireEvent.change(searchInput, { target: { value: 'صول' } })

    expect(screen.getByText('الصول')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'سردين' })).not.toBeInTheDocument()
  })

  it('switches to coastal recipes tab', () => {
    render(<App />)
    const recipesTab = screen.getByRole('button', { name: /وصفات بحرية/i })
    fireEvent.click(recipesTab)

    expect(screen.getByText(/طاجين كوارة السردين/i)).toBeInTheDocument()
  })

  it('switches to Chef L7ot Charmoula Calculator tab', () => {
    render(<App />)
    const chefNavBtn = screen.getAllByRole('button', { name: /شيف الحوت/i })[0]!
    fireEvent.click(chefNavBtn)

    expect(screen.getByText('حاسبة الشرمولة المغربية الذكية')).toBeInTheDocument()
  })

  it('switches language to French', () => {
    render(<App />)
    const frButton = screen.getByRole('button', { name: 'FR' })
    fireEvent.click(frButton)

    expect(screen.getByRole('button', { name: /Encyclopédie Poissons/i })).toBeInTheDocument()
  })

  it('includes all 44 Moroccan fish species and supports regional dialect search including Oriental and new species', () => {
    render(<App />)
    expect(screen.getByText(/موسوعة الأسماك \(44\)/)).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText(/ابحث باسم الحوت/i)
    fireEvent.change(searchInput, { target: { value: 'باخيل' } })
    expect(screen.getByText('الباجو الملكي')).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'بوجوخ' } })
    expect(screen.getByText('بوجوخ')).toBeInTheDocument()
  })
})

