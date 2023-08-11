const { configure } = require('./config.js');
const aws = require('aws-sdk');
const exp = require('express');
const cors = require('cors');
const app = exp();
app.use(cors());
app.use(exp.json());
configure();

const dynamoDBClient = new aws.DynamoDB.DocumentClient();


//Table creation in Dynamodb Database

/*const dynamodb=new aws.DynamoDB();
const params = {
    TableName: 'Personal-Info',
    KeySchema: [
      { AttributeName: 'mail', KeyType: 'HASH' }, // Replace 'primaryKey' with your primary key attribute
    ],
    AttributeDefinitions: [
      { AttributeName: 'mail', AttributeType: 'S' }, // Replace 'primaryKey' and 'S' with the appropriate attribute type
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


//insert person detail using put method in docclient
app.post('/insertdetail',(req,res) => {
    const details = {
        name: req.body.name,
        mail: req.body.mail,
        gender: req.body.gender,
        age: req.body.age,
        phone: req.body.phone,
        collegename: req.body.collegename,
        yearofstudy: req.body.yearofstudy,
        city: req.body.city,
        state: req.body.state,
        availhours: req.body.availhours,
        major: req.body.major,
    };

    const params = {
      TableName: "Personal-Info",
      Item: details
    }

    dynamoDBClient.put(params,(err)=>{
      if(err){
        res.send("Error occured when inserting");
  }
else {
  res.send("Successfully inserted person data");
  
}})
 
      
});



//scan database using scan method in docclient
app.get('/scantable',(req,res) => {
  const scanparams = {
      TableName: "Personal-Info",
  }

  dynamoDBClient.scan(scanparams,(err,data)=>{
      if(data){
      res.send(data.Items);
      console.log("Data's when reading:",data.Items);
  }
else {
  res.send(err);
  console.log("Error occurred when reading data:",err.message);
}})
 
})


//delete particular person by using delete method in docclient
app.delete('/deleteperson',(req,res) => {
  const mail = req.body.mail;
  const params = {
    TableName: "Personal-Info",
    Key: {
      mail: mail, // id is the Partition Key, '123' is the value of it
    },
  }
  dynamoDBClient
  .delete(params,(err) => {
    if(err) {
      res.send(err)
    }
    else {
      res.send("Successfully deleted the person")
    }
  })
})


//update data of person detail
app.put('/updateperson',(req,res) => {
  const details = {
      name: req.body.name,
      mail: req.body.mail,
      gender: req.body.gender,
      age: req.body.age,
      phone: req.body.phone,
      collegename: req.body.collegename,
      yearofstudy: req.body.yearofstudy,
      city: req.body.city,
      state: req.body.state,
      availhours: req.body.availhours,
      major: req.body.major,
  };

  const params = {
    TableName: "Personal-Info",
    Item: details
  }

  dynamoDBClient.put(params,(err)=>{
    if(err){
      res.send("Error occured when updating");
}
else {
res.send("Successfully updated person data");

}})

    
});

app.listen(8080,()=> {console.log("Running on 8080")});
