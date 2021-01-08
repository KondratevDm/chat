import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: [String],
      default: ['user']
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)

  return next()
})

export default mongoose.model('users', userSchema)
