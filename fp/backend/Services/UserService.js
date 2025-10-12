import { db } from "../DB/db.js";


export async function getUserByName(username) 
{
    const [rows] = await db.execute(
        "SELECT * FROM user WHERE name = ?",
        [username]
    );
    return rows[0] || null;
}

export async function createUserDB(name, password, type) 
{
    await db.execute(
        "INSERT INTO user (name, password, type) VALUES (?, ?, ?)",
        [name, password, type]
    );
}

export async function updatePasswordUser(name, password) 
{
    await db.execute(
        "UPDATE user SET password = ? WHERE name = ?",
        [password, name]
    );
}

export async function updateTypeUser(name, type) 
{
    await db.execute(
        "UPDATE user SET type = ? WHERE name = ?",
        [type, name]
    );
}

export async function updateUser(name, password, type) 
{
    await db.execute(
        "UPDATE user SET password, type = ? WHERE name = ?",
        [password, type, name]
    );
}

export async function deleteUserDB(username) 
{
    await db.execute("DELETE FROM user WHERE id = ?", [username]);
}

export async function getAllUsers() 
{
    const [rows] = await db.execute("SELECT * FROM user");
    return rows;
}

export async function incrementFailedLoginCounterUser(name, failedLoginCounter)
{
    await db.execute(
        "UPDATE user SET failedLoginCounter = ? WHERE name = ?",
        [failedLoginCounter, name]
    );
}

export async function resetFailedloginCounterUser(name)
{
    await db.execute(
        "UPDATE user SET isLocked = ?, failedLoginCounter = ? WHERE name = ?",
        [false, 0, name]
    );
}