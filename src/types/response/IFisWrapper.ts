export interface IFisWrapper<T = any> {
    code: SERVICE_CODE,
    message ?: string,
    status: SERVICE_STATUS,
    timestamp: number,
    elapsedTimeMs: number,
    path: string,
    requestId: string,
    data : T
}

export enum SERVICE_CODE {
  SUCESS = 'API-000',      
  FAIL = 'API-001'
}

export enum SERVICE_STATUS {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
