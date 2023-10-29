import generateNum from "./GenerateRandomNum";

const selectQuestions = (data) => {
    console.log(data);
    const qArray = Object.keys(data).map(key => [key, data[key].split(', ')]);
    console.log(qArray);
    const indices = generateNum(0, qArray.length-1, 10);
    const qa = [];
    for(let i=0; i<indices.length; i++) {
        qa.push(qArray[indices[i]]);
    }
    console.log(qa);
    return qa;
}

export default selectQuestions;