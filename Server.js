
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://Dhvl1209:Dhvl1209@dhaval1209.hp1n5.mongodb.net/', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Connected to MongoDB')
});


app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
