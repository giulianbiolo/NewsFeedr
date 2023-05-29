export default interface HttpResponse {
  url?: string;
  statusCode?: number;
  statusMessage?: string;
  data?: any;
  error?: any;
}
