export type WeatherErrorKind =
  | 'no-internet'
  | 'not-found'
  | 'rate-limit'
  | 'timeout'
  | 'unknown';

export class WeatherError extends Error {
  kind: WeatherErrorKind;

  constructor(kind: WeatherErrorKind, message: string) {
    super(message);
    this.name = 'WeatherError';
    this.kind = kind;
  }
}
