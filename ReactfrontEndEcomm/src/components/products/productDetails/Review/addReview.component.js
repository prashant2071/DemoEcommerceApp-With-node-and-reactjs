import React, { Component } from "react"; 
import Button from "../../../common/submitButton/submitButton.component";

export default class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewPoint: "",
      reviewMessage: "",
    };
  }
  handleChange = (e) => {
    //   const { reviewPoint, reviewMessage } = this.state;
      const { name,value} =e.target
      this.setState(prevState => (
          {
              ...prevState,
              [name]:value
          }
      ))
  };

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.submit(this.state)
      this.setState({
        reviewPoint: "",
        reviewMessage: ""
      });
  };

    render() {
        console.log("isSubmitting is ", this.props.isSubmitting);
    return (
      <div>
        <h2>Add Review</h2>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label>reviewPoint</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            placeholder="review reviewPoint"
            name="reviewPoint"
            value={this.state.reviewPoint}
          ></input>
          <label>reviewMessage</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            placeholder="review reviewMessage"
            value={this.state.reviewMessage}
            name="reviewMessage"
                ></input>
                <br></br>
                <Button isSubmitting={ this.props.isSubmitting}/>
        </form>
      </div>
    );
  }
}
