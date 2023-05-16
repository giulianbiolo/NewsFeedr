class HttpManager {
  private baseApiUrl: string;

  constructor(baseApiUrl: string) {
    this.baseApiUrl = baseApiUrl;
  }

  public async get<T>(url: string, headers?: HeadersInit): Promise<T> {
    const apiUrl = `${this.baseApiUrl}/${url}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`Error getting data from ${apiUrl}: ${response.statusText}`);
    }

    const data = await response.json() as T;
    return data;
  }

  public async post<T>(url: string, data: any, headers?: HeadersInit): Promise<T> {
    const apiUrl = `${this.baseApiUrl}/${url}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error posting data to ${apiUrl}: ${response.statusText}`);
    }

    const responseData = await response.json() as T;
    return responseData;
  }
}

export default HttpManager;
