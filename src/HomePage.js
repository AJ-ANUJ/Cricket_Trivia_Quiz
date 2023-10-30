import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataContext } from './ReadData';
import selectQuestions from './SelectQuestions';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const questions = useContext(dataContext);
    const handleClick = () => {
        const qa = selectQuestions(questions); 
        // console.log(qa);
        navigate('/play_quiz', { state : { qa, questions }});
    };

    return (
    <div className='home-page'>
        <p className='p'>Cricket Trivia</p>
        <div className='message-div'>
        <p className='message'>Play this fun quiz to test your cricket knowledge !</p>
        </div>
        <div className='button-div'>
        <button onClick={handleClick} className='button'>Start Quiz</button>
        </div>
    </div>
  );
}

export default HomePage