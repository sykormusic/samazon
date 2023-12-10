import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addToWishListAPI } from '@/store/reducers/productSlice'
import { Rate } from 'antd'
import { renderMoney } from '@/utils/functions'
import { Tag } from 'antd'
import { TAG_COLOR } from '@/utils/constants'

const ProductItem = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: { _id, title, brand, images, price, tags, totalrating } = {} } = props

  const onAddToWishList = (id) => {
    dispatch(
      addToWishListAPI({
        prodId: id
      })
    )
  }

  return (
    <div
      className={styles.ProductItem}
      key={_id}
      onClick={() => {
        navigate(`/products/${_id}`)
      }}
    >
      <div className={styles.image}>
        <img src={images?.[0]?.url} alt='' />
      </div>
      <div className={styles.texts}>
        <span className={styles.brand}>{brand}</span>
        <h1>{title}</h1>
        <h3 className={styles.price}>{renderMoney(price)}</h3>
        <div>
          <Tag color={TAG_COLOR[tags]} bordered={false}>
            {tags}
          </Tag>
        </div>
        <div className={styles.rating}>
          <Rate defaultValue={totalrating} disabled />
        </div>
      </div>

      <button
        type='button'
        className={styles.saveBtn}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onAddToWishList(_id)
        }}
      >
        <HeartOutlined />
      </button>
    </div>
  )
}

ProductItem.propTypes = {
  data: Object
}

export default ProductItem
