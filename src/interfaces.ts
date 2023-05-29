export interface IPosition {
  x: number;
  y: number;
}

export interface IPositionsRequest {
  gridSize: number;
  commands: string;
  creatures: IPosition[];
  zombie: IPosition;
}

export interface IPositionsResponse {
  zombies: IPosition[];
  creatures: IPosition[];
}

export interface IBoardData {
  gridSize: number;
  creatures: IPosition[];
  zombies: IPosition[];
  error: string | undefined;
}
