import React, { useState } from 'react'
import { Modal, Input } from 'antd'
import styles from './EditModal.module.css'

interface EditModalProps {
  item: any
  onUpdate: (updatedItem: any) => void
  onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ item, onUpdate, onClose }) => {
  const [name, setName] = useState<string>(item.name)

  const handleOk = () => {
    onUpdate({ ...item, name })
  }

  return (
    <Modal
      title="Edit Character"
      visible={true}
      onOk={handleOk}
      onCancel={onClose}
      okButtonProps={{ className: styles.okButton }}
    >
      <Input className={styles.modalInput} value={name} onChange={(e) => setName(e.target.value)} />
    </Modal>
  )
}

export default EditModal
