import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {data} = props
  const {count, dishPrice, dishCurrency, dishId, dishImage, dishName} = data
  const valueHere = dishPrice * count

  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value
        const incrementCartItemQuantityHere = () => {
          incrementCartItemQuantity(dishId)
        }
        const decrementCartItemQuantityHere = () => {
          decrementCartItemQuantity(dishId)
        }
        const removeCartItemHere = () => {
          removeCartItem(dishId)
        }
        return (
          <div className="CartItem">
            <img src={dishImage} alt={dishName} className="CartItemImg" />
            <div>
              <p>Dish Name: </p>
              <p>{dishName}</p>
            </div>
            <div>
              <p>Quantity: </p>
              <p>{count}</p>
            </div>
            <div>
              <p>Price: </p>
              <p>
                {valueHere} {dishCurrency}
              </p>
            </div>
            <div className="custom">
              <button
                type="button"
                className="customButton"
                onClick={decrementCartItemQuantityHere}
              >
                -
              </button>
              <p className="para">{count}</p>
              <button
                type="button"
                className="customButton"
                onClick={incrementCartItemQuantityHere}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="deleteButton"
              onClick={removeCartItemHere}
            >
              remove
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItem
