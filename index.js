const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [
    {
        title: "Maximum Number",
        description: "Given an array , return the maximum of the array?",
        testCases: [
            {
                input: "[1,2,3,4,5]",
                output: "5"
            },
            {
                input: "[10,20,30,40,50]",
                output: "50"
            }
        ]
    },
    {
        title: "Minimum Number",
        description: "Given an array , return the minimum of the array?",
        testCases: [
            {
                input: "[1,2,3,4,5]",
                output: "1"
            },
            {
                input: "[10,20,30,40,50]",
                output: "10"
            }
        ]
    },
];


const SUBMISSION = [

]

// Middleware to parse the request body
app.use(express.json());

app.get('/', function (req, res) {
    res.send("Hello, Welcome to the LeetCode Clone")
})

app.post('/signup', function (req, res) {
    // Add logic to decode body
    const { email, password } = req.body;

    //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesn't exist)

    const userExists = USERS.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = { email, password };
    USERS.push(newUser);

    // return back 200 status code to the client
    res.status(200).json({ message: 'Signup successful' });
})

app.post('/login', function (req, res) {
    // Decode the request body
    const { email, password } = req.body;

    // Find the user with the given email in the USERS array
    const user = USERS.find(user => user.email === email);

    // Check if the user exists and the password matches
    if (user && user.password === password) {
        // Generate a random token (for demonstration purposes only)
        const token = Math.random().toString(36).substring(7);

        // Return a success response with the token
        res.status(200).json({ message: 'Login successful', token });
    } else {
        // Return an unauthorized response
        res.status(401).json({ error: 'Invalid email or password' });
    }
})

app.get('/questions', function (req, res) {

    //return the user all the questions in the QUESTIONS array
    res.send("Hello World from route 3!")
})

app.get("/submissions", function (req, res) {
    // return the users submissions for this problem
    res.send("Hello World from route 4!")
});


app.post("/submissions", function (req, res) {
    // let the user submit a problem, randomly accept or reject the solution
    // Store the submission in the SUBMISSION array above
    res.send("Hello World from route 4!")
});

app.get('/users', function (req, res) {
    res.status(200).json(USERS);
});


// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})