#!/bin/bash

# Debug Script untuk testing Start Activity Flow

echo "🔍 Testing OrtuPintar Start Activity Flow"
echo "=========================================="

# Check if backend is running
echo "1. Checking backend server..."
curl -s http://localhost:5000 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Backend server is running"
else
    echo "❌ Backend server is not running. Please start with: cd backend && npm run dev"
    exit 1
fi

# Check database tables
echo ""
echo "2. Checking database tables..."
mysql -u root -p -e "USE ortupintar_db; SHOW TABLES;" 2>/dev/null

# Check if activities table has data
echo ""
echo "3. Checking activities table..."
mysql -u root -p -e "USE ortupintar_db; SELECT COUNT(*) as activity_count FROM activities;" 2>/dev/null

# Check child_activities table
echo ""
echo "4. Checking child_activities table (recent entries)..."
mysql -u root -p -e "USE ortupintar_db; SELECT * FROM child_activities ORDER BY created_at DESC LIMIT 5;" 2>/dev/null

echo ""
echo "🔧 Manual Testing Steps:"
echo "1. Open browser console (F12)"
echo "2. Go to http://localhost:3000 (or your frontend URL)"
echo "3. Login to the app"
echo "4. Select a child"
echo "5. Click 'Start Activity' on any recommended activity"
echo "6. Check console logs for:"
echo "   - 'Upcoming reminders API response'"
echo "   - 'Target child ID'"
echo "   - 'Reminders data'"
echo ""
echo "🐛 If still not working, check:"
echo "1. Network tab in browser dev tools"
echo "2. Backend console logs"
echo "3. Database entries in child_activities table"

echo ""
echo "📊 Quick API Test (replace TOKEN and CHILD_ID):"
echo "curl -H 'Authorization: Bearer YOUR_TOKEN' http://localhost:5000/api/activities/reminders/CHILD_ID"
