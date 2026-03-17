const pool = require("../database")

async function run() {
    const existing = await pool.query("SELECT COUNT(*)::int AS count FROM public.classification")

    if (existing.rows[0].count === 0) {
        await pool.query(
            "INSERT INTO public.classification (classification_id, classification_name) VALUES (1,'Custom'),(2,'Sport'),(3,'Sedan'),(4,'SUV'),(5,'Newcar')"
        )
        await pool.query(
            "SELECT setval(pg_get_serial_sequence('public.classification','classification_id'), (SELECT MAX(classification_id) FROM public.classification))"
        )
        console.log("Seeded classifications")
    } else {
        console.log("Classifications already exist, no changes made")
    }

    const rows = await pool.query(
        "SELECT classification_id, classification_name FROM public.classification ORDER BY classification_id"
    )
    console.log(rows.rows)
}

run()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
