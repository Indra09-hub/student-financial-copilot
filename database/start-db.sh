#!/bin/bash
# ==============================================================================
# Student Financial Copilot - Database Management Script
# Starts a local MySQL 8.x/9.x instance on port 3307 in project isolation.
# ==============================================================================

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_DIR="$PROJECT_ROOT/database/data"
MYSQL_BIN="/usr/local/mysql/bin"
PORT=3307
SOCKET="$DATA_DIR/mysql.sock"
PID_FILE="$DATA_DIR/mysql.pid"

# 1. Initialize data directory if not already created
if [ ! -d "$DATA_DIR/mysql" ]; then
  echo "Initializing local MySQL data directory at: $DATA_DIR"
  mkdir -p "$DATA_DIR"
  "$MYSQL_BIN/mysqld" --no-defaults \
    --initialize-insecure \
    --basedir=/usr/local/mysql \
    --datadir="$DATA_DIR" \
    --lower-case-table-names=2
  echo "MySQL data directory initialized successfully with empty root password."
fi

# 2. Check if already running on port 3307
if nc -z 127.0.0.1 $PORT 2>/dev/null; then
  echo "MySQL is already running and listening on 127.0.0.1:$PORT"
  exit 0
fi

# 3. Start mysqld daemon in the background
echo "Starting MySQL daemon on port $PORT..."
(cd "$DATA_DIR" && "$MYSQL_BIN/mysqld" --no-defaults \
  --basedir=/usr/local/mysql \
  --datadir="$DATA_DIR" \
  --port=$PORT \
  --socket="$SOCKET" \
  --pid-file="$PID_FILE" > "$DATA_DIR/mysql.log" 2>&1 &)

# 4. Wait for MySQL to become ready
echo "Waiting for MySQL to accept connections..."
for i in {1..30}; do
  if mysql -h 127.0.0.1 -P $PORT -u root -e "SELECT 1;" >/dev/null 2>&1; then
    echo "MySQL 9.6.0 is ready on 127.0.0.1:$PORT"
    exit 0
  fi
  sleep 0.5
done

echo "Error: MySQL failed to start within 15 seconds. Check $DATA_DIR/mysql.log for details."
exit 1
