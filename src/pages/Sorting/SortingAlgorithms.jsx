const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
)

function isSorted(arr) {
  return arr.every(function (x, i) {
    return i === 0 || x >= arr[i - 1];
  });
}

function __getSquaredTime(ms, NoE) {
  // Number of elements
  return ms/(NoE * NoE)
}

function __getLogTime(ms, NoE) {
  return ms/(NoE * Math.log(NoE))
  
}

async function wave(canvasRef, arr, drawArray) {
  let _time = __getSquaredTime(20000, arr.length)
  let waveLength = Math.floor(arr.length / 6)

  for (let i = 0; i < arr.length + waveLength-1; i++) {
    drawArray(canvasRef, ["wave", i, i+waveLength-1])
    await sleep(_time)
  }

  drawArray(canvasRef)
}

let timeToSort = 20000

export async function shuffleArray(canvasRef, elements, drawArray) {
  let _time = __getSquaredTime(timeToSort/5, elements.length)
  
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
    await sleep(_time)
  }
  drawArray(canvasRef)
}

export async function BubbleSort(canvasRef, elements, drawArray) {
  let _time = __getSquaredTime(timeToSort, elements.length)

  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = 0; j < elements.length - i - 1; j++) {
      if (isSorted(elements)) break
      if (elements[j] > elements[j + 1]) {
        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]]
      }
      drawArray(canvasRef, ["highlight", j+1])
      await sleep(_time)
    }
  }

  await wave(canvasRef, elements, drawArray)
}

export async function SelctionSort(canvasRef, elements, drawArray) {
  let _time = __getSquaredTime(timeToSort, elements.length)
  
  let minimumIndex = null
  for (let i = 0; i < elements.length; i++) {
    minimumIndex = i
    for (let j = 0+i; j < elements.length; j++) {
      if (elements[j] < elements[minimumIndex]) {
        minimumIndex = j
      }
    };
    [elements[minimumIndex], elements[i]] = [elements[i], elements[minimumIndex]]
    drawArray(canvasRef, ["highlight", minimumIndex])
    await sleep(_time);
  }

  await wave(canvasRef, elements, drawArray)
}

export async function InsertionSort(canvasRef, elements, drawArray) {
  let _time = __getSquaredTime(timeToSort, elements.length)
  
  for (let i = 1; i < elements.length; i++) {
    let currentIndex = i
    while (currentIndex >= 1) {
      if (elements[currentIndex] < elements[currentIndex - 1]) {
        [elements[currentIndex], elements[currentIndex - 1]] = [elements[currentIndex - 1], elements[currentIndex]]
      }
      else break
      drawArray(canvasRef, ["highlight", currentIndex - 1])
      await sleep(_time);
      currentIndex--
    }
  }

  await wave(canvasRef, elements, drawArray)
}

export async function QuickSort(canvasRef, elements, drawArray) {
  let _time = __getLogTime(timeToSort, elements.length)

  /* p - partition, S - start, E - end*/
  async function _QuickSort(start, end) {
    if (start < end) {
      let pivot = await _Partiotion(start, end)
      await _QuickSort(start, pivot - 1)
      await _QuickSort(pivot + 1, end)
    }
    
  }
  
  async function _Partiotion(start, end) {
    let pivot = elements[end]
    let i = start - 1

    for (let j = start; j <= end-1; j++) { // !
      if (elements[j] < pivot) {
        i++
        [elements[i], elements[j]] = [elements[j], elements[i]]

        drawArray(canvasRef, ["pivot", i, end, j])
        await sleep(_time)
      }
    }
    [elements[i + 1], elements[end]] = [elements[end], elements[i + 1]]


    return i + 1
  }

  await _QuickSort(0, elements.length-1)

  await wave(canvasRef, elements, drawArray)
}

export async function MergeSort(canvasRef, elements, drawArray) {
  let _time = __getLogTime(timeToSort, elements.length)
  
  async function _MergeSort(start, end) {
    if (start === end) return
    
    let mid = ((start + end) / 2) >> 0

    await _MergeSort(start, mid)
    await _MergeSort(mid+1, end)
    await _Merge(start, mid, end)
  }
  
  async function _Merge(start, mid, end) {
    // temp arrays
    let L = elements.slice(start, mid+1)
    let R = elements.slice(mid+1, end+1)
    let insertionLocation = start

    // while there are items in both lists get rid of one side
    while (L.length && R.length) {
      if (L[0] < R[0]) {
        elements[insertionLocation] = L.shift()
        
      }
      else {
        elements[insertionLocation] = R.shift()
      }
      // TODO remove elements that are taken from
      // elements[Rlen - insertionLocation + 1] = -1
      insertionLocation++

      drawArray(canvasRef, ["highlight", insertionLocation-1])
      await sleep(_time)
    }
    
    // add rest
    L = L.concat(R)
    while (L.length) {
      elements[insertionLocation] = L.shift()
      insertionLocation++
      drawArray(canvasRef, ["highlight", insertionLocation-1])
      await sleep(_time)
    }
  }

  await _MergeSort(0, elements.length-1)

  await wave(canvasRef, elements, drawArray)
}

export async function CountingSort(canvasRef, elements, drawArray) {
  // O(nk) n = array len, k is range of elements (K = largest - smallest)
  //let _time = 20000 / (elements.length * (elements.length >= 100 ? 3 : 2))

  await wave(canvasRef, elements, drawArray)
}

export async function RadixSort(canvasRef, elements, drawArray) {
  // O(nd) n = array len, d len of largest number
  //let _time = 20000 / (elements.length * (elements.length >= 100 ? 3 : 2))

  await wave(canvasRef, elements, drawArray)
}
/* Bucket sort */
/* Comb sort */
/* Shell sort */