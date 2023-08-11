const aws =require('aws-sdk');


var configure =()=>{ aws.config.update ({
    region: 'af-south-1',
    endpoint:'http://localhost:8000'
});
};

module.exports = {
  configure
};

/*const params = {
    TableName: 'Personal-Info',
    KeySchema: [
      { AttributeName: 'E-mail', KeyType: 'HASH' }, // Replace 'primaryKey' with your primary key attribute
    ],
    AttributeDefinitions: [
      { AttributeName: 'E-mail', AttributeType: 'S' }, // Replace 'primaryKey' and 'S' with the appropriate attribute type
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5, // Adjust as needed
      WriteCapacityUnits: 5, // Adjust as needed
    },
  };
  
  // Create the table
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully:', data);
    }
  });*/
  