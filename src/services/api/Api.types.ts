import {
  Axios,
  AxiosDefaults,
  AxiosError,
  AxiosHeaderValue,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  HeadersDefaults,
  InternalAxiosRequestConfig,
} from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    skipInterceptError?: boolean
  }
}

export interface ApiAxios<R, E extends Error | AxiosError<EBody>, EBody = unknown>
  extends Omit<Axios, 'interceptors'> {
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>
    response: AxiosInterceptorManager<ApiResponse<R, E, EBody>>
  }
}

export interface ApiRequestConfig<P = any> extends Partial<AxiosRequestConfig<P>> {
  useQueryRace?: boolean
}

export interface ApiAxiosInstance<E extends Error | AxiosError<EBody>, EBody = unknown>
  extends ApiAxios<unknown, E, EBody> {
  <T = any, R = AxiosResponse<T>, D = any>(config: ApiRequestConfig<D>): Promise<R>

  <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: ApiRequestConfig<D>): Promise<R>

  defaults: Omit<AxiosDefaults, 'headers'> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue
    }
  }
}

export interface CancelablePromise<T> extends Promise<T> {
  cancel: Canceler
}

export interface ApiResponse<
  R,
  E extends Error | AxiosError<unknown> = AxiosError<unknown>,
  EBody = unknown,
> {
  data?: R
  status: number
  error?: E
  isCanceled?: boolean
  axiosError?: AxiosError<EBody>
  axiosResponse?: AxiosResponse<R>
}

export interface IApiService<
  E extends Error | AxiosError<EBody> = AxiosError<unknown>,
  EBody = unknown,
> {
  readonly instance: ApiAxiosInstance<E, EBody>

  get<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: ApiRequestConfig<P>
  ): CancelablePromise<ApiResponse<R, E, EBody>>

  post<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: ApiRequestConfig<P>
  ): CancelablePromise<ApiResponse<R, E, EBody>>

  patch<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: ApiRequestConfig<P>
  ): CancelablePromise<ApiResponse<R, E, EBody>>

  put<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: ApiRequestConfig<P>
  ): CancelablePromise<ApiResponse<R, E, EBody>>

  delete<R = any>(
    endpoint: string,
    config?: ApiRequestConfig
  ): CancelablePromise<ApiResponse<R, E, EBody>>

  instancePromise<R = any, P = any>(
    config: ApiRequestConfig<P>,
    options?: ApiRequestConfig<P>
  ): CancelablePromise<ApiResponse<R, E, EBody>>
}
