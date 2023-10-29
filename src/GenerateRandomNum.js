const generateNum = (min, max, n) => {
    const allIntegers = Array.from({ length: max - min + 1 }, (_, index) => index + min);
    const uniqueRandomIntegers = [];
    while (uniqueRandomIntegers.length < n) {
        const randomIndex = Math.floor(Math.random() * allIntegers.length);
        uniqueRandomIntegers.push(allIntegers.splice(randomIndex, 1)[0]);
    }
  return uniqueRandomIntegers;
}

export default generateNum;