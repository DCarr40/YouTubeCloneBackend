const Express = require('express');
const App = Express();
const cors = require('cors');


App.use(express.json());
App.use(cors());

const port = process.env.PORT|| 5000;
App.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

