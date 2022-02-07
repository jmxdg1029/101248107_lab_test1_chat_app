const express =  require('express')
const mongoose = require('mongoose');
const restRouter = require('./routes/RestaurantRoutes.js');

const app = express();
app.use('/',express.json());

mongoose.connect('mongodb+srv://jmxdg1029:jmAug2901@cluster0.1iuws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(restRouter);

app.listen(8082, () => { console.log('Server is running...')});
