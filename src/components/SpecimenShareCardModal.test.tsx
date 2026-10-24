import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SpecimenShareCardModal } from './SpecimenShareCardModal'
import { MOROCCAN_FISH } from '../data/fish'

describe('SpecimenShareCardModal', () => {
  it('renders card title and action buttons', () => {
    const sardine = MOROCCAN_FISH[0]!
    const onClose = vi.fn()

    render(<SpecimenShareCardModal fish={sardine} lang="fr" onClose={onClose} />)

    expect(screen.getByText(/Passeport Spécimen Partageable/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Partager sur WhatsApp/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Télécharger la carte HD/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Copier l’image/i })).toBeInTheDocument()
  })

  it('triggers WhatsApp share link', () => {
    const sardine = MOROCCAN_FISH[0]!
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(<SpecimenShareCardModal fish={sardine} lang="fr" onClose={vi.fn()} />)

    const whatsappBtn = screen.getByRole('button', { name: /Partager sur WhatsApp/i })
    fireEvent.click(whatsappBtn)

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('api.whatsapp.com/send'),
      '_blank'
    )
    openSpy.mockRestore()
  })
})
