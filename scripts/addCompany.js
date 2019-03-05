require('babel-register');
const fs = require('fs');
const csv = require('csv-parser');
const { executeQuery } = require('../src/server/querySql');

const results = [];

const isInvalid = person => {
  return (
    !person.firstName ||
    !person.lastName ||
    !person.card ||
    person.firstName.length === 0 ||
    person.lastName.length === 0 ||
    person.card.length === 0
  );
};
let counter = 0;
fs.createReadStream(__dirname + '/PersonerIFirma.csv')
  .pipe(csv(['name', 'company']))
  .on('data', data => results.push(data))
  .on('end', async () => {
    const userWithCompany = results.map(person => ({ ...person }));
    const result = await executeQuery({ text: 'SELECT * FROM persons' });
    const companiesFromDb = await executeQuery({
      text: 'SELECT * FROM companies',
    });

    result.map(async user => {
      const wholeName = `${user.first_name} ${user.last_name}`;
      const foundUser = userWithCompany.find(u => u.name === wholeName);
      const foundCompany = foundUser
        ? companiesFromDb.find(comp => comp.name === foundUser.company)
        : undefined;
      if (!user.company_id && foundUser && foundCompany) {
        console.log(
          `Updated ${foundUser.name} with company ${foundUser.company}`,
        );
        counter += 1;
        const insertQuery = {
          text: 'UPDATE persons SET company_id = $1 WHERE ID = $2',
          values: [foundCompany.id, user.id],
        };
        console.log(insertQuery);
        executeQuery(insertQuery);
      }
    });
    console.log(`Converted ${counter} persons`);
  });
