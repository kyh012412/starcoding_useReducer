import { useEffect, useReducer, useState } from 'react';
import './App.css';

//reducer - state를 업데이트 하는 역할 (은행)
//dispatch - state 업데이트를 위한 요구
//action - 요구의 내용

const ACTION_TYPES = {
  add:'add',
  delete:'delete'
}

//state는 reducer가 불리는 시점에 money의 값을 가지게됨
const reducer = (state,action) => {
  //..
  // console.log('reducer가 일을 합니다!',state,action);
  switch(action.type){
    case ACTION_TYPES.add:
      return [...state,action.payload];
    case ACTION_TYPES.delete:
      return state;
    default :
      return state;
  }
}

function App() {
  const [students,dispatch] = useReducer(reducer,[]);
  const [input,setInput] = useState('');

  useEffect(()=>{
    console.log(input);
  })

  return (
    <div>
      <h2>출석부</h2>
      <h3> 총 학생 수: {students.length}</h3>      
      <input
        type='text'
        value={input}
        onChange={e=>setInput(e.target.value)}
      />
      <button onClick={()=>{
        //action은 보통 object 형태로 보냄
        //그안에 type과 payload를 같이 보냄
        dispatch({type:ACTION_TYPES.add,payload:input})
      }}>추가</button>
      <div>
        {students.map((student,idx)=>{
          return (<h3>{student}</h3>
          <button onClick={()=>{dispatch({type:'delete',payload:student})}}>삭제</button>)
        })}
      </div>
    </div>
  );
}

export default App;
