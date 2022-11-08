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
  	name: {
      type: String,
      required: [true, "Please check your data entry, name is missing!"]
    },
  	rating: {
      type: Number,
      min: 1,
      max: 10
    },
  	review: String
  })

  //create a MODEL
  const Fruit = new mongoose.model ("Fruit", fruitSchema)

  // //create a DOCUMENT
  // const fruit = new Fruit ({
  //   name: "Pineapple",
  // 	rating: 2,
  // 	review: "Disgusting"
  // })

  //save the document
  // fruit.save()

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
  // person.save();

  // inser many documents at once
  // const kiwi = new Fruit ({
  //   name: "Kiwi",
  //   rating: 7,
  //   review: "bof ça donne des aphtes"
  // })
  //
  // const mango = new Fruit ({
  //   name: "Mango",
  //   rating: 10,
  //   review: "Tastes like heaven"
  // })
  //
  // const pear = new Fruit ({
  //   name: "Pear",
  //   rating: 7,
  //   review: "good friend"
  // })

  // commented to not add those fruits each time the app is launched
  // Fruit.insertMany([kiwi, mango, pear], function(err){
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Successfully saved all the fruits to fruitsDB");
  //   }
  // });


  // read data with mongoose
  Fruit.find(function(err, fruits){
    if (err){
      console.log(err);
    } else {
      mongoose.connection.close();
      fruits.forEach(function(fruit){
        console.log(fruit["name"]);
      });
    };
  });

  // update data with mongoose
  Fruit.updateOne({rating: 111}, {raating: 99}, function(err, result){
    if (err){
      console.log(err);
    } else {
      console.log("update ok");
      console.log(result);
    }
  })

  // woeking, see https://mongoosejs.com/docs/async-await.html#:~:text=Async%2Fawait%20lets%20us%20write,scenario%20when%20working%20with%20Mongoose.
  // Fruit.findOne({rating: 56}, function(err, doc) {
  //   if(err) {
  //     console.log(err);
  //     handleError(err);
  //   }
  //
  //   doc.rating = 1;
  //
  //   doc.save(function(err, updatedDoc) {
  //     if(err) {
  //       // handleError(err);
  //       console.log(err);
  //     }
  //
  //     // Final logic is 2 callbacks deep
  //     console.log(updatedDoc);
  //     console.log("update ok")
  //   });
  // })





  // // delete data with mongoose
  // Fruit.deleteOne(
  //   {name: "Pineapple"},
  //   function(err, result){
  //     if (err) {
  //       console.log(err);
  //       handleError(err);
  //     } else {
  //       console.log(result);
  //       console.log("Successfully deleted!");
  //     }
  //   }
  // );

  Person.deleteMany({name: "John"}, function(err, result){
    if (err){
      console.log(err);
    } else {
      console.log("Successfully deleted all the document");
    }
  })

}
