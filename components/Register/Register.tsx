import { t } from 'i18next'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import register from '../../pages/register'
import { maxLength, minLength } from '../Login/Login.constants'
import { FlexColumn, ErrorText } from '../Login/Login.styles'
import { AuthContext } from '../Shared/Account/Auth'
import { Button } from '../Shared/Button.styles'
import { Input } from '../Shared/Input.styles'
import { Spacer } from '../Shared/Spacer.styles'

export const RegisterComponent = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm();
  const account = useContext(AuthContext)

  const onSubmit = (data: { username: string, password: string }) => {
    setIsLoading(true);
    account
      .login(data)
      .catch((error: any) => console.log(error))
      .finally(() => setIsLoading(false))
  };

  const userNameConfig = {
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

  const passwordConfig = {
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

  return (
    <FlexColumn >
      <h3>{t('register')}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexColumn>
          <Input
            {...register("username", userNameConfig)}
            placeholder={t('user-name')}
            disabled={isLoading}
          />
          <ErrorText>{formErrors?.username?.message || null}</ErrorText>
          <Spacer y={1} />
          <Input
            {...register("password", passwordConfig)}
            placeholder={t('password')}
            disabled={isLoading}
            type='password'

          />
          <ErrorText>{formErrors?.password?.message || null}</ErrorText>
          <Spacer y={1} />
          <Button
            type="submit"
            disabled={isLoading}
          >
            {t('register')}
          </Button>
        </FlexColumn>
      </form>
      <p>
        {t('have-account')}
      </p>
      <Link href="/login">
        {t('log-in')}
      </Link>
    </FlexColumn>
  )
}
