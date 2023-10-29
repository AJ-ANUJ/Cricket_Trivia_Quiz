import React, { useEffect, createContext } from 'react'

export const dataContext = createContext(null);

const ReadData = ({children}) => {
    
    var questions = {};
    async function tryFetch() {
        const response = await fetch(process.env.PUBLIC_URL + '/data/questions.txt');
        var data = await response.text();
        data = data.split('\n');
        for(let i=0; i<data.length; i+=2) {
            questions[data[i]] = data[i+1]
        }
        console.log(questions);
    }

    useEffect(() => {
        tryFetch()
    }, []);
   
    return (
    <dataContext.Provider value={questions}>
        {children}
    </dataContext.Provider>
  )
}

export default ReadData;

// const[text, setText] = useState("");
    
    // useEffect(() => {
    //     async function readData() {
    //         try {
    //             const response = await fetch('/data/questions.txt');
    //             if (!response.ok) {
    //                 throw new Error('Couldn\'t read the questions!');
    //             }
    //             const lines = await response.text();
    //             setText(lines.split('\n'));
    //         } catch (error) {
    //             console.error('Error! Couldn\'t read the questions!');
    //         }
    //     }
    //     readData();
    // }, [])
    
    // const [questionsList, setQuestionsList] = useState({});
    // useEffect(() => {
    //     if (text.length > 0) {
    //       const questions = {};
    //       for (let i = 0; i < text.length; i += 2) {
    //         const question = text[i];
    //         const answer = text[i + 1];
    //         questions[question] = answer;
    //       }
    //       setQuestionsList(questions);
    //     }
    //   }, [text]);

    // console.log(questionsList);




