const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/check-links', async (req, res) => {
    const links = req.body.links;

    const results = await Promise.all(
        links.map(async (link) => {
            try {
                const response = await axios.head(link);
                if (response.status >= 200 && response.status < 300) {
                    return { link, status: 'Not Blocked' };
                } else {
                    return { link, status: 'Blocked' };
                }
            } catch (error) {
                return { link, status: 'Blocked' };
            }
        })
    );

    res.json(results);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
