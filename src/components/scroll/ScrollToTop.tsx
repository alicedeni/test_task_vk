import React from 'react'
import { Button } from 'antd'
import styles from './ScrollToTop.module.css'

const ScrollToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Button type="primary" onClick={scrollToTop} className={styles.scrollButton}>
      ↑ Вернуться к началу
    </Button>
  )
}

export default ScrollToTop
