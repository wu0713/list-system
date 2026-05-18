CREATE TABLE reconnaissance_db.target_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_title VARCHAR(50) NOT NULL,
    target_type VARCHAR(50),
    military VARCHAR(50),
    nationality VARCHAR(50),
    target_number INT DEFAULT 1,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    heading INT,
    speed INT,
    altitude INT,
    status VARCHAR(50),
    conf_coord VARCHAR(5), -- 🎯 完美的字串盒子
    reliability VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;