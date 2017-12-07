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

  const signUpFunc = () => {
    const name = document.querySelector('.name-sign-up').value
    const email = document.querySelector('.email-sign-up').value
    const password = document.querySelector('.password-sign-up').value
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
    const email = document.querySelector('.email-sign-in').value
    const password = document.querySelector('.password-sign-in').value
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
    const member = document.querySelector('.member-id').value
    const name = document.querySelector('.member-name').value
    const email = document.querySelector('.member-email').value
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

  if (editProfileButton) {
    editProfileButton.addEventListener('click', (event) => {
      event.preventDefault()
      editProfileFunc()
    })
  }
})
