import { db } from "../DB/db.js";

class UserService 
{

    async getUserByName(username) 
    {
        const [rows] = await db.execute(
            "SELECT * FROM user WHERE name = ?",
            [username]
        );
        return rows[0] || null;
    }

    async createUser(name, password, type) 
    {
        await db.execute(
            "INSERT INTO user (name, password, type) VALUES (?, ?, ?)",
            [name, password, type]
        );
    }

    async updatePasswordUser(name, password) 
    {
        await db.execute(
            "UPDATE user SET password = ? WHERE name = ?",
            [password, name]
        );
    }

    async updateTypedUser(name, type) 
    {
        await db.execute(
            "UPDATE user SET type = ? WHERE name = ?",
            [type, name]
        );
    }

    async deleteUser(username) 
    {
        await db.execute("DELETE FROM user WHERE id = ?", [username]);
    }

    async getAllUsers() 
    {
        const [rows] = await db.execute("SELECT * FROM user");
        return rows;
    }

    async incrementFailedLoginCounterUser(name, failedLoginCounter)
    {
        await db.execute(
            "UPDATE user SET failedLoginCounter = ? WHERE name = ?",
            [failedLoginCounter, name]
        );
    }

    async resetFailedloginCounterUser(name)
    {
        await db.execute(
            "UPDATE user SET isLocked = ? WHERE name = ?",
            [true, name]
        );
    }
}

export { UserService };