const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      sparse: true, 
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      minlength: 8,
      validate: {
        validator: function (value) {
          
          if (!this.googleId && !value) {
            return false;
          }
          return true;
        },
        message: "Password is required for non-Google users",
      },
    },

    role: {
      type: String,
      enum: ['Warehouse Manager', 'Delivery Staff', 'Admin', 'User'],
      required: true,
    }
  },
  { timestamps: true }
);

authSchema.index({ email: 1, role: 1 }, { unique: true });


authSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


authSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};


authSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'this_is_secret',
    { expiresIn: '1h' }
  );
};

const Auth = mongoose.model('Authentication', authSchema);
module.exports = Auth;
