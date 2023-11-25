import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onSubmitLogout = () => {
    const {history} = props
    history.replace('/ebank/login')
    Cookies.remove('jwt_token')
  }

  return (
    <nav className="nav">
      <Link to="/" className="link-el">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
      </Link>
      <button onClick={onSubmitLogout} className="logout-button" type="button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
