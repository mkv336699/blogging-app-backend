const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('node:crypto');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: '/images/avatar.png'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    console.log("this", this)
    if (!this.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(this.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    console.log("this", this)
    next();
});

userSchema.static('matchPassword', async function(email, password) {
    const result = await this.findOne({ email });
    if (!result) return null;
    console.log("here", email, password)
    const hashedPassword = createHmac('sha256', result.salt).update(password).digest('hex');
    if (result.password === hashedPassword) return result._doc; 
    return null;
});

const User = model('user', userSchema);

module.exports = User;