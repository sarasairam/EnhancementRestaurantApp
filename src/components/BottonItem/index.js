import './index.css'

const ButtonItem = props => {
  const {data, updateButton, buttonName} = props
  const {menuCategory, menuCategoryId} = data
  const updateButtonHere = () => {
    updateButton(menuCategoryId)
  }
  const classToAdd = buttonName === menuCategoryId ? 'dataAdd' : ''

  return (
    <li className="buttonItem">
      <button
        type="button"
        className={`${classToAdd} buttons`}
        onClick={updateButtonHere}
      >
        {menuCategory}
      </button>
    </li>
  )
}
export default ButtonItem
