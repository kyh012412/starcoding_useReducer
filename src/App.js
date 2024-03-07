import { useEffect, useReducer, useState } from 'react';
import './App.css';
import Student from './component/Student';

const initialState = {
  count: 0,
  students: [],
};

//reducer - state를 업데이트 하는 역할 (은행)
//dispatch - state 업데이트를 위한 요구
//action - 요구의 내용

//state는 reducer가 불리는 시점에 money의 값을 가지게됨
const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'add-student':
      const name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: true,
      };
      return {
        count: state.students.length + 1,
        students: [...state.students, newStudent],
      };
    case 'delete-student':
      return {
        count: state.count - 1,
        students: state.students.filter(
          (student) => student.id !== action.payload.id
        ),
      };
    case 'mark-student':
      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return { ...student, isHere: !student.isHere };
          }
          return student;
        }),
      };
    default:
      return state;
  }
};

function App() {
  const [name, setName] = useState('');
  const [studentsInfo, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // console.log(input);
  });

  return (
    <div>
      <h2>출석부</h2>
      <h3> 총 학생 수: {studentsInfo.count}</h3>
      <input
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          //action은 보통 object 형태로 보냄
          //그안에 type과 payload를 같이 보냄
          dispatch({ type: 'add-student', payload: { name } });
        }}
      >
        추가
      </button>
      <div>
        {studentsInfo.students.map((student) => {
          return (
            <Student
              key={student.id}
              name={student.name}
              dispatch={dispatch}
              id={student.id}
              isHere={student.isHere}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
