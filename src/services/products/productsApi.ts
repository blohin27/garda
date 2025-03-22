import { IProductResponse } from '../../store/products/types.ts'
import { apiService } from '../api'

type FetchProductsParams = {
  limit: number
  skip: number
}

export const fetchProductsApi = async ({ limit, skip }: FetchProductsParams) => {
  const response = await apiService.get<IProductResponse>('/products', { limit, skip })
  if (response.isCanceled) {
    console.log('Запрос отменён')
    return null
  }

  if (response.error) {
    console.error('Ошибка запроса:', response.error)
    throw response.error
  }

  return response.data
}
