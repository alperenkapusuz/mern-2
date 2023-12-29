import { http } from "@/config/axios";
import { END_POINTS } from "@/constants/end-points";
import { Response } from "@/interface/response/response.interface";

export const loginUserFn = async (value: ILoginBody) => {
    const response = await http.POST<Response<string>>(END_POINTS.AUTH.LOGIN, value);
    return response;
}

export const registerUserFn = async (value: IRegisterBody) => {
    const response = await http.POST<Response>(END_POINTS.AUTH.REGISTER, value);
    return response;
}