import React, { useEffect, useState } from 'react'
import { List, Button, Spin, Select } from 'antd'
import { fetchCharacters } from '../../api'
import ScrollToTop from '../scroll/ScrollToTop'
import EditModal from '../edit/EditModal'
import styles from './ItemList.module.css'

const ItemList: React.FC = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [editingItem, setEditingItem] = useState<any | null>(null)

  const [sortField, setSortField] = useState<string>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true)
      try {
        const data = await fetchCharacters(page)
        setItems((prevItems) => {
          const combinedItems = [...prevItems, ...data.results]
          return combinedItems.filter(
            (item, index, self) => self.findIndex((i) => i.id === item.id) === index,
          )
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadItems()

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setPage((prevPage) => prevPage + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const editItem = (item: any) => {
    setEditingItem(item)
  }

  const updateItem = (updatedItem: any) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    )
    setEditingItem(null)
  }

  const sortItems = (items: any[]) => {
    return [...items].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  return (
    <>
      <div className={styles.listContainer}>
        <Select
          defaultValue="id"
          onChange={(value: string) => setSortField(value)}
          style={{ width: 120, marginRight: '8px' }}
        >
          <Select.Option value="id">ID</Select.Option>
          <Select.Option value="name">Имя</Select.Option>
          <Select.Option value="status">Статус</Select.Option>
          <Select.Option value="species">Вид</Select.Option>
          <Select.Option value="gender">Пол</Select.Option>
        </Select>

        <Select
          defaultValue="asc"
          onChange={(value: 'asc' | 'desc') => setSortOrder(value)}
          style={{ width: 120 }}
        >
          <Select.Option value="asc">По возрастанию</Select.Option>
          <Select.Option value="desc">По убыванию</Select.Option>
        </Select>
      </div>

      <List
        bordered
        dataSource={sortItems(items)}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <div>
              <img src={item.image} alt={item.name} className={styles.listImage} />
              <strong>{item.name}</strong>
            </div>
            <div>Status: {item.status}</div>
            <div>Species: {item.species}</div>
            <div>Gender: {item.gender}</div>
            <Button
              type="primary"
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => editItem(item)}
            >
              Изменить
            </Button>
            <Button
              type="primary"
              className={`${styles.button} ${styles.deleteButton}`}
              danger
              onClick={() => removeItem(item.id)}
            >
              Удалить
            </Button>
          </List.Item>
        )}
      />

      {loading && (
        <div className={styles.loadingSpinner}>
          <Spin size="large" />
        </div>
      )}

      <ScrollToTop />

      {editingItem && (
        <EditModal item={editingItem} onUpdate={updateItem} onClose={() => setEditingItem(null)} />
      )}
    </>
  )
}

export default ItemList
