export class Weather {
  constructor(
    public temperature: number,
    public tempMin: number,
    public tempMax: number,
    public humidity: number,
    public windSpeed: number,
    public description: string,
    public temp: string
  ) {}
}
