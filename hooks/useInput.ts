import { ChangeEvent, useCallback, useState } from "react"

export function useInput(initialValue: string) {
  const [ value, setValue ] = useState(initialValue)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }, [])

  return {
    value,
    onChange: handleChange,
  }
}
