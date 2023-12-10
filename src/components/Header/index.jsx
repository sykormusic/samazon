import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Button, Input } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartDrawer from '../CartDrawer'
import Item from './components/Item'
import styles from './index.module.scss'
import { logout, logoutAPI } from '@/store/reducers/authSlice'
import { useDispatch } from 'react-redux'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const {
    cart: { products = [] }
  } = useSelector((state) => state.cart)

  const [isCartOpen, setIsCartOpen] = useState(false)

  const headerItems = [
    // {
    //   title: 'Compare',
    //   subtitle: 'Products',
    //   key: 'compare-products',
    //   icon: <SyncOutlined />,
    //   onClick: () => {}
    // },
    {
      title: 'Favorites',
      subtitle: 'Wishlist',
      key: 'wishlist',
      icon: <HeartOutlined />,
      onClick: () => {
        navigate('/profile/wishlist')
      }
    },
    ...(!user
      ? [
          {
            title: 'Đăng nhập',
            subtitle: 'Tài khoản',
            key: 'login',
            icon: <UserOutlined />,
            onClick: () => navigate(`/login`)
          }
        ]
      : [
          {
            title: user.firstname,
            subtitle: user.lastname,
            key: 'login',
            icon: <UserOutlined />,
            menuItems: [
              {
                label: 'Xem trang cá nhân',
                key: 'profile',
                onClick: () => navigate(`/profile`)
              },
              {
                label: 'Đăng xuất',
                key: 'logout',
                onClick: () => {
                  dispatch(logoutAPI())
                  dispatch(logout())
                }
              }
            ]
          }
        ]),
    {
      title: 'Giỏ hàng',
      key: 'cart',
      icon: (
        <Badge count={products.length}>
          <ShoppingCartOutlined />
        </Badge>
      ),
      onClick: () => setIsCartOpen((prev) => !prev)
    }
  ]

  return (
    <div className={styles.Header}>
      <div className={styles.contentWrapper}>
        <div className={styles.logo}>
          <a href='/'>BigArts</a>
        </div>
        <div className={styles.center}>
          <Input
            placeholder='Tìm kiếm sản phẩm...'
            size='large'
            allowClear
            addonAfter={
              <Button type='text'>
                <SearchOutlined />
              </Button>
            }
          />
        </div>
        <div className={styles.right}>
          {headerItems.map((item) => (
            <Item
              key={item.key}
              onClick={item.onClick}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              menuItems={item.menuItems}
            />
          ))}
        </div>
      </div>
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default Header
