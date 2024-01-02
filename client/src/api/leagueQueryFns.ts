import { http } from '@/config/axios';
import { END_POINTS } from '@/constants/end-points';
import { ILeagueBody } from '@/interface/body/leagueBody.interface';
import { ILeagueResponse } from '@/interface/response/league.interface';
import { Response } from '@/interface/response/response.interface';

export const leagueGetFn = async () => {
  const response = await http.GET<Response<Array<ILeagueResponse>>>(END_POINTS.LEAGUE.GET);
  return response.data;
};

export const leagueCreateFn = async (values: ILeagueBody) => {
  const response = await http.POST<Response>(END_POINTS.LEAGUE.CREATE, values);
  return response.data;
};
