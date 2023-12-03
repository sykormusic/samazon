import { useParams } from 'react-router-dom'
import styles from './index.module.scss'

const Details = () => {
  const { id } = useParams()
  console.log('🚀  ~ id:', id)

  return (
    <div className={styles.Details}>
      <div>Product {id}</div>
    </div>
  )
}

export default Details
