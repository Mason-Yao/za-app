import { IPositionsRequest, IPositionsResponse } from "../interfaces";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const getPositions = async (positionsRequest: IPositionsRequest): Promise<IPositionsResponse> => {
  try {
    const response: AxiosResponse<IPositionsResponse> = await axios.post(
      "/v1/positions",
      positionsRequest
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

