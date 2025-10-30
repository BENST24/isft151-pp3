import { db } from "../DB/db.js";


export async function getActivityByName(activityName) 
{
    const [rows] = await db.execute(
        "SELECT * FROM activity WHERE name = ?",
        [activityName]
    );
    return rows[0] || null;
}

export async function getActivityById(activityId) 
{
    const [rows] = await db.execute(
        "SELECT * FROM activity WHERE id = ?",
        [activityId]
    );
    return rows[0] || null;
}

export async function createActivityDB(name, duration) 
{
    await db.execute(
        "INSERT INTO activity (name, duration) VALUES (?, ?)",
        [name, duration]
    );
}

export async function updateActivity(id, name, duration) 
{
    await db.execute(
        "UPDATE activity SET name = ?, duration = ? WHERE id = ?",
        [name, duration, id]
    );
}

export async function deleteActivityDB(id) 
{
    await db.execute(
        "DELETE FROM activity WHERE id = ?",
        [id]
    );
}

export async function getAllActivities() 
{
    const [rows] = await db.execute("SELECT * FROM activity");
    return rows;
}
