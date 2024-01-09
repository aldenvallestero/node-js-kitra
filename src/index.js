const app = require('./configs/app-config');

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port`, PORT));
