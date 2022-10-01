import AuthStore from "../stores/AuthStore"
import { AbortCodes, Constants } from "./constants"
import { noop } from "./noop"

export interface APIRequest extends RequestInit {
  query?: Record<string, any> | URLSearchParams
  kickOnUnauthorized?: boolean
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
    return `${Constants.API_HOST}`.replace(/\/+$/, "")
  }

  getHeaders() {
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
            ...this.getHeaders(),
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

      if (
        res.status === 401 /* Unauthorized */ &&
        (options.kickOnUnauthorized || options.kickOnUnauthorized === undefined)
      ) {
        throw AbortCodes.MUST_LOGIN
      } else {
        throw new HTTPError(res, json)
      }
    }

    toReturn.data = json
    toReturn.textContent = text

    return toReturn
  }
}

export class HTTPError extends Error {
  name = "HTTPError"
  code: string
  status: number
  err: APIError

  constructor(res: Response, err: APIError) {
    super()

    this.name = err.code === 0 ? this.name : `HTTPError[${err.code}]`
    this.message = err.message
    this.err = err
    this.status = res.status

    this.code = `${res.status} ${res.statusText}`
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
