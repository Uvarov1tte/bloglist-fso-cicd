const app = require('./server/app')

const PORT = process.env.PORT ? process.env.PORT : 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})