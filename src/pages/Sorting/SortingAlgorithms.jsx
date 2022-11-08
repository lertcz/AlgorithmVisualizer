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
    await sleep(25)
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
    await sleep(25) // 50 | 100
  }
  drawArray(canvasRef)
}

export async function BubbleSort(canvasRef, elements, drawArray) {
  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = 0; j < elements.length - i - 1; j++) {
      if (isSorted(elements)) break
      if (elements[j] > elements[j + 1]) {
        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]]
      }
      drawArray(canvasRef, ["highlight", j+1])
      await sleep(10)
    }
  }

  await wave(canvasRef, elements, drawArray)
}

export async function SelctionSort(canvasRef, elements, drawArray) {
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
    await sleep(100);
  }

  await wave(canvasRef, elements, drawArray)
}

export async function InsertionSort(canvasRef, elements, drawArray) {
  for (let i = 1; i < elements.length; i++) {
    let currentIndex = i
    while (currentIndex >= 1) {
      if (elements[currentIndex] < elements[currentIndex - 1]) {
        [elements[currentIndex], elements[currentIndex - 1]] = [elements[currentIndex - 1], elements[currentIndex]]
      }
      else break
      drawArray(canvasRef, ["highlight", currentIndex - 1])
      await sleep(100);
      currentIndex--
    }
  }

  await wave(canvasRef, elements, drawArray)
}

export async function QuickSort(canvasRef, elements, drawArray) {
  let _time = 200
  /* p - partition, S - start, E - end*/
  async function _QuickSort(pS, pE) {
    let pivot = ((pE + pS) / 2) >> 0 // middle point
    pE -= 1

    // R: item from right - will be 1st element < pivot
    // L: item from left - will be 1st element > pivot
    let R, L

    // loop prevention
    //let numberOfSwaps = 0

    console.log("Original pivot:", pivot);
    [elements[pE], elements[pivot]] = [elements[pivot], elements[pE]]
    pivot = pE

    /* drawArray(canvasRef)
    await sleep(_time) */
    
    do {
      console.log("Pivot size:", elements[pivot])
      R = pE-1
      L = pS 

      // element from right
      for (; R > pS; R--) {
        console.log("R:", R, "size:", elements[R])
        if (elements[R] < elements[pivot]) break // L != pivot && 
      }
      
      // element from left
      for (; L < pE; L++) {
        console.log("L:", L, "size:", elements[L])
        if (elements[L] > elements[pivot]) break // L != pivot && 
      }
      
      if (R > L) {
        [elements[L], elements[R]] = [elements[R], elements[L]]
        //numberOfSwaps += 1
      }
      // with last step pivot and element from left will be swapped
      else [elements[pivot], elements[L]] = [elements[L], elements[pivot]]
      
      drawArray(canvasRef, ["pivot", L, pivot, R])
      await sleep(_time)
    } while (R > L && R !== pS && L !== pE-1)

    console.log("lastswap")
    drawArray(canvasRef, ["highlight", L])
    await sleep(_time)
    
    //if (((pS + L-1) / 2) >> 0 !== 0 && numberOfSwaps > 0) await _QuickSort(pS, L-1)
    //if (((L+1 + pE+1) / 2) >> 0 !== 0 && numberOfSwaps > 0) await _QuickSort(L+1, pE+1)
  }

  await _QuickSort(0, elements.length)

  await wave(canvasRef, elements, drawArray)
}

/* merge sort */
export async function MergeSort(canvasRef, elements, drawArray) {
  let _time = 50
  async function _MergeSort(start, end) {
    if (start === end) return
    
    let mid = ((start + end) / 2) >> 0

    await _MergeSort(start, mid)
    await _MergeSort(mid+1, end)
    await _Merge(start, mid, end)
  }
  
  async function _Merge(start, mid, end) {
    console.log("\nMerge:", start, mid, end)

    // temp arrays     size of array                        startAt
    let L = elements.slice(start, mid+1) // [...Array(mid - start + 1).keys()].map(i => i + start)
    let R = elements.slice(mid+1, end+1) // [...Array(end - mid).keys()].map(i => i + mid + 1)
    let insertionLocation = start
    let Rlen = R.length

    console.log(L, R)
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

      drawArray(canvasRef, ["highlight", insertionLocation])
      await sleep(_time)
    }
    
    // add rest
    L = L.concat(R)
    while (L.length) {
      elements[insertionLocation] = L.shift()
      insertionLocation++
      drawArray(canvasRef, ["highlight", insertionLocation])
      await sleep(_time)
    }
  }

  await _MergeSort(0, elements.length-1)

  await wave(canvasRef, elements, drawArray)
}
/* counting sort */
/* radix sort */
/* Bucket sort */
/* Comb sort */
/* Shell sort */