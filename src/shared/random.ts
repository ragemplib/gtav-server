const randomOfThree = (numbers: number[]) => numbers[Math.floor(Math.random() * numbers.length)];

const randomNumber = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min)); 

export default { randomOfThree, randomNumber };