import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataContext } from './ReadData';
import selectQuestions from './SelectQuestions';

const HomePage = () => {
    const navigate = useNavigate();
    const questions = useContext(dataContext);
    const handleClick = () => {
        const qa = selectQuestions(questions); 
        console.log(qa);
        navigate('/play_quiz', { state : { qa }});
    };

    return (
    <div>
        <p>Cricket Trivia</p>
        <p>Play this fun quiz to test your cricket knowledge !</p>
        <button onClick={handleClick}>Start Quiz</button>
    </div>
  );
}

export default HomePage