const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  // get takes 2 arguments (path, callback function)
  res.send("Hello  World!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given Id does not exist");
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // looking through
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given Id does not exist");

  // validating
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  courses.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req,res) => {
const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given Id does not exist");

    const index = courses.indexOf(course)
    course.splice(index,1)
    res.send(course)
})

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}....`));
