//requiring mongodb package
const mongoose = require("mongoose");

// Call async main function declared below and catch any errors.
main().catch(err => console.log(err));


// Go read this for a better understanding of async and await:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');
  console.log("Connected");

  //create a SCHEMA that sets out the fields each document will have and their datatypes
  const fruitSchema = new mongoose.Schema ({
  	name: String,
  	rating: Number,
  	review: String
  })

  //create a MODEL
  const Fruit = new mongoose.model ("Fruit", fruitSchema)

  //create a DOCUMENT
  const fruit = new Fruit ({
  	name: "Apple",
  	rating: 7,
  	review: "Great!"
  })

  //save the document
  fruit.save()

  //**CHALLENGE: Set up a people database with one document and two fields**//
  //create a SCHEMA
  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });

  //create a MODEL
  const Person = mongoose.model('Person', personSchema);

  //create a DOCUMENT
  const person = new Person({
    name: "John",
    age: 37
  });

  //Save it
  person.save();

  // ----- 3rd cmd (to check whether the data is in mongosh) -----
  // (1)mongosh
  // (2)show dbs
  // (3)use <databseName>
  // (4)show collections
  // (5)db.<collectionName>.find()

  // inser many documents at once
  const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 7,
    review: "bof ça donne des aphtes"
  })

  const mango = new Fruit ({
    name: "Mango",
    rating: 10,
    review: "Tastes like heaven"
  })

  const pear = new Fruit ({
    name: "Pear",
    rating: 7,
    review: "good friend"
  })

  Fruit.insertMany([kiwi, mango, pear], function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved all the fruits to fruitsDB");
    }
  });
}
