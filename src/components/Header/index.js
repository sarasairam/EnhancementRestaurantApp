import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, restaurantName} = value
        const cartItemsCount = cartList.length

        return (
          <nav className="header">
            <Link to="/" className="link">
              <h1 className="mainHeading">{restaurantName}</h1>
            </Link>
            <div className="header">
              <p className="myOrder">My Orders</p>
              <div className="myOrder">
                <Link to="/cart" className="link">
                  <div className="cart">
                    <button type="button" className="cart-btn">
                      <AiOutlineShoppingCart />
                    </button>
                  </div>
                </Link>
              </div>
              <div className="top">
                <p>
                  <span className="cart-count-badge">{cartItemsCount}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
