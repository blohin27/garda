import { GridColDef } from '@mui/x-data-grid'
import { IProduct } from '../../store/products/types.ts'
import { ThumbnailCell } from '../ThumbnailCell'

const columnNames: Record<keyof IProduct, string> = {
  id: 'ID',
  title: 'Название',
  description: 'Описание',
  price: 'Цена',
  discountPercentage: 'Скидка %',
  rating: 'Рейтинг',
  stock: 'В наличии',
  brand: 'Бренд',
  category: 'Категория',
  thumbnail: 'Изображение',
  images: 'Фотографии',
}

export const productColumns: GridColDef[] = Object.keys(columnNames)
  .filter((key) => key !== 'images')
  .map((key) => {
    if (key === 'title') {
      return {
        field: key,
        headerName: columnNames[key as keyof IProduct],
        width: 250,
        sortable: false,
      }
    }
    if (key === 'thumbnail') {
      return {
        field: key,
        headerName: columnNames[key as keyof IProduct],
        width: 120,
        sortable: false,
        renderCell: (params) => <ThumbnailCell src={params.value} />,
      }
    }
    if (key === 'id') {
      return {
        field: key,
        headerName: columnNames[key as keyof IProduct],
        width: 50,
        sortable: false,
      }
    }

    return {
      field: key,
      headerName: columnNames[key as keyof IProduct],
      width: key === 'description' ? 300 : 100,
      type: typeof ({} as IProduct)[key as keyof IProduct] === 'number' ? 'number' : 'string',
    }
  })

export const russianLocaleText = {
  noRowsLabel: 'Нет данных',
  noResultsOverlayLabel: 'Результатов не найдено',
  toolbarDensity: 'Размер строк',
  toolbarDensityLabel: 'Размер строк',
  toolbarDensityCompact: 'Компактный',
  toolbarDensityStandard: 'Стандартный',
  toolbarDensityComfortable: 'Комфортный',
  toolbarColumns: 'Столбцы',
  toolbarColumnsLabel: 'Выбор столбцов',
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать фильтры',
  toolbarExport: 'Экспорт',
  toolbarExportLabel: 'Скачать',
  toolbarExportCSV: 'Скачать CSV',
  columnsPanelTextFieldLabel: 'Поиск столбца',
  columnsPanelTextFieldPlaceholder: 'Название столбца',
  columnsPanelDragIconLabel: 'Перетащить для изменения порядка',
  footerRowSelected: (count: number) => `${count} выбрано`,
  footerTotalRows: 'Всего строк:',
  footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
    `${visibleCount} из ${totalCount}`,
  MuiTablePagination: {
    labelRowsPerPage: 'Строк на странице:',
    labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
      `${from}–${to} из ${count}`,
  },
}
