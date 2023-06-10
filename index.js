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
    // Decode the request body
    const { email, password, role } = req.body;

    // Check if the email already exists in the USERS array
    const userExists = USERS.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user object with role
    const newUser = { email, password, role };

    // Store the new user in the USERS array
    USERS.push(newUser);

    // Return a success response
    res.status(200).json({ message: 'Signup successful' });
});

app.post('/login', function (req, res) {
    // Decode the request body
    const { email, password } = req.body;

    // Find the user with the given email in the USERS array
    const user = USERS.find(user => user.email === email);

    // Check if the user exists and the password matches
    if (user && user.password === password) {
        // Return a success response with the user role
        res.status(200).json({ message: 'Login successful', role: user.role });
    } else {
        // Return an unauthorized response
        res.status(401).json({ error: 'Invalid email or password' });
    }
});


app.get('/questions', function (req, res) {
    //return the user all the questions in the QUESTIONS array
    res.status(200).json(QUESTIONS);
})

// Add new problem route (only accessible to admins)
app.post('/questions', function (req, res) {
    // Decode the request body
    const { title, description, testCases } = req.body;

    // Check if the user is an admin
    // if (req.user.role !== 'admin') {
    //     return res.status(403).json({ error: 'Only admins can add new problems' });
    // }

    // Create a new problem object
    const newProblem = { title, description, testCases };

    // Store the new problem in the PROBLEMS array
    QUESTIONS.push(newProblem);

    // Return a success response
    res.status(200).json({ message: 'New problem added successfully' });
});

app.get("/submissions", function (req, res) {
    // return the users submissions for this problem
    res.status(200).json(SUBMISSION);
});

app.post("/submissions", function (req, res) {
    // Decode the request body
    const { userId, questionId, code } = req.body;

    // Generate a random boolean value to determine acceptance or rejection
    const isAccepted = Math.random() < 0.5; // Adjust the probability as needed

    // Create a new submission object
    const submission = {
        userId,
        questionId,
        code,
        status: isAccepted ? 'accepted' : 'rejected'
    };

    // Store the submission in the SUBMISSIONS array
    SUBMISSION.push(submission);

    // Return a success response
    res.status(200).json({ message: 'Submission successful' });
    res.send("Hello World from route 4!")
});

app.get('/users', function (req, res) {
    res.status(200).json(USERS);
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})