import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const SignUpStyles = styled.div`
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
      label {
        color: red;
      }
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

export default function SignUp() {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    'confirm-password': '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User ${inputs.firstname} registered successfully`);

    let userDB = JSON.parse(localStorage && localStorage.getItem('users'));
    userDB.push(inputs);
    localStorage && localStorage.setItem('users', JSON.stringify(userDB));

    history.push('/signin');
  };

  return (
    <SignUpStyles>
      <div className='login-text'>
        <div>
          <h2>Signup</h2>
        </div>
        <h5>We do not share your personal details with anyone</h5>
      </div>
      <Form method='POST' onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            name='firstname'
            placeholder='Your First Name'
            autoComplete='firstname'
            value={inputs.fisrName}
            onChange={handleChange}
          />
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            name='lastname'
            placeholder='Your Last Name'
            autoComplete='lastname'
            value={inputs.lastname}
            onChange={handleChange}
          />
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

          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            name='confirm-password'
            placeholder='Confirm Password'
            autoComplete='confirm-password'
            value={inputs['confirm-password']}
            onChange={handleChange}
          />
          <button>Signup</button>
        </fieldset>
      </Form>
    </SignUpStyles>
  );
}
