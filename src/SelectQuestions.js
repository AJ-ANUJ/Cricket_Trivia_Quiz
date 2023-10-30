import generateNum from "./GenerateRandomNum";

const selectQuestions = (data) => {
    const qArray = Object.keys(data).map(key => [key, data[key].split(', ')]);
    const indices = generateNum(0, qArray.length-1, 10);
    const qa = [];
    for(let i=0; i<indices.length; i++) {
        qa.push(qArray[indices[i]]);
    }
    return qa;
}

export default selectQuestions;