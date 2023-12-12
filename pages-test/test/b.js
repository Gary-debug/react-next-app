import React, { useState, useEffect, useReducer, useLayoutEffect, useContext, useRef } from "react"
import MyContext from "../../lib/my-context"

class MyCount extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }
  state = {
    count: 0
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ count: this.state.count + 1})
    }, 1000)
  }

  componentWillUnmount() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return  <span ref={this.ref}>{this.state.count}</span>
  }
}

function countReducer(state, action) {
  switch(action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state
  }
}

function MyCountFunc() {
  // const [count, setCount] = useState(0);
  const [ count, dispatchCount ] = useReducer(countReducer, 0);
  const [ name, setName ] = useState('jokcy');
  const context = useContext(MyContext);
  const inputRef = useRef();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(c => c + 1)
  //     dispatchCount({type: 'add'})
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    console.log(inputRef);
    return () => {
      console.log('effect deteched');
    }
  }, [count])

  // 先执行，可能会影响性能
  // useLayoutEffect(() => {
  //   console.log('layout effect invoked');
  //   return () => {
  //     console.log('layout effect deteched');
  //   }
  // }, [count])
  
  return (
    <div>
      <input ref={inputRef} value = {name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => dispatchCount({type: 'add'})}>{count}</button>
      <p>{context}</p>
    </div>
  )
}

export default MyCountFunc;