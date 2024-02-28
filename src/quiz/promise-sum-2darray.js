const array2D = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
// Function to compute the sum of all integers in a 2D array
function sum2DArray(arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      reject('Invalid input: Expected an array')
      return
    }

    // Split the array into chunks to process concurrently
    const chunkSize = Math.ceil(arr.length / 4) // Adjust the chunk size based on your preference
    const chunks = []
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize))
    }

    // Perform the sum calculation concurrently for each chunk
    const promises = chunks.map((chunk) => {
      return new Promise((resolveChunk, rejectChunk) => {
        let sum = 0
        for (let i = 0; i < chunk.length; i++) {
          for (let j = 0; j < chunk[i].length; j++) {
            sum += chunk[i][j]
          }
        }
        resolveChunk(sum)
      })
    })

    // Combine the results of all chunks
    Promise.all(promises)
      .then((chunkSums) => {
        const totalSum = chunkSums.reduce((acc, curr) => acc + curr, 0)
        resolve(totalSum)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

sum2DArray(array2D)
  .then((totalSum) => {
    console.log('Total sum:', totalSum)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
