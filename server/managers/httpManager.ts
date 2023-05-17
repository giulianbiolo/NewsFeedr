class HttpManager {
  private baseApiUrl: string;

  constructor(baseApiUrl: string) {
    this.baseApiUrl = baseApiUrl;
  }

  public async get<T>(url?: string, headers?: HeadersInit): Promise<T | Response> {
    url = url || '';
    const apiUrl = `${this.baseApiUrl}/${url}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`Error getting data from ${apiUrl}: ${response.statusText}`);
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json() as T;
      return data;
    } else {
      return response as Response;
    }
  }

  public async post<T>(url?: string, data?: any, headers?: HeadersInit): Promise<T | Response> {
    url = url || '';
    const apiUrl = `${this.baseApiUrl}/${url}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data || '')
    });

    if (!response.ok) {
      throw new Error(`Error posting data to ${apiUrl}: ${response.statusText}`);
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      const responseData = await response.json() as T;
      return responseData;
    } else {
      return response as Response;
    }
  }
}

export default HttpManager;
