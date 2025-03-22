import { useState } from 'react'
import styles from './styles.module.scss'
import { Box, Skeleton } from '@mui/material'

interface ThumbnailCellProps {
  src: string
}

export const ThumbnailCell: React.FC<ThumbnailCellProps> = ({ src }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Box className={styles.item}>
      {!loaded && <Skeleton width={50} height={50} />}
      <img
        src={src || ''}
        alt="thumbnail"
        width="50"
        height="50"
        style={{ display: loaded ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </Box>
  )
}
