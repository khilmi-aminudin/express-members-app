const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const members = require('./Members')

// const logger = require('./middleware/logger')

const app = express()

// Init Miiddleware
// app.use(logger)

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout : 'main' }));
app.set('view engine', 'handlebars');

// Homepage Route
app.get('/', (req, res) => {
    res.render('index',{ 
        title : "Members" ,
        members
    })
})

// Body-Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

// make static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members Api Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})