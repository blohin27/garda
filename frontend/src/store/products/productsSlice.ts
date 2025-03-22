import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProductState } from './types.ts'
import { fetchProducts } from './productsAsyncThunks.ts'

const initialState: IProductState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 10,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<{ limit: number; skip: number }>) => {
      state.limit = action.payload.limit
      state.skip = action.payload.skip
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (!action.payload) return
        state.products = action.payload.products
        state.total = action.payload.total
        state.loading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка загрузки'
      })
  },
})

export const { setPagination } = productsSlice.actions
