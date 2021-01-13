import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ILoginResponse, login } from "@api/auth";
import Cookies from "universal-cookie";
import { useRouter } from "next/dist/client/router";

const Wrapper = styled.div`
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const SubmitButton = styled.button`
  margin: 24px 0;
`;

interface ILoginForm {
  username: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    console.log(data);

    try {
      const { playbackToken }: ILoginResponse = await login();
      // playbackToken 을 cookie 에 저장한다
      const cookies = new Cookies();
      cookies.set("playbackToken", playbackToken, { path: "/" });

      // private video route 로 이동
      router.push("/privateVideo");
    } catch (error) {
      throw error;
    }
  };

  return (
    <Wrapper>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>username</label>
        <input name="username" ref={register} />
        <br />
        <label>password</label>
        <input type="password" name="password" ref={register} />
        <SubmitButton type="submit">submit</SubmitButton>
      </Form>
    </Wrapper>
  );
}
