import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import generateNum from './GenerateRandomNum';
import './Quiz.css';
import selectQuestions from './SelectQuestions';

const Quiz = () => {
    const location = useLocation();

    const [states, setStates] = useState({
        qNo:0,
        correctAns:0,
        quizComplete:false,
        qArray: location.state?.qa,
        questions: location.state?.questions,
        showMessage: false,
        answeredCorrect: false,
    });

    const q = states.qArray[states.qNo][0];
    const randomIndices = generateNum(0, 3, 4);
    const o1 = states.qArray[states.qNo][1][randomIndices[0]];
    const o2 = states.qArray[states.qNo][1][randomIndices[1]];
    const o3 = states.qArray[states.qNo][1][randomIndices[2]];
    const o4 = states.qArray[states.qNo][1][randomIndices[3]];
    const correctOption = states.qArray[states.qNo][1][0];
    
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

    const handlePlayAgain = () => {
        setStates((prevState) => ({
            ...prevState,
            qNo:0,
            correctAns:0,
            quizComplete:false,
            qArray: selectQuestions(states.questions),
            showMessage: false,
            answeredCorrect: false,
        }))
    }

    return (
        <div style={{'height':'100%'}}>
            {/* <p>Hello</p> */}
            { !states.quizComplete ? (
                <div className='quiz-div'>
                    <div className='c2-qNo-div'>
                        <p className='question-no'>Question {states.qNo+1}</p>
                    </div>
                    <div className='c2-q-div'>
                        <p className='question'>{q}</p>
                    </div>
                    <div className='c2-button-and-message-div'>
                        <div className='c2-button-div'>
                            <button className='option' onClick={() => onClickHandle(o1)}>{o1}</button>
                            <button className='option' onClick={() => onClickHandle(o2)}>{o2}</button>
                            <button className='option' onClick={() => onClickHandle(o3)}>{o3}</button>
                            <button className='option' onClick={() => onClickHandle(o4)}>{o4}</button>
                            {/* <div className='c2-button-cell'>
                            <button className='option' onClick={() => onClickHandle(o1)}>{o1}</button>
                            </div>
                            <div className='c2-button-cell'>
                            <button className='option' onClick={() => onClickHandle(o2)}>{o2}</button>
                            </div>
                            <div className='c2-button-cell'>
                            <button className='option' onClick={() => onClickHandle(o3)}>{o3}</button>
                            </div>
                            <div className='c2-button-cell'>
                            <button className='option' onClick={() => onClickHandle(o4)}>{o4}</button>
                            </div> */}
                        </div>
                        {states.showMessage && (
                            <div>
                                <p className='c2-correct-ans-p'>{ states.answeredCorrect ? 'Correct' : 'Wrong! Correct answer is '+correctOption }</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='c2-message-div'>
                <p className='c2-message'>You got {states.correctAns} out of 10!</p>
                <button className='play-again-button' onClick={handlePlayAgain}>Play Again ?</button>
                </div>
            )}
        </div>
    )
}

export default Quiz