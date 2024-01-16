import { isEmptyObj } from './isEmptyObj'

export const BASE_URL = '/api'

// APIのレスポンスの型
type Res<T> = {
  message: string
  data: T
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

// HttpErrorのクラス
export class HttpError extends Error {
  url: string
  status: number
  message: string
  constructor(response: Response, resJson?: Res<any>) {
    super()
    this.name = 'HttpError'
    this.url = response.url
    this.status = response.status
    this.message = resJson?.message || ''
  }
}

// 全てのAPIのリクエストを行う関数
export const fetchApi = async <T>(
  url: string,
  method: Method,
  params?: Record<string, any>,
  headers?: Record<string, string>,
): Promise<T> => {
  let requestUrl = url
  let requestParams = { ...params }
  let requestHeaders = headers || {}

  if (method === 'GET') {
    // /example/1 -> /example/1?searchWord="あああ"
    if (!isEmptyObj(requestParams)) {
      requestUrl += `?${Object.entries(requestParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
      requestParams = {}
    }
  }

  // リクエストパラメータが存在する
  if (!isEmptyObj(requestParams)) {
    requestHeaders['Content-Type'] = 'application/json'
  }

  let result: Res<object> | undefined
  try {
    // fetch処理
    const res = await fetch(encodeURI(`${BASE_URL}${requestUrl}`), {
      method,
      body: isEmptyObj(requestParams)
        ? undefined
        : JSON.stringify(requestParams),
      headers: { ...requestHeaders },
    })

    // catch出来ないエラーの処理
    if (!res.ok) {
      const json = (await res.json()) as Res<any>
      throw new HttpError(res, json)
    }

    // レスポンスのjsonを取得
    result = await res.json()
  } catch (error) {
    // エラーを投げる
    if (error instanceof HttpError) {
      throw error
    }
    throw error
  }

  // レスポンスを返す
  return (result ? result.data : result) as unknown as T
}

// GET, POST, PUT, DELETEの関数を定義
export const getApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'GET', params, headers)

export const postApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'POST', params, headers)

export const putApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'PUT', params, headers)

export const deleteApi = async (
  url: string,
  params?: any,
  headers?: Record<string, string>,
) => fetchApi<undefined>(url, 'DELETE', params, headers)
