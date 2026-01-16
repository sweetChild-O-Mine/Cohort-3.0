const express = require('express');
const app = express();

// --- 1. Middleware (The Fixer) ---
const typoFixer = (req, res, next) => {
    console.log("🔴 STEP 1: Middleware me request aayi.");
    console.log("   -> Aate waqt Name tha:", req.query.name);

    if (req.query.name) {
        req.fixedName = req.query.name.toLowerCase() // Mutation
    }

    console.log("   -> Jaate waqt Name hai:", req.query.name);
    console.log("🟢 STEP 2: Middleware ka kaam khatam. Next() calling...");
    next();
};

// --- 2. Apply Middleware ---
app.use(typoFixer);

// --- 3. Route (The End Destination) ---
app.get('/', (req, res) => {
    console.log("🏁 STEP 3: Route ke andar request pahunchi.");
    console.log("   -> Route ko Name mila:", req.query.name);

    const name = req.fixedName;
    res.send(`${name} nice name man!!!`);
});

app.listen(3000, () => {
    console.log("🚀 Server Started on 3000. Waiting for request...");
});