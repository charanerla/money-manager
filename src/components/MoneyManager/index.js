import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    title: '',
    listOfTransactions: [],
    amount: '',
    optionId: 'INCOME',
  }

  updateTitle = event => {
    const titleGiven = event.target.value
    this.setState({title: titleGiven})
  }

  upDateAmount = event => {
    const givenAmount = event.target.value
    this.setState({amount: givenAmount})
  }

  updateTransactionType = event => {
    const type = event.target.value
    this.setState({optionId: type})
  }

  typeText = optionId => {
    const result = transactionTypeOptions.filter(
      eachObj => eachObj.optionId === optionId,
    )

    return result[0].displayText
  }

  deletingTransaction = id => {
    const {
      listOfTransactions,
      totalBalance,
      totalIncome,
      totalExpenses,
    } = this.state
    const deletingTransactionDetails = listOfTransactions.filter(
      eachTransaction => eachTransaction.transactionId === id,
    )
    const newTransactionsList = listOfTransactions.filter(
      eachTransaction => eachTransaction.transactionId !== id,
    )

    this.setState({listOfTransactions: newTransactionsList})
    if (deletingTransactionDetails[0].displayText === 'Income') {
      const updatedBalance = totalBalance - deletingTransactionDetails[0].amount
      const UpdatedIncome = totalIncome - deletingTransactionDetails[0].amount
      this.setState({
        listOfTransactions: newTransactionsList,
        totalBalance: updatedBalance,
        totalIncome: UpdatedIncome,
      })
    } else {
      const updatedBalance =
        totalBalance + parseInt(deletingTransactionDetails[0].amount)
      const UpdatedExpenses =
        totalExpenses - deletingTransactionDetails[0].amount
      this.setState({
        listOfTransactions: newTransactionsList,
        totalBalance: updatedBalance,
        totalExpenses: UpdatedExpenses,
      })
    }
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {title, listOfTransactions, amount, optionId} = this.state

    if (title !== '' && amount !== '') {
      const transactionDetails = {
        title,
        amount,
        displayText: this.typeText(optionId),
        transactionId: uuidv4(),
      }
      const updatedTransactionDetails = [
        ...listOfTransactions,
        transactionDetails,
      ]
      this.setState({listOfTransactions: updatedTransactionDetails})

      if (optionId === 'INCOME') {
        this.setState(prevState => ({
          totalBalance: prevState.totalBalance + parseInt(amount),
          totalIncome: prevState.totalIncome + parseInt(amount),
        }))
        this.setState({title: '', amount: '', optionId: 'INCOME'})
      } else {
        this.setState(prevState => ({
          totalBalance: prevState.totalBalance - parseInt(amount),
          totalExpenses: prevState.totalExpenses + parseInt(amount),
        }))
        this.setState({title: '', amount: '', optionId: 'INCOME'})
      }
    }
  }

  render() {
    const {
      totalBalance,
      totalIncome,
      totalExpenses,
      title,
      listOfTransactions,
      amount,
      optionId,
    } = this.state

    return (
      <div className="main-container">
        <div className="responsive-dynamic-container">
          <div className="header">
            <h1 className="name">Hi, Richard</h1>
            <p className="greeting">
              Welcome back to your
              <span className="highlight1"> Money Manager</span>
            </p>
          </div>

          <div>
            <MoneyDetails
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />
          </div>

          <div className="add-transaction-history-container">
            <div className="form-container">
              <form onSubmit={this.onSubmitForm}>
                <h1 className="form-heading">Add Transaction</h1>
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  id="title"
                  placeholder="TITLE"
                  value={title}
                  onChange={this.updateTitle}
                />
                <label htmlFor="amount">AMOUNT</label>
                <input
                  type="text"
                  id="amount"
                  placeholder="AMOUNT"
                  value={amount}
                  onChange={this.upDateAmount}
                />
                <label htmlFor="select">TYPE</label>
                <select onChange={this.updateTransactionType} value={optionId}>
                  <option value="INCOME" id="INCOME">
                    Income
                  </option>
                  <option value="EXPENSES" id="EXPENSES">
                    Expenses
                  </option>
                </select>
                <button type="submit" className="add-transaction-button">
                  Add
                </button>
              </form>
            </div>
            <div className="transaction-history-container">
              <h1 className="history-heading">History</h1>
              <div className="history-header">
                <div className="header-elements">
                  <p className="header-title">Title</p>
                  <p className="header-title">Amount</p>
                  <p className="header-title">Type</p>
                </div>
              </div>
              {listOfTransactions.length > 0 ? (
                <ul className="transaction-list">
                  {listOfTransactions.map(eachTransaction => (
                    <TransactionItem
                      key={uuidv4()}
                      transactionDetails={eachTransaction}
                      deletingTransaction={this.deletingTransaction}
                    />
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
