document.addEventListener('DOMContentLoaded', () => {
  console.log('hello from the browser JavaScript')

  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }

  const signUpButton = document.querySelector('.sign-up-button')
  const signInButton = document.querySelector('.sign-in-button')
  const loggedOutButton = document.querySelector('.logged-out-button')
  const editProfileButton = document.querySelector('.edit-profile-button')

  function getElementValue(className) {
    return document.querySelector(className).value
  }

  const signUpFunc = () => {
    const name = getElementValue('.name-sign-up')
    const email = getElementValue('.email-sign-up')
    const password = getElementValue('.password-sign-up')
    const redirectQuery = window.location.href.split('?')[1]
    const url = `/sign-up?${redirectQuery}`
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((response) => {
        window.location.pathname = response.REDIRECT_URL
      })
      .catch(console.log)
  }

  const signInFunc = () => {
    const email = getElementValue('.email-sign-in')
    console.log("values....", email);
    const password = getElementValue('.password-sign-in')
    console.log("values....", password);
    const redirectQuery = window.location.href.split('?')[1]
    const url = `/sign-in?${redirectQuery}`
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((response) => {
        if (response.REDIRECT_URL !== undefined) {
          window.location.pathname = response.REDIRECT_URL
        } else if (response.error) {
          document.querySelector('.error').innerText = response.error
        }
      })
      .catch(console.log)
  }


  const editProfileFunc = () => {
    const member = getElementValue('.member-id')
    const name = getElementValue('.member-name')
    const email = getElementValue('.member-email')
    const redirectQuery = window.location.href.split('?')[1]
    const url = `/users/${member}?${redirectQuery}}`
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({name, email}),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(checkStatus)
      .then(response => response.json())
      .then((response) => {
        if (response.REDIRECT_URL !== undefined) {
          window.location.pathname = response.REDIRECT_URL
        } else if (response.error) {
          document.querySelector('.error').innerText = response.error
        }
      })
      .catch(console.log)
  }


  const logOutFunc = () => {
    const url = '/logout'
    fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(checkStatus)
    .then(response => response.json())
    .then((response) => {
      window.location.pathname = response.REDIRECT_URL
    })
    .catch(console.log)
}

  addEvent(editProfileButton, editProfileFunc)
  addEvent(loggedOutButton, logOutFunc)
  addEvent(signInButton, signInFunc)
  addEvent(signUpButton, signUpFunc)

  function addEvent(btn, func) {
    if (btn) {
      btn.addEventListener('click', (event) => {
        event.preventDefault()
        func()
      })
    }
  }
})
