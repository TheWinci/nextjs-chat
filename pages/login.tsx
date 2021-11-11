import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router';
import { useCookies } from 'react-cookie';
import { getPublicEnv } from '../services/env.service';

const Login: NextPage = () => {
  const [_cookies, setCookie] = useCookies([getPublicEnv('userCookieName')]);
  const router = useRouter()

  const handleLogMeIn = () => {
    setCookie(getPublicEnv('userCookieName'), 'true')
    router.push('/')
  }
  
  return (
    <div>
      LOGIN
      <button onClick={handleLogMeIn}>
        LOG ME IN
      </button>
    </div>
  )
}

export default Login
