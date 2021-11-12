import { Button, Card, Input, Typography } from 'antd';
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router';
import { FC, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getPublicEnv } from '../services/env.service';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components'
import Link from 'antd/lib/typography/Link';
import { Controller, useForm } from "react-hook-form";

const userIcon = (<UserOutlined />)
const passwordIcon = (<LockOutlined />)

const Login: NextPage = () => {
  const [_cookies, setCookie] = useCookies([getPublicEnv('userCookieName')]);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const watchFields = watch(["username", "password"]);

  const handleLogMeIn = (data: any) => console.log('data', data)

  console.log(watch(["username", "password"]));

  return (
    <FlexContainer>
      <FlexItem>
        <Card>
          <FlexColumn>
            <Title level={3}>Login</Title>
            <form onSubmit={handleSubmit(handleLogMeIn)}>
              <Controller
                name="username"
                control={control}
                render={({ field }) =>
                  <Input
                    allowClear
                    placeholder='username'
                    size='large'
                    disabled={isLoading}
                    prefix={userIcon}
                    {...field}
                  />
                }
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) =>
                  <Input.Password
                    allowClear
                    placeholder='password'
                    size='large'
                    disabled={isLoading}
                    prefix={passwordIcon}
                    {...field}
                  />
                }
              />
              <FullWidthButton
                type="primary"
                size='large'
                htmlType='submit'
              >
                Log in
              </FullWidthButton>
            </form>
            <Typography>
              Dont have an account?
            </Typography>
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

const FullWidthButton = styled(Button)`
  width: 100%
`

