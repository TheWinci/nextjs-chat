export const get = (url) => fetch(url).then((res) => res.json())

export const post = (url, bodyObject) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject)
  })
    .then((res) => res.json())


export const put = (url, bodyObject) =>
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject)
  })
    .then((res) => res.json())