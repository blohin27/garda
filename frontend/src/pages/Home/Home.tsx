import { FC, memo, useCallback, useState } from 'react'
import { Box, CircularProgress, Fade, Switch, Typography, TextField, Stack } from '@mui/material'
import { useAppSelector } from '../../hooks/redux.ts'
import { DataTableProducts } from '../../components'
import styles from './styles.module.scss'

export const Home: FC = memo(() => {
  const loading = useAppSelector((state) => state.products.loading)
  const [autoUpdate, setAutoUpdate] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleToggle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoUpdate(event.target.checked)
  }, [])

  return (
    <Box className={styles.wrapper}>
      <Typography variant="h4" gutterBottom>
        Продукты
      </Typography>
      <Stack spacing={2} direction="column" maxWidth={400}>
        <TextField
          label="Название"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Описание"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>Автообновление</Typography>
        <Switch checked={autoUpdate} onChange={handleToggle} />
        <Fade in={loading} unmountOnExit>
          <CircularProgress size={20} />
        </Fade>
      </Stack>

      <DataTableProducts autoUpdate={autoUpdate} title={title} description={description} />
    </Box>
  )
})
