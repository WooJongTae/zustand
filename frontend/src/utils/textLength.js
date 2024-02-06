const textLength = (textData) => {
  let resultText = "";
  resultText = textData;
  if (textData.length > 100) {
    resultText = textData.slice(0, 100) + " 생략 ...................";
  }

  return resultText;
};

export default textLength;
