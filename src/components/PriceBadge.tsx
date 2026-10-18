import React from 'react'
import type { SupportedLanguage } from '../i18n/strings'

interface PriceBadgeProps {
  amount: number | string
  unit?: 'kg' | 'piece' | 'none'
  lang: SupportedLanguage
  className?: string
  amountClassName?: string
  unitClassName?: string
}

/**
 * PriceBadge
 * Guaranteed RTL/LTR typography for Moroccan seafood pricing.
 * In Arabic (RTL): renders [Amount] [درهم / كلغ] with the number strictly on the right (first read in Arabic).
 * In French/English (LTR): renders [Amount] [MAD/kg] with the number on the left.
 */
export const PriceBadge: React.FC<PriceBadgeProps> = ({
  amount,
  unit = 'kg',
  lang,
  className = '',
  amountClassName = '',
  unitClassName = '',
}) => {
  const isArabic = lang === 'ar'

  const unitLabel = isArabic
    ? unit === 'kg'
      ? 'درهم / كلغ'
      : unit === 'piece'
      ? 'درهم / حبة'
      : 'درهم'
    : unit === 'kg'
    ? 'MAD/kg'
    : unit === 'piece'
    ? 'MAD/pc'
    : 'MAD'

  if (isArabic) {
    return (
      <span
        dir="rtl"
        className={`inline-flex items-baseline gap-1 font-mono ${className}`}
      >
        <span className={`font-bold ${amountClassName}`}>{amount}</span>
        <span className={`text-[0.75em] font-normal text-[#a69b8d] ${unitClassName}`}>
          {unitLabel}
        </span>
      </span>
    )
  }

  return (
    <span
      dir="ltr"
      className={`inline-flex items-baseline gap-1 font-mono ${className}`}
    >
      <span className={`font-bold ${amountClassName}`}>{amount}</span>
      <span className={`text-[0.75em] font-normal text-[#a69b8d] ${unitClassName}`}>
        {unitLabel}
      </span>
    </span>
  )
}
