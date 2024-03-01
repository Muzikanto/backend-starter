export type IWsResponse<Data = any> = {
  error: Error | null;
  data: Data | null;
  status: number;
};

export class WsResponse<Data = any> implements IWsResponse<Data> {
  public data: Data | null = null;
  public error: Error | null = null;
  public status: number;

  constructor(payload: { error?: Error; data?: Data; status: number }) {
    this.status = payload.status;
    this.data = payload.data || null;
    this.error = payload.error || null;
  }
}
