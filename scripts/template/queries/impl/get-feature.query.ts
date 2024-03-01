export class GetFeatureQuery {
  constructor(
    public readonly payload: {
      id: string;
    }
  ) {}
}
