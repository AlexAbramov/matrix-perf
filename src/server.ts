import { performance } from 'perf_hooks'

console.log('Start')
let startTime = performance.now()

const testCount = 5
const vsize = 10000
const vector: number[] = [vsize]
const vector2: number[] = [vsize]
const matrix: number[][] = []

for (let x = 0; x < vsize; x++) {
    vector[x] = (x+0.5)/vsize
    matrix[x] = [vsize]
    for (let y = 0; y < vsize; y++) {
        matrix[x][y] = (x - y)/vsize
    }
}

logTime('matrix initialized')

for (let n = 0; n < testCount; n++) {

    for (let y = 0; y < vsize; y++) {
        let sum = 0
        for (let x = 0; x < vsize; x++) {
            sum += matrix[x][y] * vector[x]
        }
        vector2[y] = sum
    }

    logTime('op completed')

//    console.log(vector2)

    for (let y = 0; y < vsize; y++) {
        vector[y]=vector2[y]
    }    

}

console.log('End')


function logTime(text: string) {
    const endTime = performance.now()
    const timeSpan = endTime - startTime
    console.log(text + ': ' + timeSpan + 'ms')
    startTime = endTime
}

