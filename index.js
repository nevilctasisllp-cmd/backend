const fs = require("fs");
const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");

const demoPromise = new Promise((res, rej) => {
  let success = true;

  if (success) res("Work done!");
  else rej("Something went wrong");
});

demoPromise.then((msg) => console.log(msg)).catch((err) => console.log(err));

function greet(name, callback) {
  console.log("Hello", name);
  callback();
}

greet("Dhruvil", () => {
  console.log("Welcome!");
});

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data Received");
    }, 3000);
  });
}

async function showData() {
  console.log("Fetching...");
  const result = await getData();
  console.log(result);
}

showData();

fs.readFile("demo.txt", "utf8", (err, data) => {
  if (err) return console.log("Error:", err);
  console.log("File Data:", data);
});

console.log("Reading file...");

let myPromise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("WORK DONE");
  } else {
    reject("SOMETHING WENTS WRONG ");
  }
});

myPromise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function process() {
  console.log("Step 1");
  await wait(3000); // 3 sec delay
  console.log("Step 2");
  await wait(4000); // 4 sec delay
  console.log("Step 3");
}

process();

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
