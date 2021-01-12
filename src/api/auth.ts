import serviceClient from "./index";

export interface ILoginResponse {
  playbackToken: string;
}

export const login = async (): Promise<ILoginResponse> => {
  try {
    const { data } = await serviceClient.get("/auth/fakelogin");

    return data;
  } catch (error) {
    throw error;
  }
};
