const fs = require('fs'); 
const csv = require('csv-parser');

const results = [];

const isInvalid = (person) => {
    return !person.firstName || !person.lastName || !person.card || (person.firstName.length === 0) || (person.lastName.length === 0) || (person.card.length === 0);
}

fs.createReadStream(__dirname + '/knowitliste.csv')
.pipe(csv(['lastName', 'firstName', 'card']))
.on('data', data => results.push(data))
.on('end', () => {
    const sqlValues = results.map(person => {
        const newObj = {...person};
        return newObj;
    }).filter(person => !isInvalid(person)).map(person => {
        return `('${person.lastName}', '${person.firstName}', '${person.card}')`
    }).join(',');
    const SQL = `INSERT INTO persons (last_name, first_name, card_id) VALUES ${sqlValues}`;
    console.log(SQL)
});  