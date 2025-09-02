import express from "express";
const router = express.Router();

// Get all customers
router.get("/", (req, res) => {
  req.db.all("SELECT * FROM customers", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get customer by ID
router.get("/:id", (req, res) => {
  req.db.get("SELECT * FROM customers WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Customer not found" });
    res.json(row);
  });
});

// Add new customer
router.post("/", (req, res) => {
  const { firstName, lastName, phone, address, city, state, pin } = req.body;
  req.db.run(
    `INSERT INTO customers (firstName, lastName, phone, address, city, state, pin)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, phone, address, city, state, pin],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Update customer
router.put("/:id", (req, res) => {
  const { firstName, lastName, phone, address, city, state, pin } = req.body;
  req.db.run(
    `UPDATE customers SET firstName=?, lastName=?, phone=?, address=?, city=?, state=?, pin=? WHERE id=?`,
    [firstName, lastName, phone, address, city, state, pin, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Customer not found" });
      res.json({ updated: true });
    }
  );
});

// Delete customer
router.delete("/:id", (req, res) => {
  req.db.run("DELETE FROM customers WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Customer not found" });
    res.json({ deleted: true });
  });
});

export default router;
