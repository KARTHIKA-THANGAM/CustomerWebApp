import express from "express";
const router = express.Router();

// Get all addresses
router.get("/", (req, res) => {
  req.db.all("SELECT * FROM addresses", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get addresses by customerId
router.get("/customer/:customerId", (req, res) => {
  req.db.all("SELECT * FROM addresses WHERE customerId = ?", [req.params.customerId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new address
router.post("/", (req, res) => {
  const { customerId, address, city, state, pin } = req.body;
  req.db.run(
    `INSERT INTO addresses (customerId, address, city, state, pin)
     VALUES (?, ?, ?, ?, ?)`,
    [customerId, address, city, state, pin],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Update address
router.put("/:id", (req, res) => {
  const { address, city, state, pin } = req.body;
  req.db.run(
    `UPDATE addresses SET address=?, city=?, state=?, pin=? WHERE id=?`,
    [address, city, state, pin, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Address not found" });
      res.json({ updated: true });
    }
  );
});

// Delete address
router.delete("/:id", (req, res) => {
  req.db.run("DELETE FROM addresses WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Address not found" });
    res.json({ deleted: true });
  });
});

export default router;
