import mongoose from 'mongoose'

const connection = {}

// async function connect() {
//   if (connection.isConnected) {
//     console.log('already connected')
//     return
//   }
//   else if (mongoose.connections.length > 0) {
//     connection.isConnected = mongoose.connections[0].readyState
//     if (connection.isConnected === 1) {
//       console.log('use previous connection')
//       return
//     }
//     await mongoose.disconnect()
//   }
//   const db = await mongoose.connect(process.env.DATABASE_URL, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true,
//   })
//   connection.isConnected = db.connections[0].readyState
// }

const connect = async () => mongoose.connect(process.env.DATABASE_URI)

async function disconnect() {
  // if (connection.isConnected) {
  //   if (process.env.NODE_ENV === 'production') {
  //     await mongoose.disconnect()
  //     connection.isConnected = false
  //   } else {
  //     console.log('not disconnected')
  //   }
  // }
}
function convertDocToObj(doc) {
  if (doc) {
    if (doc._id) doc._id = doc._id.toString()
    if (doc.createdAt) doc.createdAt = doc.createdAt.toString()
    if (doc.updatedAt) doc.updatedAt = doc.updatedAt.toString()
  }
  return doc
}

export { connect, disconnect, convertDocToObj }
