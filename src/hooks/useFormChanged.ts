import { useEffect, useState } from 'react'
import { FieldValues, UseFormWatch } from 'react-hook-form'

/**
 * Hook to detect if form values have changed from initial values
 * @param watch - React Hook Form watch function
 * @param initialValues - Initial form values to compare against
 * @param options - Optional configuration
 * @returns Object containing isChanged state and helper functions
 *
 * @example
 * const { isChanged, resetChangeState } = useFormChanged(watch, initialValues);
 * <Button disabled={!isChanged}>Save</Button>
 */
export function useFormChanged<T extends FieldValues>(
  watch: UseFormWatch<T>,
  initialValues: T | null | undefined,
  options?: {
    /**
     * Fields to exclude from comparison
     * Useful for fields that should not trigger the changed state
     */
    excludeFields?: (keyof T)[]
    /**
     * Enable deep comparison for nested objects and arrays
     * Default: true
     */
    deepCompare?: boolean
    /**
     * Custom comparison function
     * Return true if values are equal, false if different
     */
    customCompare?: (current: T, initial: T) => boolean
  },
) {
  const [isChanged, setIsChanged] = useState(false)
  const currentValues = watch()

  useEffect(() => {
    // If no initial values, consider as unchanged
    if (!initialValues) {
      setIsChanged(false)
      return
    }

    // Use custom compare function if provided
    if (options?.customCompare) {
      const areEqual = options.customCompare(currentValues as T, initialValues)
      setIsChanged(!areEqual)
      return
    }

    // Compare current values with initial values
    const hasChanges = compareValues(
      currentValues as T,
      initialValues,
      options?.excludeFields,
      options?.deepCompare ?? true,
    )

    setIsChanged(hasChanges)
  }, [currentValues, initialValues, options?.excludeFields, options?.deepCompare, options?.customCompare])

  /**
   * Manually reset the changed state
   * Useful when you want to mark form as unchanged after save
   */
  const resetChangeState = () => {
    setIsChanged(false)
  }

  /**
   * Manually set the changed state
   */
  const setChangeState = (changed: boolean) => {
    setIsChanged(changed)
  }

  return {
    isChanged,
    resetChangeState,
    setChangeState,
  }
}

/**
 * Deep comparison function for form values
 */
function compareValues<T extends FieldValues>(
  current: T,
  initial: T,
  excludeFields?: (keyof T)[],
  deepCompare = true,
): boolean {
  const currentKeys = Object.keys(current) as (keyof T)[]
  const initialKeys = Object.keys(initial) as (keyof T)[]

  // Get all unique keys
  const allKeys = new Set([...currentKeys, ...initialKeys])

  for (const key of allKeys) {
    // Skip excluded fields
    if (excludeFields?.includes(key)) {
      continue
    }

    const currentValue = current[key]
    const initialValue = initial[key]

    // Check if values are different
    if (!areValuesEqual(currentValue, initialValue, deepCompare)) {
      return true // Changed
    }
  }

  return false // No changes
}

/**
 * Check if two values are equal
 * Handles primitives, objects, arrays, dates, etc.
 */
function areValuesEqual(value1: unknown, value2: unknown, deepCompare: boolean): boolean {
  // Same reference or both null/undefined
  if (value1 === value2) return true

  // One is null/undefined and other is not
  if (value1 == null || value2 == null) return value1 === value2

  // Handle Date objects
  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() === value2.getTime()
  }

  // Handle arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) return false

    if (!deepCompare) {
      return JSON.stringify(value1) === JSON.stringify(value2)
    }

    return value1.every((item, index) => areValuesEqual(item, value2[index], deepCompare))
  }

  // Handle objects
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    if (!deepCompare) {
      return JSON.stringify(value1) === JSON.stringify(value2)
    }

    const keys1 = Object.keys(value1 as object)
    const keys2 = Object.keys(value2 as object)

    if (keys1.length !== keys2.length) return false

    return keys1.every((key) => {
      const obj1 = value1 as Record<string, unknown>
      const obj2 = value2 as Record<string, unknown>
      return areValuesEqual(obj1[key], obj2[key], deepCompare)
    })
  }

  // For primitives and other types
  return value1 === value2
}
