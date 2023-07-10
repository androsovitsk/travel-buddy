import { useState, useRef, useCallback } from 'react'

/**
 * React hook to handle a Material UI Popper instance.
 */
const usePopper = () => {
  const ref = useRef<HTMLDivElement>()
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleOpen = useCallback(() => {
    setAnchorEl(ref.current)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return {
    isOpen: Boolean(anchorEl),
    ref,
    anchorEl,
    handleOpen,
    handleClose
  }
}

export default usePopper
