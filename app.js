const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors()); // Prevents CORS error

// Initialize lastViewTime and viewLimitDuration
let lastViewTime = 0;
const viewLimitDuration = 10; // 10 seconds

app.get('/api', function(req, res) {
    const now = Date.now();

    // Read the current counts from count.json
    const json = fs.readFileSync('count.json', 'utf-8');
    const obj = JSON.parse(json);

    // Check if the last view was within the limit duration
    if (now - lastViewTime < viewLimitDuration) {
        // If the last view was within the limit duration, do not increment views
        return res.json({ pageviews: obj.pageviews, visits: obj.visits });
    }

    lastViewTime = now; // Update last view time
    obj.pageviews += 1; // Increment pageviews

    // Increment visits if the query type is 'visit-pageview'
    if (req.query.type === 'visit-pageview') {
        obj.visits += 1;
    }

    // Write updated counts to file and send response
    fs.writeFileSync('count.json', JSON.stringify(obj));
    res.json(obj);
});

app.listen(3002, () => {
    console.log("Server running on port 3002");
});
