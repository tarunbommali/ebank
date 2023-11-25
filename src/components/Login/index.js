import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userID: '', pin: '', showSubmitError: false, errMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30}) // Fix: use 'expires' instead of 'expiry'
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userID, pin} = this.state
    const userDetails = {user_id: userID, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserID = event => {
    this.setState({userID: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  renderUserIDFiled = () => {
    const {userID} = this.state
    return (
      <div className="input-container">
        <label htmlFor="userID" className="label">
          User ID
        </label>
        <input
          type="text"
          id="userID"
          value={userID}
          placeholder="Enter User ID"
          className="label-input-container"
          onChange={this.onChangeUserID}
        />
      </div>
    )
  }

  renderPasswordFiled = () => {
    const {pin} = this.state
    return (
      <div className="input-container">
        <label htmlFor="pin" className="label">
          PIN
        </label>
        <input
          type="password"
          placeholder="Enter PIN"
          onChange={this.onChangePassword}
          id="pin"
          value={pin}
          className="label-input-container"
        />
      </div>
    )
  }

  renderLoginForm = () => {
    const {showSubmitError, errMsg} = this.state
    return (
      <div className="form-container">
        <h1 className="login-title">Welcome Back!</h1>
        <form onSubmit={this.onSubmitForm}>
          {this.renderUserIDFiled()}
          {this.renderPasswordFiled()}
          <button type="submit" className="submit-button">
            Login
          </button>
          {showSubmitError && <p className="error-msg">*{errMsg}</p>}
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="login-container">
          <div className="website-login-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-bg-img"
            />
          </div>
          {this.renderLoginForm()}
        </div>
      </div>
    )
  }
}

export default Login
