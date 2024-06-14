import {Component} from 'react'
import './index.css'

class ReviewsCarousel extends Component {
  state = {indexNum: 0, alt: 'username'}

  getPreviousReview = () => {
    const {indexNum} = this.state

    if (indexNum > 0) {
      this.setState({indexNum: indexNum - 1, alt: 'username'})
    }
  }

  getNextReview = () => {
    const {indexNum} = this.state
    const {reviewsList} = this.props

    if (indexNum < reviewsList.length - 1) {
      this.setState({
        indexNum: indexNum + 1,
        alt: reviewsList[indexNum + 1].imgUrl,
      })
    }
  }

  render() {
    const {indexNum, alt} = this.state
    const {reviewsList} = this.props
    const {imgUrl, username, companyName, description} = reviewsList[indexNum]

    return (
      <div className="bg-container">
        <div className="card">
          <button
            testid="leftArrow"
            type="button"
            className="button"
            onClick={this.getPreviousReview}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png"
              alt="left arrow"
              className="arrow"
            />
          </button>
          <div className="user-container">
            <h1 className="main-heading"> Reviews </h1>
            <img src={imgUrl} alt={alt} className="profile" />
            <p className="username">{username}</p>
            <p className="company-name"> {companyName}</p>
            <p className="description">{description}</p>
          </div>
          <button
            testId="rightArrow"
            type="button"
            className="button"
            onClick={this.getNextReview}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png"
              alt="right arrow"
              className="arrow"
            />
          </button>
        </div>
      </div>
    )
  }
}

export default ReviewsCarousel
