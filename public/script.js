document.addEventListener('DOMContentLoaded', () => {
  console.log('hello from the browser JavaScript')

  const checkStatus = (response) => {
    console.log( "======> ", response )
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

  const signUpFunc = () => {
    const name = document.querySelector('.name-sign-up').value
    const email = document.querySelector('.email-sign-up').value
    const password = document.querySelector('.password-sign-up').value
    const url = `/sign-up?${window.location.href.split('?')[1]}`
    console.log(document.cookie)
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
        console.log('response:', response)
        window.location.pathname = response.REDIRECT_URL
      })
      .catch(console.log)
  }

  const signInFunc = () => {
    const email = document.querySelector('.email-sign-in').value
    const password = document.querySelector('.password-sign-in').value
    const url = `/sign-in?${window.location.href.split('?')[1]}`
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
        console.log('response:', response)
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
      console.log('response:', response)
      window.location.pathname = response.REDIRECT_URL
    })
    .catch(console.log)
}

  if (signUpButton) {
    signUpButton.addEventListener('click', (event) => {
      event.preventDefault()
      signUpFunc()
    })
  }

  if (signInButton) {
    signInButton.addEventListener('click', (event) => {
      event.preventDefault()
      signInFunc()
    })
  }

  if (loggedOutButton) {
    loggedOutButton.addEventListener('click', (event) => {
      event.preventDefault()
      logOutFunc()
    })
  }
})
