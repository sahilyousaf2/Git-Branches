const users = new Map();
const sessions = new Map();

function register(username, password) {
    if (users.has(username)) {
        return { success: false, message: "Username already exists" };
    }
    users.set(username, password);
    return { success: true, message: "Registration successful" };
}

function login(username, password) {
    if (!users.has(username)) {
        return { success: false, message: "User not found" };
    }
    if (users.get(username) !== password) {
        return { success: false, message: "Incorrect password" };
    }
    const sessionId = Math.random().toString(36).substring(2);
    sessions.set(sessionId, username);
    return { success: true, message: "Login successful", sessionId };
}

function logout(sessionId) {
    if (sessions.has(sessionId)) {
        sessions.delete(sessionId);
        return { success: true, message: "Logged out" };
    }
    return { success: false, message: "Invalid session" };
}

function isAuthenticated(sessionId) {
    return sessions.has(sessionId);
}

// Example usage
console.log(register("john", "password123"));
console.log(login("john", "password123"));
console.log(login("john", "wrongpass"));
console.log(login("john", "password123"));