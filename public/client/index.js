const loginForm = document.forms.loginForm;
const email = loginForm.elements.email;
const password = loginForm.elements.password;
const role = loginForm.elements.role;
const submitLoginBtn = loginForm.elements.submit;

const postJSON = async (data) => {
  const url = `http://localhost:3000/${role.value}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.error) {
      throw new Error(result.error.message);
    }
    if (result.authorizationToken) {
      if (role.value === 'user') {
        localStorage
          .setItem('userAuthToken', result.authorizationToken);
        document.location
          .replace('http://localhost:3000/client/reservation.html');
      } else {
        localStorage
          .setItem('staffAuthToken', result.authorizationToken);
        document.location
          .replace('http://localhost:3000/client/reservationsStaff.html');
      }
    }
  } catch (err) {
    console.error(err);
  }
}

const submitLogin = async (e) => {
  e.preventDefault();
  const authenticationData = {
    email: email.value,
    password: password.value,
  }
  await postJSON(authenticationData);
}


submitLoginBtn.addEventListener('click', submitLogin);
