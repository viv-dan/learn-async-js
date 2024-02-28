const fetchPromise = fetch(
  'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
)

console.log(fetchPromise)

fetchPromise.then((response) => {
  console.log(`Received response? ${response.ok ? 'yes' : 'no'}`)
  console.log(`Response Status: ${response.status}`)
  console.log(fetchPromise)
})

console.log('Started request…')
