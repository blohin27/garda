export interface IProduct {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface IProductResponse {
  products: IProduct[]
  total: number
  skip: number
  limit: number
}

export interface IProductState {
  products: IProduct[]
  loading: boolean
  error: string | null
  total: number
  skip: number
  limit: number
}
