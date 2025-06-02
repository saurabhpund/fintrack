import React from 'react'

export const ModalContext = React.createContext();

const RecordModalContext = ({children}) => {
    const [showRecordModal, setShowRecordModal] = React.useState(false);
    const toggleRecordModal = () => {
        setShowRecordModal(prev => !prev);
    }
  return (
    <ModalContext.Provider value={{ showRecordModal,  toggleRecordModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default RecordModalContext;