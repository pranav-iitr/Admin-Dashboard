function generateTrigrams(str) {
  const trigrams = [];
  const words = `  ${str.toLowerCase()}  `.match(/\b\w+\b/g);

  if (words) {
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      for (let j = 0; j < word.length - 2; j++) {
        const trigram = word.slice(j, j + 3);
        trigrams.push(trigram);
      }
    }
  }

  return trigrams;
}

export function trigramSearch(query, array) {
  const queryTrigrams = generateTrigrams(query);
  const results = [];

  for (let i = 0; i < array.length; i++) {
    const obj = array[i];
    let objectText = "";

    // Concatenate all object values into a single string for searching
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        objectText += `${obj[key]} `;
      }
    }

    const objectTrigrams = generateTrigrams(objectText);

    // Count matches between query trigrams and object trigrams
    let matches = 0;
    for (const trigram of queryTrigrams) {
      if (objectTrigrams.includes(trigram)) {
        matches++;
      }
    }

    // Consider a match if more than 30% of trigrams are found
    const matchPercentage = matches / queryTrigrams.length;
    if (matchPercentage >= 0.3) {
      results.push(obj);
    }
  }

  return results;
}
