const { MongoClient } = require('mongodb');

async function fetchCategories() {
  const uri = 'mongodb://localhost:3000'; // Change this to your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('ICCT-Store');
    const categories = await database.collection('Category').find({}).limit(100).toArray();
    
    console.log(categories);
  } finally {
    await client.close();
  }
}

fetchCategories();
