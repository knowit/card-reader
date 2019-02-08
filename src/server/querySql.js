
import { Client } from 'pg';


client.connect();

export const executeQuery = async (q) => {
    console.log(q)
    try {
        const result = await client.query(q.text, q.values);
        console.log("res", result)
        return result.rows;
    } catch(err) {
        console.error(err.stack)
    }
    console.log("wtf")
}