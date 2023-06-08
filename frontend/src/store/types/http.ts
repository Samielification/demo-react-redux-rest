export type ILoadingStatusCode = "pending" | "fulfilled" | "rejected" | "idle";

interface ILoadingStatusCodes {
  pending: ILoadingStatusCode,
  fulfilled: ILoadingStatusCode,
  rejected: ILoadingStatusCode,
  idle: ILoadingStatusCode,
}

export const loadingStatusCodes: ILoadingStatusCodes = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
  idle: "idle",
}