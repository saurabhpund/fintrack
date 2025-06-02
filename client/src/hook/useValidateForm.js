import React from 'react'

const useValidateForm = ({transaction}) => {
    const [errors, setErrors] = React.useState({})
    /* {
    type: "income",
    amount: 0,
    category: "",
    date: date.toISOString().split("T")[0],
    time: date.toTimeString().slice(0, 5),
    payee: "",
    note: "",
    paymentType: "cash",
    email
  } */
    const validate = () => {
        const newErrors = {}
        if (!transaction.transaction_type) {
            newErrors.type = "Transaction type is required"
        }
        if (!transaction.amount || transaction.amount <= 0) {
            newErrors.amount = "Amount must be a positive number"
        }
        if (!transaction.category) {
            newErrors.category = "Category is required"
        }
        if (!transaction.date) {
            newErrors.date = "Date is required"
        }
        if (!transaction.time) {
            newErrors.time = "Time is required"
        }
        if (!transaction.payee) {
            newErrors.payee = "Payee is required"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    return { errors, validate }
}

export default useValidateForm