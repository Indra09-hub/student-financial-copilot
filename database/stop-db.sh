#!/bin/bash
# ==============================================================================
# Student Financial Copilot - Database Shutdown Script
# ==============================================================================

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_DIR="$PROJECT_ROOT/database/data"
PID_FILE="$DATA_DIR/mysql.pid"

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if ps -p "$PID" > /dev/null 2>&1; then
    echo "Stopping MySQL daemon (PID: $PID)..."
    kill -TERM "$PID"
    while ps -p "$PID" > /dev/null 2>&1; do
      sleep 0.5
    done
    echo "MySQL daemon stopped cleanly."
    exit 0
  fi
fi

# Fallback: check if listening on 3307 and kill by port
PID=$(lsof -ti :3307 2>/dev/null || true)
if [ -n "$PID" ]; then
  echo "Terminating process on port 3307 (PID: $PID)..."
  kill -TERM $PID 2>/dev/null || kill -9 $PID 2>/dev/null
  echo "Stopped."
else
  echo "No MySQL instance detected running on port 3307."
fi
