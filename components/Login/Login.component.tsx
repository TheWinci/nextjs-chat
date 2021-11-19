import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { getPublicEnv } from '../../services/env.service'
import { Button } from '../Shared/Button.styles'
import { Input } from '../Shared/Input.styles'
import { maxLength, minLength } from './Login.constants'
import { FlexContainer, FlexItem, Card, FlexColumn, ErrorText } from './Login.styles'

const LoginComponent = () => {
  const router = useRouter()
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm();

  const onSubmit = (data: { username: string, password: string }) => {
    console.log('submit', data)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/')
    }, 1500);
  };

  return (
    <FlexContainer>
      <FlexItem>
        <Card>
          <FlexColumn>
            <h3>{t('title-login')}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register(
                  "username",
                  {
                    required: {
                      value: true,
                      message: t('filed-error-required')
                    },
                    maxLength: {
                      value: maxLength,
                      message: t('filed-error-max-length', { maxLength })
                    },
                    minLength: {
                      value: minLength,
                      message: t('filed-error-min-length', { minLength })
                    }
                  }
                )}
                placeholder={t('user-name')}
                disabled={isLoading}
              />
              <ErrorText>{formErrors?.username?.message || null}</ErrorText>
              <Input
                {...register(
                  "password",
                  {
                    required: {
                      value: true,
                      message: 'This field is required'
                    },
                    maxLength: {
                      value: maxLength,
                      message: `Max allowed length is ${maxLength}`
                    },
                    minLength: {
                      value: minLength,
                      message: `Min allowed length is ${minLength}`
                    }
                  }
                )}
                placeholder={t('password')}
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
              {t('no-account')}
            </p>
            <Link href="/register">
              {t('register')}
            </Link>
          </FlexColumn>
        </Card>
      </FlexItem>
    </FlexContainer>
  )
}

export default LoginComponent

