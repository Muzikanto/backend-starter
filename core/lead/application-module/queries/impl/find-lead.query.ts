export class FindLeadQuery {
  constructor(public readonly payload: { limit: number; offset?: number }) {}
}
