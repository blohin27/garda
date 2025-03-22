import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  CanceledError,
  CancelTokenSource,
  isAxiosError,
} from 'axios'

import {
  ApiAxiosInstance,
  ApiRequestConfig,
  ApiResponse,
  CancelablePromise,
  IApiService,
} from './Api.types.ts'
import { QueryRace } from './Api.utils.ts'

export const DEFAULT_AXIOS_HEADERS = new AxiosHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

export const VITE_BASE_URL = 'https://dummyjson.com'

export class ApiService<E extends Error | AxiosError<EBody> = AxiosError<unknown>, EBody = unknown>
  implements IApiService<E, EBody>
{
  private readonly _instance: ApiAxiosInstance<E, EBody>
  public queryRace = new QueryRace()

  constructor(
    config: Parameters<typeof axios.create>[0],
    transformError: (error: AxiosError<EBody>) => E
  ) {
    this._instance = axios.create({
      timeout: 120000,
      headers: DEFAULT_AXIOS_HEADERS,
      ...config,
    }) as unknown as ApiAxiosInstance<E, EBody>

    this._instance.interceptors.response.use(
      (res) => this._handleResponse(res),
      (error) => this._handleError(error, transformError)
    )
  }

  get instance() {
    return this._instance
  }

  public get<R = any, P = any>(endpoint: string, params?: P, config?: ApiRequestConfig<P>) {
    return this.instancePromise<R>({ url: endpoint, method: 'GET', params }, config)
  }

  public post<R = any, P = any>(endpoint: string, params?: P, config?: ApiRequestConfig<P>) {
    return this.instancePromise<R>({ url: endpoint, method: 'POST', data: params }, config)
  }

  public patch<R = any, P = any>(endpoint: string, params?: P, config?: ApiRequestConfig<P>) {
    return this.instancePromise<R>({ url: endpoint, method: 'PATCH', data: params }, config)
  }

  public put<R = any, P = any>(endpoint: string, params?: P, config?: ApiRequestConfig<P>) {
    return this.instancePromise<R>({ url: endpoint, method: 'PUT', data: params }, config)
  }

  public delete<R = any>(endpoint: string, config?: ApiRequestConfig) {
    return this.instancePromise<R>({ url: endpoint, method: 'DELETE' }, config)
  }

  public instancePromise<R = any, P = any>(
    config: ApiRequestConfig<P>,
    options?: ApiRequestConfig<P>
  ): CancelablePromise<ApiResponse<R, E, EBody>> {
    const source: CancelTokenSource = axios.CancelToken.source()
    const endpoint = `${config.method ?? 'GET'} ${config.url}`

    if (options?.useQueryRace !== false) {
      this.queryRace.apply(endpoint, source.cancel)
    }

    const promise = this._instance({
      ...config,
      ...options,
      cancelToken: source.token,
    }) as CancelablePromise<ApiResponse<R, E, EBody>>

    promise.finally(() => this.queryRace.delete(endpoint))
    promise.cancel = (message) => source.cancel(message ?? 'Query was cancelled')

    return promise
  }

  private _handleResponse<R>(res: ApiResponse<R, E, EBody>): Promise<ApiResponse<R, E, EBody>> {
    return Promise.resolve({
      data: res.data,
      status: res.status,
      axiosResponse: res as unknown as AxiosResponse<R, EBody>,
    })
  }

  private _handleError(
    e: unknown,
    transformError: (error: AxiosError<EBody>) => E
  ): Promise<ApiResponse<undefined, E, EBody>> {
    const axiosError = isAxiosError(e) ? e : undefined
    const status = axiosError?.response?.status || 400

    return Promise.resolve({
      status,
      error: transformError(axiosError!),
      axiosError,
      isCanceled: e instanceof CanceledError,
    })
  }
}

export const apiService = new ApiService(
  { baseURL: `${VITE_BASE_URL}/` },
  (error: AxiosError) => new Error(error.message)
)
