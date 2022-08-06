export interface Repository<T> {
  (signal?: AbortSignal): T;
}
