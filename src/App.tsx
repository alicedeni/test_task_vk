import React from 'react'
import { Layout, Typography } from 'antd'
import ItemList from './components/list/ItemList'
import styles from './App.module.css'

const { Header, Content } = Layout
const { Title } = Typography

const App: React.FC = () => (
  <Layout>
    <Header className={styles.header}>
      <Title level={2} className={styles.title} style={{ color: 'white' }}>
        Rick and Morty. Персонажи
      </Title>
    </Header>
    <Content className={styles.content}>
      <ItemList />
    </Content>
  </Layout>
)

export default App
