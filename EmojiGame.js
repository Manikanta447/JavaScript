//EmojiGame Comonent
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

let refList = []
let refScore

class EmojiGame extends Component {
  state = {score: 0, topScore: 0, winOrLoseStatus: false}

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  clickedEmoji = id => {
    const {score, topScore} = this.state
    console.log('nn')
    console.log(refList.includes(id))

    if (refList.includes(id)) {
      console.log('un')
      if (score > topScore) {
        refScore = score
        this.setState(prevState => ({
          topScore: score,
          winOrLoseStatus: !prevState.winOrLoseStatus,
          score: 0,
        }))
      } else {
        refScore = score
        this.setState(prevState => ({
          winOrLoseStatus: !prevState.winOrLoseStatus,
          score: 0,
        }))
      }
    } else {
      console.log('en')
      refList.push(id)
      if (refList.length === 12) {
        refScore = score + 1
        this.setState(prevState => ({
          winOrLoseStatus: !prevState.winOrLoseStatus,
          score: 0,
          topScore: refScore,
        }))
      }
      this.shuffledEmojisList()
      this.setState(prevState => ({score: prevState.score + 1}))
    }
  }

  restart = () => {
    refList = []
    this.setState({winOrLoseStatus: false})
  }

  render() {
    const {emojisList} = this.props
    const {score, topScore, winOrLoseStatus} = this.state
    let displayableContent
    const displayScore = true
    const notDisplayScore = false

    if (winOrLoseStatus) {
      displayableContent = (
        <div>
          <NavBar displayScore={notDisplayScore} />
          <div className="bg-container">
            <WinOrLoseCard
              cardToDisplay={refScore === 12}
              scores={{refScore}}
              func={this.restart}
            />
          </div>
        </div>
      )
    } else {
      displayableContent = (
        <div>
          <NavBar displayScore={displayScore} scores={{score, topScore}} />
          <div className="bg-container">
            <ul className="emoji-list-container">
              {emojisList.map(eachEmoji => (
                <EmojiCard
                  emojiDetails={eachEmoji}
                  key={eachEmoji.id}
                  func={this.clickedEmoji}
                />
              ))}
            </ul>
          </div>
        </div>
      )
    }

    return <div>{displayableContent}</div>
  }
}
export default EmojiGame


//NavBar Component
// Write your code here.
import './index.css'

const NavBar = props => {
  const {displayScore} = props
  let jsxElement
  console.log(2)

  if (displayScore === true) {
    const {scores} = props
    const {score, topScore} = scores

    jsxElement = (
      <div className="scores">
        <p className="score-nav"> Score: {score}</p>
        <p className="score-nav"> Top Score: {topScore} </p>
      </div>
    )
  }

  return (
    <nav className="nav-bar">
      <div className="logo-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
          alt="emoji logo"
          className="logo"
        />
        <h1 className="logo-text"> Emoji Game</h1>
      </div>
      {jsxElement}
    </nav>
  )
}

export default NavBar


//WinOrLose Component
// Write your code here.
import './index.css'

const WinOrLoseCard = props => {
  const {cardToDisplay, scores, func} = props
  const {refScore} = scores
  console.log(scores)
  let imgUrl
  let isBest
  console.log(refScore)

  if (cardToDisplay === true) {
    imgUrl = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
    isBest = 'Best '
  } else {
    imgUrl = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
    isBest = ''
  }

  const callFuncRestart = () => {
    func()
  }

  return (
    <div className="card-container">
      <img src={imgUrl} className="image" alt="win or lose" />
      <div>
        <h1 className="text">{cardToDisplay ? 'You Won' : 'You Lose'}</h1>
        <p className="score-text">{isBest}Score</p>
        <p className="score"> {refScore}/12 </p>
        <button className="button" type="button" onClick={callFuncRestart}>
          Play Again
        </button>
      </div>
    </div>
  )
}

export default WinOrLoseCard

//EmojiCard Component
import './index.css'

const EmojiCard = props => {
  const {emojiDetails, func} = props
  const {id, emojiName, emojiUrl} = emojiDetails
  console.log(3)

  const emojiClicked = () => {
    func(id)
  }

  return (
    <li className="emoji-list-item">
      <button className="emoji-button" type="button" onClick={emojiClicked}>
        <img src={emojiUrl} className="emoji" alt={emojiName} />{' '}
      </button>
    </li>
  )
}

