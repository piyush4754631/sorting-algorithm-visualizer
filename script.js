let array = [];

let sorting = false;
let stopped = false;

let comparisons = 0;
let swaps = 0;


// ============================
// DOM Elements
// ============================

const container =
    document.getElementById("array");

const algorithm =
    document.getElementById("algorithm");

const size =
    document.getElementById("size");

const speed =
    document.getElementById("speed");

const generateBtn =
    document.getElementById("generate");

const sortBtn =
    document.getElementById("sort");

const stopBtn =
    document.getElementById("stop");

const comparisonDisplay =
    document.getElementById("comparisons");

const swapsDisplay =
    document.getElementById("swaps");


// ============================
// Generate Array
// ============================

function generateArray() {

    array = [];

    const n = Number(size.value);

    for (let i = 0; i < n; i++) {

        array.push(
            Math.floor(
                Math.random() * 400
            ) + 20
        );
    }

    comparisons = 0;
    swaps = 0;

    updateStats();

    drawArray();
}


// ============================
// Draw Array
// ============================

function drawArray() {

    container.innerHTML = "";

    for (let value of array) {

        const bar =
            document.createElement("div");

        bar.classList.add("bar");

        bar.style.height =
            value + "px";

        container.appendChild(bar);
    }
}


// ============================
// Delay
// ============================

function delay() {

    const speedValue =
        Number(speed.value);

    return new Promise(resolve => {

        setTimeout(
            resolve,
            101 - speedValue
        );

    });
}


// ============================
// Update Stats
// ============================

function updateStats() {

    comparisonDisplay.textContent =
        comparisons;

    swapsDisplay.textContent =
        swaps;
}


// ============================
// Color Bars
// ============================

function colorBars(i, j, color) {

    const bars =
        container.children;

    if (bars[i]) {
        bars[i].style.background =
            color;
    }

    if (bars[j]) {
        bars[j].style.background =
            color;
    }
}


// ============================
// Reset Bar Colors
// ============================

function resetColor(i, j) {

    const bars =
        container.children;

    if (bars[i]) {
        bars[i].style.background =
            "#3b82f6";
    }

    if (bars[j]) {
        bars[j].style.background =
            "#3b82f6";
    }
}


// ============================
// Swap
// ============================

async function swap(i, j) {

    const bars =
        container.children;

    colorBars(i, j, "#ef4444");

    await delay();

    let temp =
        array[i];

    array[i] =
        array[j];

    array[j] =
        temp;


    bars[i].style.height =
        array[i] + "px";

    bars[j].style.height =
        array[j] + "px";


    swaps++;

    updateStats();

    resetColor(i, j);
}


// ==================================================
// 1. BUBBLE SORT
// ==================================================

async function bubbleSort() {

    let n = array.length;

    for (let i = 0; i < n - 1; i++) {

        for (let j = 0;
             j < n - i - 1;
             j++) {

            if (stopped) return;


            colorBars(
                j,
                j + 1,
                "#f59e0b"
            );


            comparisons++;

            updateStats();

            await delay();


            if (
                array[j] >
                array[j + 1]
            ) {

                await swap(
                    j,
                    j + 1
                );
            }


            resetColor(
                j,
                j + 1
            );
        }
    }
}


// ==================================================
// 2. SELECTION SORT
// ==================================================

async function selectionSort() {

    let n = array.length;


    for (let i = 0;
         i < n - 1;
         i++) {

        let minIndex = i;


        for (let j = i + 1;
             j < n;
             j++) {

            if (stopped) return;


            colorBars(
                j,
                minIndex,
                "#f59e0b"
            );


            comparisons++;

            updateStats();

            await delay();


            if (
                array[j] <
                array[minIndex]
            ) {

                minIndex = j;
            }


            resetColor(
                j,
                minIndex
            );
        }


        if (minIndex !== i) {

            await swap(
                i,
                minIndex
            );
        }
    }
}


// ==================================================
// 3. INSERTION SORT
// ==================================================

async function insertionSort() {

    let n = array.length;


    for (let i = 1;
         i < n;
         i++) {

        let j = i;


        while (j > 0) {

            if (stopped) return;


            colorBars(
                j,
                j - 1,
                "#f59e0b"
            );


            comparisons++;

            updateStats();

            await delay();


            if (
                array[j] <
                array[j - 1]
            ) {

                await swap(
                    j,
                    j - 1
                );

                j--;

            } else {

                resetColor(
                    j,
                    j - 1
                );

                break;
            }
        }
    }
}


// ==================================================
// 4. MERGE SORT
// ==================================================

async function mergeSort(
    left = 0,
    right = array.length - 1
) {

    if (
        left >= right ||
        stopped
    ) {
        return;
    }


    let mid =
        Math.floor(
            (left + right) / 2
        );


    await mergeSort(
        left,
        mid
    );


    await mergeSort(
        mid + 1,
        right
    );


    await merge(
        left,
        mid,
        right
    );
}


