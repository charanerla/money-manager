// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deletingTransaction} = props
  const {title, amount, displayText, transactionId} = transactionDetails

  const onClickingDeleteButton = () => {
    deletingTransaction(transactionId)
  }

  return (
    <li id={transactionId} className="transaction-item">
      <div className="lists-in-list">
        <p>{title}</p>
        <p>Rs {amount}</p>
        <p>{displayText}</p>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickingDeleteButton}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="bin-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
