/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    userCookieName: process.env.USER_COOKIE_NAME
  }
}
