import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../lib/util';

const SignInStyles = styled.div`
  .login-text {
    display: flex;
    flex-direction: column;
  }
  @media only screen and (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, 40%);
    margin: 5% 0% 5% 15%;
    .login-text {
      align-items: flex-start;
      text-align: start;
    }
  }
  @media only screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 40%);
    margin: 5% 0% 5% 15%;
  }
  @media only screen and (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(2, 40%);
    margin: 5% 0% 5% 15%;
  }
`;

const Form = styled.form`
  border: 5px solid white;
  padding: 10px;
  font-size: 1.5rem;
  line-height: 1.5;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  &:focus {
    color: var(--lightblue);
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    margin-bottom: 3rem;
    border-bottom: 2px solid var(--lightGray);
    &:focus {
      outline: 0;
      border-color: var(--lightblue);
    }
  }
  fieldset {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    width: 100%;
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export default function SignIn() {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const history = useHistory();
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isLogged = login(inputs);
    if (isLogged) {
      localStorage && localStorage.setItem('isLoggedIn', JSON.stringify(true));
      history.push('/', isLogged);
      window.location.reload();
    } else {
      alert('Please register or enter valid credentials');
    }
  };

  return (
    <SignInStyles>
      <div className='login-text'>
        <div>
          <h2>Login</h2>
        </div>
        <h5>Get access to your Orders, Wishlist and Recommendations</h5>
      </div>
      <Form method='POST' onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
          <button>Login</button>
        </fieldset>
      </Form>
    </SignInStyles>
  );
}
