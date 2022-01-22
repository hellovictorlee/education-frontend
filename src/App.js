import React, { Component } from "react";
import Terminal from "./components/Terminal";
import "./App.css";
// import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <Terminal />
      // <div className="App">
      //   <div className="MainDiv">
      //     <div style={{ margin: "100px 20px 20px 20px" }}>
      //       <div className="container">
      //         <Xterm />
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default App;