// ============================
// Merge
// ============================

async function merge(
    left,
    mid,
    right
) {

    let leftArray =
        array.slice(
            left,
            mid + 1
        );

    let rightArray =
        array.slice(
            mid + 1,
            right + 1
        );


    let i = 0;

    let j = 0;

    let k = left;


    while (
        i < leftArray.length &&
        j < rightArray.length
    ) {

        if (stopped) return;


        comparisons++;

        updateStats();


        colorBars(
            left + i,
            mid + 1 + j,
            "#f59e0b"
        );


        await delay();


        if (
            leftArray[i] <=
            rightArray[j]
        ) {

            array[k] =
                leftArray[i];

            i++;

        } else {

            array[k] =
                rightArray[j];

            j++;
        }


        container.children[
            k
        ].style.height =
            array[k] + "px";


        resetColor(
            left + i,
            mid + 1 + j
        );


        k++;
    }


    while (
        i < leftArray.length
    ) {

        if (stopped) return;


        array[k] =
            leftArray[i];

        container.children[
            k
        ].style.height =
            array[k] + "px";


        i++;

        k++;

        await delay();
    }


    while (
        j < rightArray.length
    ) {

        if (stopped) return;


        array[k] =
            rightArray[j];

        container.children[
            k
        ].style.height =
            array[k] + "px";


        j++;

        k++;

        await delay();
    }
}


// ==================================================
// Start Sorting
// ==================================================

async function startSorting() {

    if (sorting) return;


    sorting = true;

    stopped = false;


    generateBtn.disabled = true;

    sortBtn.disabled = true;

    algorithm.disabled = true;

    size.disabled = true;


    comparisons = 0;

    swaps = 0;

    updateStats();


    let selected =
        algorithm.value;


    if (
        selected === "bubble"
    ) {

        await bubbleSort();

    } else if (
        selected === "selection"
    ) {

        await selectionSort();

    } else if (
        selected === "insertion"
    ) {

        await insertionSort();

    } else if (
        selected === "merge"
    ) {

        await mergeSort();
    }


    if (!stopped) {

        const bars =
            container.children;


        for (let bar of bars) {

            bar.style.background =
                "#22c55e";
        }
    }


    sorting = false;


    generateBtn.disabled = false;

    sortBtn.disabled = false;

    algorithm.disabled = false;

    size.disabled = false;
}


// ==================================================
// Stop
// ==================================================

function stopSorting() {

    stopped = true;

    sorting = false;


    generateBtn.disabled = false;

    sortBtn.disabled = false;

    algorithm.disabled = false;

    size.disabled = false;
}


// ==================================================
// Algorithm Information
// ==================================================

const information = {

    bubble: {

        name: "Bubble Sort",

        description:
            "Bubble Sort compares adjacent elements and swaps them when they are in the wrong order.",

        best: "O(n)",

        average: "O(n²)",

        worst: "O(n²)",

        space: "O(1)"
    },


    selection: {

        name: "Selection Sort",

        description:
            "Selection Sort finds the minimum element and places it at the beginning of the unsorted portion.",

        best: "O(n²)",

        average: "O(n²)",

        worst: "O(n²)",

        space: "O(1)"
    },


    insertion: {

        name: "Insertion Sort",

        description:
            "Insertion Sort takes one element at a time and inserts it into its correct position.",

        best: "O(n)",

        average: "O(n²)",

        worst: "O(n²)",

        space: "O(1)"
    },


    merge: {

        name: "Merge Sort",

        description:
            "Merge Sort divides the array into smaller parts, sorts them and merges the sorted parts.",

        best: "O(n log n)",

        average: "O(n log n)",

        worst: "O(n log n)",

        space: "O(n)"
    }
};


// ==================================================
// Update Algorithm Information
// ==================================================

function updateInformation() {

    let selected =
        algorithm.value;

    let data =
        information[selected];


    document.getElementById(
        "algorithmName"
    ).textContent =
        data.name;


    document.getElementById(
        "description"
    ).textContent =
        data.description;


    document.getElementById(
        "best"
    ).textContent =
        data.best;


    document.getElementById(
        "average"
    ).textContent =
        data.average;


    document.getElementById(
        "worst"
    ).textContent =
        data.worst;


    document.getElementById(
        "space"
    ).textContent =
        data.space;
}


// ==================================================
// Event Listeners
// ==================================================

generateBtn.addEventListener(
    "click",
    generateArray
);


sortBtn.addEventListener(
    "click",
    startSorting
);


stopBtn.addEventListener(
    "click",
    stopSorting
);


algorithm.addEventListener(
    "change",
    updateInformation
);


size.addEventListener(
    "input",
    () => {

        if (!sorting) {

            generateArray();
        }
    }
);


// ==================================================
// Initial Array
// ==================================================

generateArray();

updateInformation();