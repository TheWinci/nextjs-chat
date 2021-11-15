import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { getPublicEnv } from '../services/env.service';
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { Card, ErrorText, FlexColumn, FlexContainer, FlexItem } from '../components/Login/Login.styles';
import { errorsTexts, lengths } from '../components/Login/Login.constants';
import { Input } from '../components/Shared/Input.styles';
import { Button } from '../components/Shared/Button.styles';

const Login: NextPage = () => {
  const [_cookies, setCookie] = useCookies([getPublicEnv('userCookieName')]);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: formErrors }
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('submit', data)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  };

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

  return (
    <FlexContainer>
      <FlexItem>
        <Card>
          <FlexColumn>
            <h3>Login</h3>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Input
                {...register(
                  "username",
                  {
                    required: true,
                    maxLength: 256,
                    minLength: 3
                  }
                )}
                placeholder='username'
                disabled={isLoading}
              />
              <ErrorText>{formErrors?.username?.message || null}</ErrorText>
              <Input
                {...register(
                  "password",
                  {
                    required: true,
                    maxLength: 256,
                    minLength: 3
                  }
                )}
                placeholder='password'
                disabled={isLoading}
                type={'password'}
              />
              <ErrorText>{formErrors?.password?.message || null}</ErrorText>
              <Button type="submit" disabled={isLoading}>
                {
                  isLoading &&
                  'Loading...' ||
                  'Log in'
                }
              </Button>
            </form>
            <p>
              Dont have an account?
            </p>
            <Link href="/register">
              Register
            </Link>
          </FlexColumn>
        </Card>
      </FlexItem>
    </FlexContainer>
  )
}

export default Login
