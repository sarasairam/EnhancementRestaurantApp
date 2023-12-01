import './index.css'
import {Component} from 'react'
import CartContext from '../../context/CartContext'

class ListItem extends Component {
  state = {count: 0}

  increase = () => {
    const {isIncrease} = this.props
    this.setState(prevState => ({count: prevState.count + 1}))
    isIncrease()
  }

  decrease = () => {
    const {count} = this.state
    const {isDecrease} = this.props
    if (count > 0) {
      this.setState(prevState => ({count: prevState.count - 1}))
      isDecrease()
    }
  }

  render() {
    const {count} = this.state
    const {data} = this.props
    const {
      dishAvailability,
      dishType,
      dishCalories,
      dishCurrency,
      dishDescription,
      dishImage,
      dishName,
      dishPrice,
      addOnCat,
    } = data
    const lengths = addOnCat.length
    const logo =
      dishType === 2
        ? 'https://www.kindpng.com/picc/m/151-1515163_100-veg-logo-png-transparent-png.png'
        : 'https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png'
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value
          const listData = {...data, count}
          const addCartItemHere = () => {
            addCartItem(listData)
          }

          return (
            <div className="card">
              <div className="card-2">
                <div>
                  <img src={logo} alt="logo" className="logoStyle" />
                </div>
                <div>
                  <h1 className="name">{dishName}</h1>
                  <p className="sar">{`${dishCurrency} ${dishPrice}`}</p>
                  <p className="des">{dishDescription}</p>
                  {dishAvailability === true ? (
                    <div className="custom">
                      <button
                        type="button"
                        className="customButton"
                        onClick={this.decrease}
                      >
                        -
                      </button>
                      <p className="para">{count}</p>
                      <button
                        type="button"
                        className="customButton"
                        onClick={this.increase}
                      >
                        +
                      </button>
                    </div>
                  ) : null}
                  {lengths > 0 ? (
                    <p className="custAv">Customizations Available</p>
                  ) : null}
                  {count > 0 ? (
                    <button
                      type="button"
                      className="addToCartBtn"
                      onClick={addCartItemHere}
                    >
                      ADD TO CART
                    </button>
                  ) : null}
                  {dishAvailability === true ? null : <p>Not Available</p>}
                </div>
              </div>
              <div className="calDiv">
                <p className="calories">{dishCalories} calories</p>
              </div>
              <div className="dishImgDiv ">
                <img src={dishImage} alt="dishImage" className="dishImage" />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default ListItem
