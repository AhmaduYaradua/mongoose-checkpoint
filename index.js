import mongoose from "mongoose";

import express from "express";
const app = express();
const PORT = 3000;

import "dotenv/config";

// defining the schema type
const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    favoriteFoods: {
      type: [String],
    },
  },
  { timestamps: true }
);

// creating the collectioon
const People = mongoose.model("People", personSchema);

//  a function to create a single person instance
async function createPerson() {
  const createdPerson = await People.create({
    name: "Dwayne Johnson",
    age: 60,
    favoriteFoods: ["Burritos", "Doya"],
  });
  console.log(createdPerson);
}

// function to create multiple person instances
async function createPersonsDoc() {
  const arrayOfPeople = await People.create([
    { name: "Mary Jane", age: 20, favoriteFoods: ["Eba", "Burritos"] },
    { name: "Guy Kaita", age: 40, favoriteFoods: ["Shinkafa", "Yam"] },
    { name: "Mary Blake", age: 19, favoriteFoods: ["Eba", "Bread"] },
    { name: "Fatima Suka", age: 80, favoriteFoods: ["Burritos", "Beans","Doritos"] },
    { name: "Trump Musk", age: 67, favoriteFoods: ["Eba", "Bread"] },
  ]);
  console.log(arrayOfPeople);
}

// a function to find person by name
async function findPersonByName() {
  const foundPerson = await People.find({ name: "Ahmad Abu Aminu" });
  console.log(foundPerson);
}

// function to find person by favorite food using findOne method
async function findPersonByFood() {
  const byFoodType = await People.findOne({ favoriteFoods: "Shinkafa" });
  console.log(byFoodType);
}

// function to find person by id
async function findPersonbyId() {
  const personById = await People.findById("6734d389c2c8bbc6fe19fd49");
  console.log(personById);
}

async function findAndPush() {
    const person = await People.findById("6734d389c2c8bbc6fe19fd49");

    if (!person) {
      console.log("Person not found");
      return;
    }

    person.favoriteFoods.push("Hamburger");

    const updatedPerson = await person.save();
    console.log("Updated person:", updatedPerson);
   
}


// function to update a person doc.
async function updatePerson() {
  let editedPerson = await People.findOneAndUpdate(
    { name: "Fatima Suka" },
    { age: 20 },
    { new: true }
  );
  console.log(editedPerson);
}

// function to find person by id and remove
async function removeById() {
  const deletedPerson = await People.findByIdAndDelete(
    "6734cd96d285580c513f7d57"
  );
  console.log(deletedPerson);
}

// function to find person by name and remove
async function deletePersonByName() {
  const deletedPerson = await People.deleteMany({ name: { $regex: "Mary" } });
  console.log(deletedPerson);
}

// chain search using queary helpers
async function queryAPersonDoc(){
    let pipeline = [{$match:{favoriteFoods:"Burritos"}},{$sort:{name:1}},{$project:{age:0,}}]
    const queriedPerson = await People.aggregate(pipeline).limit(2)
    console.log(queriedPerson);
    
    
}

// function to connect to databse
async function conncectToDataBase() {
  try {
    await mongoose.connect(process.env.mongooseConnect);
    console.log("Database connection successful");
    console.log("Server running on port 3000");
    // await createPerson()
    // await createPersonsDoc()
    // await findPersonByName()
    // await findPersonByFood()
    // await findPersonbyId()
    // await updatePerson()
    // await removeById()
    // await deletePersonByName();
    // await queryAPersonDoc()
    await findAndPush()
  } catch (error) {
    console.log(error);
  }
}

// function to start server
app.listen(PORT, () => {
  conncectToDataBase();
});
