const array2D = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, -9],
]

// Function to check if a row contains at least one negative number
function hasNegative(row) {
  return row.some((num) => num < 0)
}

// Function to process rows concurrently and log those with negative numbers
function logRowsWithNegatives(array2D) {
  const chunkSize = Math.ceil(array2D.length / 4) // Adjust the chunk size based on your preference
  const chunks = []
  for (let i = 0; i < array2D.length; i += chunkSize) {
    chunks.push(array2D.slice(i, i + chunkSize))
  }

  const promises = chunks.map((chunk) => {
    return new Promise((resolveChunk, rejectChunk) => {
      const rowPromises = chunk.map((row) => {
        return new Promise((resolveRow, rejectRow) => {
          if (hasNegative(row)) {
            resolveRow(row)
          } else {
            resolveRow(null)
          }
        })
      })

      Promise.all(rowPromises)
        .then((rowsWithNegatives) => {
          rowsWithNegatives.forEach((row) => {
            if (row !== null) {
              console.log('Row with negative numbers:', row)
            }
          })
          resolveChunk()
        })
        .catch((error) => {
          rejectChunk(error)
        })
    })
  })

  return Promise.all(promises)
}

logRowsWithNegatives(array2D)
  .then(() => {
    console.log('All rows with negative numbers logged.')
  })
  .catch((error) => {
    console.error('Error:', error)
  })
