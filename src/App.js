import { useReducer, useState } from 'react';
import './App.css';

//reducer - state를 업데이트 하는 역할 (은행)
//dispatch - state 업데이트를 위한 요구
//action - 요구의 내용

const ACTION_TYPES = {
  deposit:'deposit',
  withdraw:'withdraw'
}

//state는 reducer가 불리는 시점에 money의 값을 가지게됨
const reducer = (state,action) => {
  //..
  // console.log('reducer가 일을 합니다!',state,action);
  switch(action.type){
    case ACTION_TYPES.deposit:
      return state + action.payload;
    case ACTION_TYPES.withdraw:
      return state - action.payload;
    default :
      return state;
  }
}

function App() {
  const [number,setNumber] = useState(0);
  //useReducer 2개의 매개변수를 받는데 reducer와 money의 초기값이다.
  const [money,dispatch] = useReducer(reducer,0);

  return (
    <div>
      <h2>useReducer 은행에 오신것을 환영합니다.</h2>
      <p> 잔고: {money}원</p>
      <input
        type='number'
        value={number}
        onChange={e=>setNumber(parseInt(e.target.value))}
        step="1000"
      />
      <button onClick={()=>{
        //action은 보통 object 형태로 보냄
        //그안에 type과 payload를 같이 보냄
        dispatch({type:ACTION_TYPES.deposit,payload: number})
      }}>예금</button>
      <button onClick={()=>{
        //action은 보통 object 형태로 보냄
        //그안에 type과 payload를 같이 보냄
        dispatch({type:ACTION_TYPES.withdraw,payload: number})
      }}>출금</button>
    </div>
  );
}

export default App;
