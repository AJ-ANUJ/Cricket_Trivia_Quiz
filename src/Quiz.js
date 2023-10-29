import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import generateNum from './GenerateRandomNum';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const location = useLocation();
    const qArray = location.state?.qa;
    // console.log(qArray);
    const [states, setStates] = useState({
        qNo:0,
        correctAns:0,
        quizComplete:false,
    });
    const q = qArray[states.qNo][0];
    const randomIndices = generateNum(0, 3, 4);
    const o1 = qArray[states.qNo][1][randomIndices[0]];
    const o2 = qArray[states.qNo][1][randomIndices[1]];
    const o3 = qArray[states.qNo][1][randomIndices[2]];
    const o4 = qArray[states.qNo][1][randomIndices[3]];
    const correctOption = qArray[states.qNo][1][0];
    
    console.log(qArray);
    
    const onClickHandle = (option) => {
        
        if(states.qNo < 9) {
            if(option === correctOption) {
                setStates((prevState) => ({
                    ...prevState,
                    qNo: prevState.qNo + 1,
                    correctAns: prevState.correctAns + 1,
                    quizComplete: prevState.quizComplete,
                }));
            }
            else {
                setStates((prevState) => ({
                    ...prevState,
                    qNo: prevState.qNo + 1,
                    correctAns: prevState.correctAns,
                    quizComplete: prevState.quizComplete,
                }));
            }
        }
        else{
            if(option === correctOption) {
                setStates((prevState) => ({
                    ...prevState,
                    qNo: prevState.qNo,
                    correctAns: prevState.correctAns + 1,
                    quizComplete: true,
                }));
            }
            else {
                setStates((prevState) => ({
                    ...prevState,
                    qNo: prevState.qNo,
                    correctAns: prevState.correctAns,
                    quizComplete: true,
                }));
            }
        }
    }

    return (
        <div>
            {/* <p>Hello</p> */}
            { !states.quizComplete ? (
                <div>
                <p>Question {states.qNo+1}</p>
                <p>{q}</p>
                <button onClick={() => onClickHandle(o1)}>{o1}</button>
                <button onClick={() => onClickHandle(o2)}>{o2}</button>
                <button onClick={() => onClickHandle(o3)}>{o3}</button>
                <button onClick={() => onClickHandle(o4)}>{o4}</button>
                </div>
            ) : (
                <div>
                <p>You got {states.correctAns} out of 10!</p>
                {/* <button>Play Again ?</button> */}
                </div>
            )}
        </div>
    )
}

export default Quiz