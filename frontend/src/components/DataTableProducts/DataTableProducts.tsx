import { DataGrid, GridPaginationModel } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { FC, memo, useCallback, useMemo } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts'
import { productColumns, russianLocaleText } from './columns.tsx'
import { fetchProducts, setPagination } from '../../store'
import { useFetchProducts } from './hooks'

interface ITableProps {
  autoUpdate: boolean
  title?: string
  description?: string
}

const RATE_UPDATE = 30
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]
const DATA_GRID_SX = { border: 0 }

export const DataTableProducts: FC<ITableProps> = memo(({ autoUpdate, title, description }) => {
  const dispatch = useAppDispatch()
  const { products, skip, total, limit, loading } = useAppSelector((state) => state.products)

  const updateProducts = useCallback(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useFetchProducts(updateProducts, autoUpdate, RATE_UPDATE * 1000)

  const handlePaginationChange = useCallback(
    (model: GridPaginationModel) => {
      dispatch(setPagination({ limit: model.pageSize, skip: model.page * model.pageSize }))
      updateProducts()
    },
    [dispatch, updateProducts]
  )

  const paginationModel = useMemo(() => {
    return {
      page: skip / limit,
      pageSize: limit,
    }
  }, [skip, limit])

  const filteredProducts = useMemo(() => {
    if (!title?.trim() && !description?.trim()) return products

    return products.filter((product) => {
      const matchesTitle = title?.trim()
        ? product.title.toLowerCase().includes(title.toLowerCase())
        : true

      const matchesDescription = description?.trim()
        ? product.description.toLowerCase().includes(description.toLowerCase())
        : true

      return matchesTitle && matchesDescription
    })
  }, [products, title, description])

  return (
    <Paper className={styles.paper}>
      <DataGrid
        rows={filteredProducts}
        columns={productColumns}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        paginationMode="server"
        rowCount={total}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        localeText={russianLocaleText}
        loading={loading}
        sx={DATA_GRID_SX}
      />
    </Paper>
  )
})
