// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {totalBalance, totalIncome, totalExpenses} = props
  return (
    <>
      <ul className="unordered-list">
        <li className="list-item balance-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="custom-img"
          />
          <div className="amount-container">
            <p className="type-name">Your Balance</p>
            <p className="amount" testid="balanceAmount">
              Rs {totalBalance}
            </p>
          </div>
        </li>

        <li className="list-item income-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="custom-img"
          />
          <div className="amount-container">
            <p className="type-name">Your Income</p>
            <p className="amount" testid="incomeAmount">
              Rs {totalIncome}
            </p>
          </div>
        </li>

        <li className="list-item expenses-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            className="custom-img"
          />
          <div className="amount-container">
            <p className="type-name">Your Expenses</p>
            <p className="amount" testid="expensesAmount">
              Rs {totalExpenses}
            </p>
          </div>
        </li>
      </ul>
    </>
  )
}
export default MoneyDetails
