import React from "react";
import ReactDOM from "react-dom";

const MyReact = {
  state: null,
  stateInitialized: false,
  component: null,
  rootElement: null,
  setState(newState) {
    MyReact.state = newState;
    ReactDOM.render(<MyReact.component />, MyReact.rootElement);
  },
  useState(initialValue) {
    if (!this.stateInitialized) {
      this.stateInitialized = true;
      this.state = initialValue;
    }
    return [this.state, this.setState];
  },
  render(component, rootElement) {
    this.component = component;
    this.rootElement = rootElement;
    ReactDOM.render(<this.component />, this.rootElement);
  }
};

const Counter = () => {
  const [count, setCount] = MyReact.useState(0);

  return (
    <>
      <div>
        The count is: {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </>
  );
};

const rootElement = document.getElementById("root");
MyReact.render(Counter, rootElement);
