
import { Client } from 'pg';

const connectionString = 'postgresql://sharingiscaringuser:ShareAndCareWithPeters2019!!@rome.c7eijnq1j6fs.eu-central-1.rds.amazonaws.com:3132/sharingiscaringdb'


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