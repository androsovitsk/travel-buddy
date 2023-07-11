import React from 'react'
import Box from '@mui/material/Box'
import Popper from '@mui/material/Popper'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import MenuItem from '@mui/material/MenuItem'
import IDestinationData from '../../../../../../../../types/IDestinationData'

interface ICitySuggestionPopperProps {
  anchorEl: HTMLElement
  isOpen: boolean
  isLoading: boolean
  options: IDestinationData[]
  onMenuItemClick: (optionName: string) => void
}

const CitySuggestionPopper: React.FC<ICitySuggestionPopperProps> = ({
  anchorEl,
  isOpen,
  isLoading,
  options,
  onMenuItemClick
}) => {
  return (
    <Popper
      sx={{ width: '320px', zIndex: 1300 }}
      open={isOpen}
      anchorEl={anchorEl}
    >
      <Paper sx={{ padding: 1 }}>
        {isLoading ? (
          <Box
            sx={{
              padding: 1,
              '& > MuiSkeleton:not(last-child)': { marginBottom: 1 }
            }}
            data-testid={'loadingSkeletons'}
          >
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
          </Box>
        ) : (
          options.map((option) => (
            <MenuItem
              key={option.name}
              sx={{
                '&:hover': {
                  border: 1,
                  borderRadius: 2,
                  borderColor: 'info.main',
                  backgroundColor: 'info.main'
                }
              }}
              onClick={() => onMenuItemClick(option.name)}
            >
              {option.name}
            </MenuItem>
          ))
        )}
      </Paper>
    </Popper>
  )
}

CitySuggestionPopper.displayName = 'CitySuggestionPopper'

export default CitySuggestionPopper
