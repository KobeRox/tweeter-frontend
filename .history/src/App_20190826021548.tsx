import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { async } from "q";
import { promises } from "dns";

const App: React.FC = () => {
  return (
    <Router>
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/" component={Tweeter} />
    </Router>
  );
};

interface IState {
  title: "";
  post: "";
  tweets: object[];
}

class Tweeter extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "",
      post: "",
      tweets: []
    };
  }

  private getData = () => {
    axios
      .get(`https://tweeter.azurewebsites.net/api/Tweeters/`)
      .then(response => {
        console.log(response.data);
        this.setState({ tweets: response.data });
      })
      .catch(error => {
        // Error (copied catch error from https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  private postData = () => {
    axios
      .post("https://tweeter.azurewebsites.net/api/Tweeters/", {
        title: "this is the post ",
        post: ""
      })
      .then(response => {
        console.log(response.data);
        this.setState({ tweets: response.data });
      });
  };

  private deleteData = () => {
    axios
      .delete("https://tweeter.azurewebsites.net/api/Tweeters/")
      .then(response => {
        console.log(response.data);
        this.setState({ tweets: response.data });
      });
  };

  public componentDidMount() {
    this.getData();
  }

  handleSubmit(e: any) {
    e.preventDefault();
  }

  public render() {
    let { tweets } = this.state;
    return (
      <div>
        <h1>Tweeter</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" placeholder="Title" name="title" />
          <br />
          <br />
          <textarea placeholder="Write a post " name="post"></textarea>
          <br />
          <br />
          <button type="submit">Post</button>
        </form>

        <br></br>
        <h2>Returned values</h2>
        {tweets.map((item: any) => (
          <div key={item.postid}>
            <h1>{item.title}</h1>
            <p>{item.post}</p>
          </div>
        ))}
        {/* <form onSubmit={e => this.handleSubmit(e)} action="">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={event => {
              this.setState({ title: event.target.value });
            }}
          />
          <input
            type="text"
            placeholder="post"
            name="post"
            value={this.state.post}
            onChange={event => {
              this.setState({ post: event.target.value });
            }}
          />
          <button
            onClick={event => {
              console.log(event);
            }}
          >
            post
          </button>
        </form>

        <form>
          <div>
            <textarea name="data" 
            onChange={event => {
              this.setState({ post: event.target.value });
            }}
            />
          </div>
          <button
            onClick={event => {
              console.log(event);
            }}
          />
        </form> */}
      </div>
    );
  }
}

export default App;
