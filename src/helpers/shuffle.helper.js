// Fisher-Yates shuffle
export function shuffle(array) {
    const tempArray = [...array];

    for (let i = tempArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
    }

    return tempArray;
}
  
