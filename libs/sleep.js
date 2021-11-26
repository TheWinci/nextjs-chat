export const sleepResolve = (milliseconds) => {
  return new Promise((resolve) => setTimeout(() => resolve('sleepResolve'), milliseconds))
}

export const sleepReject = (milliseconds) => {
  return new Promise((_, reject) => setTimeout(() => reject('sleepReject'), milliseconds))
}