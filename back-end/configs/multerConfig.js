const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensuring the uploads folders exists:
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  fs.chmodSync(uploadsDir, 0o777); // Grant full permissions: read, write, and execute
}

const uploadsProcessedDir = path.join(__dirname, "../uploads_processed");
if (!fs.existsSync(uploadsProcessedDir)) {
  fs.mkdirSync(uploadsProcessedDir);
  fs.chmodSync(uploadsProcessedDir, 0o777); // Grant full permissions: read, write, and execute
}

// Storage options for multer:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Instead of: null, "uploads/" i.e i'm using absolute path for consistency
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with timestamp
  },
});

// File filter to ensure only CSVs are uploaded
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "text/csv" ||
    file.originalname.split(".").pop() === "csv"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please upload a valid CSV file"), false);
  }
};

// Initialize Multer with the storage options:
const upload = multer({ storage: storage });

module.exports = upload;
