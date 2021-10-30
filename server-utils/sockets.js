const users = [];

const addUser = (userId, socketId) => {
    const user = users.find(user => user.userId === userId)

    if (user && user.socketId === socketId) {
        return users;
    } else {
        if (user && user.socketId !== socketId) removeUser(user.socketId)

        const newUser = { userId, socketId }
        user.push(newUser)
        return users
    }
}