import { http } from "@/config/axios";
import { END_POINTS } from "@/constants/end-points";
import { Response } from "@/interface/response/response.interface";

export const loginUser = async (value: ILoginBody) => {
    const response = await http.POST<Response>(END_POINTS.AUTH.LOGIN, value);
    return response;
}

export const registerUser = async (value: IRegisterBody) => {
    const response = await http.POST<Response<string>>(END_POINTS.AUTH.REGISTER, value);
    return response;
}