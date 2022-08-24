import AuthStore from "../stores/AuthStore"
import { noop } from "./noop"

export interface APIRequest extends RequestInit {
  query?: Record<string, any> | URLSearchParams
}

export interface APIResponse<T> extends Response {
  data: T
  textContent: string
  err?: APIError
}

interface APIError {
  code: number
  message: string
  errors: Record<string, string[]>
}

class HTTPClient {
  getAPIBaseURL() {
    return `${process.env.NEXT_PUBLIC_API_HOST}`.replace(/\/+$/, "")
  }

  getAuthHeader() {
    if (!globalThis.localStorage?.AuthStore) return {}

    return {
      Authorization: `${AuthStore._getFromStorage(noop)}`,
    }
  }

  coerceQuery(q: APIRequest["query"]) {
    if (!q) return ""

    const params = new URLSearchParams(q)

    return `?${params}`
  }

  async request<T>(
    method: string,
    endpoint: string,
    data: any,
    options: APIRequest = {}
  ) {
    const res = await fetch(
        `${this.getAPIBaseURL()}${endpoint}${this.coerceQuery(options.query)}`,
        {
          method,
          body: data ? JSON.stringify(data) : undefined,
          ...options,
          headers: {
            ...this.getAuthHeader(),
            ...options.headers,
            ...(data ? { "Content-Type": "application/json" } : {}),
          } as any,
        }
      ),
      text = await res.text()

    let json,
      toReturn: APIResponse<T> = res as any

    try {
      json = JSON.parse(text)
    } catch {
      json = null
    }

    if (!res.ok) {
      toReturn.err = json
    }

    toReturn.data = json
    toReturn.textContent = text

    return toReturn
  }
}

type MethodShorthand = <T>(
  endpoint: string,
  data?: any,
  options?: APIRequest
) => Promise<APIResponse<T>>

interface HTTPClient {
  get: MethodShorthand
  patch: MethodShorthand
  post: MethodShorthand
  put: MethodShorthand
  delete: MethodShorthand
  head: MethodShorthand
}

for (const method of ["GET", "PATCH", "POST", "PUT", "DELETE", "HEAD"]) {
  HTTPClient.prototype[method.toLowerCase() as "get"] = async function (
    this: HTTPClient,
    endpoint: string,
    data: any = null,
    options: RequestInit = {}
  ) {
    return this.request(method, endpoint, data, options)
  } as any
}

export default new HTTPClient()
