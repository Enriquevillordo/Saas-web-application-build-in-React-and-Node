const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('helpers/db');

module.exports = {
    authenticate,
    create};

async function authenticate({ username, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { email: username } });
    
    if (user !== null && (await bcrypt.compare(password, user.hash)) == true) {
        // authentication successful
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return { ...omitHash(user.get()), token };
    } else {
        return {
            success: false,
        }
    }
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    const duplicatedUser = await db.User.findOne({ where: { email: params.email } });
    if (duplicatedUser != null && Object.keys(duplicatedUser).length > 0) {
        return {
            success: false,
            reason: "duplicatedEmail",
            message: 'User Email "' + params.email + '" is already taken'
        }
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    const newUser = await db.User.create(params);
    if(newUser) {
        return {
            success: true,
            message: "Registration successful!",
            user: newUser
        }
    } else {
        return {
            success: false,
            reason: "Unknown",
            message: "Sorry, operation failed!"
        }
    }
}


// async function getUser(id) {
//     const user = await db.User.findByPk(id);
//     if (!user) throw 'User not found';
//     return user;
// }

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}