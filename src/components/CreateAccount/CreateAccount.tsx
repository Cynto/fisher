import React from 'react';
import './CreateAccount.css';

function CreateAccount(props: any) {
  const { setHasAccount } = props;
  return (
    <div className="create-account-container">
      <button className="close-create-account" onClick={() => setHasAccount(true)}>X</button>
      <i className="fas fa-fish"></i>
      <div className="create-account-content-container">
        <h2>Create your account</h2>
        <form>
          <div className="group">
            <div className="input-container">
              <input type="email" required></input>
              <label>Email</label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <input type="password" required></input>
              <label>Password</label>
            </div>
          </div>

          <button className="login-button" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
