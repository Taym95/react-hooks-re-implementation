import React from "react";
import ReactDOM from "react-dom";

const MyReact = {
  stateArr: [],
  currentStateIndex: 0,
  component: null,
  rootElement: null,
  useState(initialValue) {
    if (this.currentStateIndex === this.stateArr.length) {
      const state = {
        value: initialValue,
        setState(newValue) {
          state.value = newValue;
          MyReact.currentStateIndex = 0;
          ReactDOM.render(<MyReact.component />, MyReact.rootElement);
        }
      };
      this.stateArr.push(state);
    }

    const currentState = this.stateArr[this.currentStateIndex];
    this.currentStateIndex += 1;
    return [currentState.value, currentState.setState];
  },
  render(component, rootElement) {
    this.component = component;
    this.rootElement = rootElement;
    ReactDOM.render(<this.component />, this.rootElement);
  }
};

const Counter = () => {
  const [count, setCount] = MyReact.useState(0);
  const [count2, setCount2] = MyReact.useState(0);

  console.log("rerender");
  return (
    <>
      <div>
        The count is: {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        The count 2 is: {count2}
        <button onClick={() => setCount2(count2 + 1)}>+</button>
      </div>
    </>
  );
};

const rootElement = document.getElementById("root");
MyReact.render(Counter, rootElement);
