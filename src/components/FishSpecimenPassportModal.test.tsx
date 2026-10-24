import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FishSpecimenPassportModal } from './FishSpecimenPassportModal'
import { MOROCCAN_FISH } from '../data/fish'

describe('FishSpecimenPassportModal', () => {
  const sampleFish = MOROCCAN_FISH[0]!

  it('renders official specimen passport in Arabic', () => {
    render(<FishSpecimenPassportModal fish={sampleFish} lang="ar" onClose={() => {}} />)
    expect(screen.getByText(/المملكة المغربية · الأطلس المرجعي للمصايد L7OT/i)).toBeInTheDocument()
    expect(screen.getByText(/البطاقة التقنية وجواز المصيد/i)).toBeInTheDocument()
    expect(screen.getByText(/المقاس الأدنى القانوني/i)).toBeInTheDocument()
  })

  it('renders official specimen passport in French', () => {
    render(<FishSpecimenPassportModal fish={sampleFish} lang="fr" onClose={() => {}} />)
    expect(screen.getByText(/Fiche Technique & Passeport Halieutique/i)).toBeInTheDocument()
    expect(screen.getByText(/Taille Min. Légale/i)).toBeInTheDocument()
  })

  it('calls window.print when print button is clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})
    render(<FishSpecimenPassportModal fish={sampleFish} lang="fr" onClose={() => {}} />)
    const printBtn = screen.getByRole('button', { name: /imprimer/i })
    fireEvent.click(printBtn)
    expect(printSpy).toHaveBeenCalled()
    printSpy.mockRestore()
  })
})
