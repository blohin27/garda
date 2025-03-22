import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProductState } from './types.ts'
import { fetchProductsApi } from '../../services'

export const fetchProducts = createAsyncThunk('products/fetch', async (_, { getState }) => {
  const { products } = getState() as { products: IProductState }
  return await fetchProductsApi({
    limit: products.limit,
    skip: products.skip,
  })
})
