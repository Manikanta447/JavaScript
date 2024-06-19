//MONEYMANAGER COMPONENT
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
    title: '',
    amount: '',
    status: '',
    transactionsList: [],
  }

  enterTitle = event => {
    this.setState({title: event.target.value})
  }

  enterAmount = event => {
    this.setState({amount: event.target.value})
  }

  selectedType = event => {
    this.setState({status: event.target.value})
  }

  addTransaction = () => {
    const {title, amount, status, transactionsList} = this.state

    const transObj = {
      transactionId: uuidv4(),
      title,
      amount: parseInt(amount),
      type: status,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, transObj],
      title: '',
      amount: '',
      status: '',
    }))
  }

  getBankBalanace = () => {
    const {transactionsList} = this.state
    const tempObj = {
      transactionId: uuidv4(),
      amount: 0,
      title: 'income',
    }
    let result

    if (transactionsList.length === 0) {
      result = <MoneyDetails obj={tempObj} />  //MONEY DETAILS COMPONENT AT 149LINE
    } else {
      result = transactionsList.map(eachTrans => (
        <MoneyDetails obj={eachTrans} key={eachTrans.transactionId} />
      ))
    }

    return result
  }

  render() {
    const {title, amount, status, transactionsList} = this.state
    console.log(amount)
    console.log(transactionsList)

    return (
      <div className="bg-container">
        <div className="header-sec">
          <h1 className="main-heading"> Hi, Richard</h1>
          <p className="text">
            Welcome back to you <span className="sub-text"> Money Manager</span>
          </p>
        </div>
        <div className="money-container">{this.getBankBalanace()}</div>

        <div className="account-wrap">
          <div className="transaction">
            <form className="form-container" onSubmit={this.addTransaction}>
              <h1 className="tra-heading"> Add Transaction </h1>
              <p className="title"> TITLE </p>
              <input
                type="text"
                className="input"
                placeholder="TITLE"
                onChange={this.enterTitle}
                value={title}
              />
              <p className="title"> AMOUNT </p>
              <input
                type="text"
                className="input"
                placeholder="AMOUNT"
                onChange={this.enterAmount}
                value={amount}
              />
              <p className="title"> TYPE </p>
              <select
                className="select-input"
                name="transactions"
                onChange={this.selectedType}
                value={status}
              >
                {transactionTypeOptions.map(eachtrans => (
                  <option
                    className="option"
                    value={eachtrans.optionId.toLocaleLowerCase()}
                  >
                    {' '}
                    {eachtrans.displayText}{' '}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>

          <div className="history">
            <h1 className="tra-heading">History</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager



//MONEY DETAILS COMPONENT
import './index.css'

let amountObject = {
  totalBalance: 0,
  totalIncome: 0,
  totalExpense: 0,
}

const MoneyDetails = props => {
  const {obj} = props
  console.log(obj)
  const {amount, type} = obj
  let {totalBalance, totalIncome, totalExpense} = amountObject
  let expense

  if (type === 'Expense') {
    expense = amount
  } else {
    expense = 0
  }
  totalIncome += amount
  totalBalance = totalIncome - expense
  totalExpense += expense

  amountObject = {
    totalBalance,
    totalExpense,
    totalIncome,
  }
  console.log(amountObject)

  const balance = 'balance'

  return (
    <div className="con">
      <div
        className={`amount-container ${balance}`}
        data-testid="balanceAmount"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="bal-icon"
        />
        <div className="content">
          <p className="bal-text"> Your Balance </p>
          <p className="para">Rs {totalBalance}</p>
        </div>
      </div>
      <div className={`amount-container ${balance}`} data-testid="incomeAmount">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="bal-icon"
        />
        <div className="content">
          <p className="bal-text"> Your Income </p>
          <p className="para">Rs {totalIncome}</p>
        </div>
      </div>
      <div
        className={`amount-container ${balance}`}
        data-testid="expenseAmount"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="bal-icon"
        />
        <div className="content">
          <p className="bal-text"> Your Expenses </p>
          <p className="para">Rs {totalExpense}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
