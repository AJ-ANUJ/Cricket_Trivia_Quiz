import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import generateNum from './GenerateRandomNum';
import './Quiz.css';
import selectQuestions from './SelectQuestions';

const Quiz = () => {
    const location = useLocation();

    const randomIndices = generateNum(0, 3, 4);
    const [states, setStates] = useState({
        qNo:0,
        correctAns:0,
        quizComplete:false,
        qArray: location.state?.qa,
        questions: location.state?.questions,
        showMessage: false,
        answeredCorrect: false,
        chosenOption: '',
        o1: location.state?.qa[0][1][randomIndices[0]],
        o2: location.state?.qa[0][1][randomIndices[1]],
        o3: location.state?.qa[0][1][randomIndices[2]],
        o4: location.state?.qa[0][1][randomIndices[3]],
        newGame: false,
        isAttempted: false,
        firstMessage: true,
    });

    if(states.newGame === true) {
        states.o1 = states.qArray[0][1][randomIndices[0]];
        states.o2 = states.qArray[0][1][randomIndices[1]];
        states.o3 = states.qArray[0][1][randomIndices[2]];
        states.o4 = states.qArray[0][1][randomIndices[3]];
        states.newGame = false;
    }
    
    const q = states.qArray[states.qNo][0];
    const correctOption = states.qArray[states.qNo][1][0];
    
    const onClickHandle = (option) => {
        
        if(states.isAttempted) {
            setStates((prevState) => ({
                ...prevState,
                firstMessage: false,
            }))
        }
        else if(option === correctOption) {
            setStates((prevState) => ({
                ...prevState,
                showMessage: true,
                firstMessage: true,
                answeredCorrect: true,
                chosenOption: option,
                isAttempted: true,
            }))
        }
        else {
            setStates((prevState) => ({
                ...prevState,
                showMessage: true,
                firstMessage: true,
                answeredCorrect: false,
                chosenOption: option,
                isAttempted: true,
            }))
        }

        // setTimeout(() => {
        //     setStates((prevState) => ({
        //         ...prevState,
        //         showMessage: false,
        //         answeredCorrect: false,
        //     }))
        // }, 2000)
        
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
            chosenOption: '',
            newGame: true,
            isAttempted: false,
        }))
    }

    const handleNextButtonClick = () => {
        if(states.qNo < 9) {
            if(states.chosenOption === correctOption) {
                setStates((prevState) => ({
                    ...prevState,
                    qNo: prevState.qNo + 1,
                    correctAns: prevState.correctAns + 1,
                    quizComplete: prevState.quizComplete,
                    showMessage: false,
                    answeredCorrect: false,
                    o1: prevState.qArray[prevState.qNo+1][1][randomIndices[0]],
                    o2: prevState.qArray[prevState.qNo+1][1][randomIndices[1]],
                    o3: prevState.qArray[prevState.qNo+1][1][randomIndices[2]],
                    o4: prevState.qArray[prevState.qNo+1][1][randomIndices[3]],
                    isAttempted: false,
                }));
            }
            else {
                setStates((prevState) => ({
                    ...prevState,
                    qNo: prevState.qNo + 1,
                    correctAns: prevState.correctAns,
                    quizComplete: prevState.quizComplete,
                    showMessage: false,
                    answeredCorrect: false,
                    o1: prevState.qArray[prevState.qNo+1][1][randomIndices[0]],
                    o2: prevState.qArray[prevState.qNo+1][1][randomIndices[1]],
                    o3: prevState.qArray[prevState.qNo+1][1][randomIndices[2]],
                    o4: prevState.qArray[prevState.qNo+1][1][randomIndices[3]],
                    isAttempted: false,
                }));
            }
        }
        else{
            if(states.chosenOption === correctOption) {
                setStates((prevState) => ({
                    ...prevState,
                    qNo: prevState.qNo,
                    correctAns: prevState.correctAns + 1,
                    quizComplete: true,
                    isAttempted: false,
                }));
            }
            else {
                setStates((prevState) => ({
                    ...prevState,
                    qNo: prevState.qNo,
                    correctAns: prevState.correctAns,
                    quizComplete: true,
                    isAttempted: false,
                }));
            }
        }
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
                    <div className='c2-option-nxtbutton-message-div'>
                        <div className='c2-button-div'>
                            <button className='option' onClick={() => onClickHandle(states.o1)}>{states.o1}</button>
                            <button className='option' onClick={() => onClickHandle(states.o2)}>{states.o2}</button>
                            <button className='option' onClick={() => onClickHandle(states.o3)}>{states.o3}</button>
                            <button className='option' onClick={() => onClickHandle(states.o4)}>{states.o4}</button>
                        </div>
                        {states.showMessage ? 
                        (states.firstMessage ? (
                            <div className='c2-correct-p-div'>
                                <p className='c2-correct-ans-p'>{ states.answeredCorrect ? 'Correct' : 'Wrong! Correct answer is '+correctOption }</p>
                            </div>
                        ) : (
                            <div className='c2-second_attempt-p-div'>
                                <p className='c2-correct-ans-p-none'>Already attempted, please move on to next question.</p>
                            </div>
                        )) : (
                            <div className='c2-space-fill'>
                                <p className='c2-space-fill-p'>space fill</p>
                            </div>    
                        )}
                        <div>
                            <button className='c2-next-button' onClick={handleNextButtonClick}>Next Question</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='c2-message-div'>
                <p className='c2-message'>You got {states.correctAns} correct answers out of 10!</p>
                <button className='play-again-button' onClick={handlePlayAgain}>Play Again ?</button>
                </div>
            )}
        </div>
    )
}

export default Quiz