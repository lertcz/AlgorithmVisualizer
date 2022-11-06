const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
)

function isSorted(arr) {
  return arr.every(function (x, i) {
    return i === 0 || x >= arr[i - 1];
  });
}

async function wave(canvasRef, arr, drawArray) {
  let waveLength = Math.floor(arr.length / 6)

  for (let i = 0; i < arr.length + waveLength-1; i++) {
    drawArray(canvasRef, ["wave", i, i+waveLength-1])
    await sleep(75)
  }

  drawArray(canvasRef)
}

export async function shuffleArray(canvasRef, elements, drawArray) {
  //let oldLength = elements.length
  let currentIndex = elements.length,  randomIndex;

  // elememt check for disabling the shuffle after changing the size !broken rn
  while (currentIndex !== 0) { // && oldLength === elements.length) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [elements[currentIndex], elements[randomIndex]] = [elements[randomIndex], elements[currentIndex]];

    drawArray(canvasRef, ["highlight", randomIndex])
    await sleep(50) // 100
  }
  drawArray(canvasRef)
}

export async function BubbleSort(canvasRef, elements, drawArray) {
  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = 0; j < elements.length - i - 1; j++) {
      if (isSorted(elements)) break
      if (elements[j] > elements[j + 1]) {
        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]];
      }
      drawArray(canvasRef, ["highlight", j+1])
      await sleep(10)
    }
  }

  wave(canvasRef, elements, drawArray)
}

export async function SelctionSort(canvasRef, elements, drawArray) {
  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = 0; j < elements.length - i - 1; j++) {
      if (isSorted(elements)) break
      if (elements[j] > elements[j + 1]) {
        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]];
      }
      drawArray(canvasRef, ["highlight", j+1])
      await sleep(10)
    }
  }

  wave(canvasRef, elements, drawArray)
}