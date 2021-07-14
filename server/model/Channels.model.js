import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    unique: true
  },
  channelDescription: {
    type: String,
    required: true,
    unique: true
  },
  channelMessages: {
    type: [Object]
  }
})

export default mongoose.model('channels', channelSchema)
