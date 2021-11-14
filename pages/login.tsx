import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { getPublicEnv } from '../services/env.service';
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import Link from 'next/link'

const errorsTexts: Record<string, any> = {
  'required': 'This field is required',
  'maxLength': (maxLength: number) => `Max allowed length is ${maxLength}`,
  'minLength': (minLength: number) => `Min allowed length is ${minLength}`,
}
const lengths: Record<string, number> = {
  'maxLength': 256,
  'minLength': 3
}

const Login: NextPage = () => {
  const [_cookies, setCookie] = useCookies([getPublicEnv('userCookieName')]);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors: formErrors }
  } = useForm();

  const onSubmit = (data: any) => console.log('submit', data);
  const onError = (errors: any) =>
    Object
      .keys(errors)
      .forEach(
        key => setError(
          key,
          {
            type: errors[key].type,
            message: errors[key].type === 'required'
              ? errorsTexts[errors[key].type]
              : errorsTexts[errors[key].type](lengths[errors[key].type])
          },
          { shouldFocus: true }
        )
      );

  console.log(`formErrors`, formErrors)
  return (
    <FlexContainer>
      <FlexItem>
        <div>
          <FlexColumn>
            <h3>Login</h3>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <input
                {
                ...register(
                  "username",
                  {
                    required: true,
                    maxLength: 256,
                    minLength: 3
                  }
                )
                }
                placeholder='username'
                disabled={isLoading}
              />
              <ErrorText>{formErrors?.username?.message || null}</ErrorText>
              <input
                {
                ...register(
                  "password",
                  {
                    required: true,
                    maxLength: 256,
                    minLength: 3
                  }
                )
                }
                placeholder='password'
                disabled={isLoading}
              />
              <ErrorText>{formErrors?.password?.message || null}</ErrorText>
              <FullWidthButton type="submit">
                Log in
              </FullWidthButton>
            </form>
            <p>
              Dont have an account?
            </p>
            <Link href="/register">
              Register
            </Link>
          </FlexColumn>
        </div>
      </FlexItem>
    </FlexContainer>
  )
}

export default Login

const FlexContainer = styled.div`
  display: flex;
  height: 100%;
`

const FlexItem = styled.div`
  margin: auto;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin: auto;
`

const FullWidthButton = styled.button`
  width: 100%;
`

const ErrorText = styled.p`
  color: red;
  margin: 0;
  font-size: 12px;
`