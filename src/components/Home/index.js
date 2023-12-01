import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ListItem from '../ListItem'
import ButtonItem from '../BottonItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    listData: [],
    buttonName: '11',
    count: 0,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    if (response.ok) {
      const responseData = await response.json()
      const data = responseData[0]
      const list = data.table_menu_list.map(each => ({
        categoryDishes: each.category_dishes,
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
      }))
      this.setState({
        listData: list,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateButton = id => {
    this.setState({buttonName: id})
  }

  renderLoadingView = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onGetFailureView = () => (
    <div>
      <h1>failure</h1>
    </div>
  )

  isIncrease = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  isDecrease = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  onGetView = () => {
    const {buttonName, listData} = this.state
    const data = listData.filter(each => each.menuCategoryId === buttonName)
    const Data = data[0].categoryDishes
    const convertedData = Data.map(each => ({
      dishAvailability: each.dish_Availability,
      dishType: each.dish_Type,
      dishCalories: each.dish_calories,
      dishCurrency: each.dish_currency,
      dishDescription: each.dish_description,
      dishId: each.dish_id,
      dishImage: each.dish_image,
      dishName: each.dish_name,
      dishPrice: each.dish_price,
      addOnCat: each.addonCat,
    }))
    return (
      <div>
        <Header />
        <ul className="list">
          {listData.map(each => (
            <ButtonItem
              key={each.menuCategoryId}
              data={each}
              updateButton={this.updateButton}
              buttonName={buttonName}
            />
          ))}
        </ul>
        <div className="listContainer">
          <ul className="mainList">
            {convertedData.map(each => (
              <ListItem
                key={each.dishId}
                data={each}
                isIncrease={this.isIncrease}
                isDecrease={this.isDecrease}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onRenderStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onGetView()
      case apiStatusConstants.failure:
        return this.onGetFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="mainContainer">{this.onRenderStatus()}</div>
      </>
    )
  }
}

export default Home
