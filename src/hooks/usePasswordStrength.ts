import { useMemo } from 'react'

export interface PasswordRule {
  id: string
  label: string
  test: (password: string) => boolean
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4
  strength: 'weak' | 'medium' | 'strong' | 'very-strong'
  rules: Array<{ id: string; label: string; passed: boolean }>
  percentage: number
}

// Default password validation rules (2025 standards)
export const DEFAULT_PASSWORD_RULES: PasswordRule[] = [
  {
    id: 'minLength',
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter (A-Z)',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter (a-z)',
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    label: 'One number (0-9)',
    test: (password) => /[0-9]/.test(password),
  },
  {
    id: 'special',
    label: 'One special character (!@#$%^&*)',
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
  {
    id: 'noCommon',
    label: 'No common patterns',
    test: (password) => {
      const commonPatterns = [
        /^123+/i,
        /^abc+/i,
        /password/i,
        /qwerty/i,
        /admin/i,
        /letmein/i,
        /welcome/i,
        /monkey/i,
        /dragon/i,
      ]
      return !commonPatterns.some((pattern) => pattern.test(password))
    },
  },
]

/**
 * Custom hook to calculate password strength and validate rules
 * @param password - The password string to validate
 * @param customRules - Optional custom validation rules (defaults to DEFAULT_PASSWORD_RULES)
 * @returns Password strength information including score, strength level, and rule validation status
 */
export function usePasswordStrength(password: string, customRules?: PasswordRule[]): PasswordStrength {
  const rules = customRules || DEFAULT_PASSWORD_RULES

  return useMemo(() => {
    // Validate each rule
    const validatedRules = rules.map((rule) => ({
      id: rule.id,
      label: rule.label,
      passed: rule.test(password),
    }))

    // Calculate score (0-4) based on passed rules
    const passedCount = validatedRules.filter((r) => r.passed).length
    const totalRules = rules.length

    // Score calculation
    let score: 0 | 1 | 2 | 3 | 4
    if (passedCount === 0 || password.length === 0) {
      score = 0
    } else if (passedCount <= Math.ceil(totalRules * 0.33)) {
      score = 1 // weak
    } else if (passedCount <= Math.ceil(totalRules * 0.66)) {
      score = 2 // medium
    } else if (passedCount < totalRules) {
      score = 3 // strong
    } else {
      score = 4 // very strong
    }

    // Determine strength label
    const strengthMap: Record<number, 'weak' | 'medium' | 'strong' | 'very-strong'> = {
      0: 'weak',
      1: 'weak',
      2: 'medium',
      3: 'strong',
      4: 'very-strong',
    }

    const strength = strengthMap[score]

    // Calculate percentage (0-100)
    const percentage = password.length === 0 ? 0 : Math.round((passedCount / totalRules) * 100)

    return {
      score,
      strength,
      rules: validatedRules,
      percentage,
    }
  }, [password, rules])
}
