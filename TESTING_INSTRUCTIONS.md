# Testing Instructions

## Setup Database

1. Pastikan MySQL sudah running
2. Update file `.env` di folder backend dengan database credentials yang benar
3. Run setup database:

```bash
cd backend
npm run setup-db
```

## Testing Flow Start Activity

1. **Start backend server:**

```bash
cd backend
npm run dev
```

2. **Start frontend server:**

```bash
cd frontend
npm run dev
```

3. **Test Steps:**
   - Login ke aplikasi
   - Pastikan ada anak (child) yang sudah ditambahkan
   - Pilih anak aktif
   - Lihat di RecommendedActivities, klik "Start Activity"
   - Cek console browser untuk melihat API response
   - Data harusnya muncul di UpcomingReminders

## Debug Console Logs

Periksa di browser console:

- "Activities API response:" - untuk list activities
- "Upcoming reminders API response:" - untuk list reminders
- "Notifications API response:" - untuk list notifications

## Troubleshooting

### 1. Data tidak muncul di UpcomingReminders

- Cek console browser untuk error
- Cek network tab untuk API response
- Pastikan child_activities table ada di database
- Cek apakah currentChild.id ada dan benar

### 2. Database Error

```bash
# Check if tables exist
mysql -u root -p
USE ortupintar_db;
SHOW TABLES;
DESCRIBE activities;
DESCRIBE child_activities;
```

### 3. API Endpoint Test (using curl or Postman)

```bash
# Test get activities
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/activities

# Test start activity
curl -X POST -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" \
-d '{"childId":1,"activityId":1}' \
http://localhost:5000/api/activities/start

# Test get reminders
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/activities/reminders/1
```

## Expected Behavior

1. Klik "Start Activity" → API call `POST /api/activities/start`
2. Data tersimpan ke `child_activities` table dengan status 'pending'
3. `fetchUpcomingReminders()` dipanggil otomatis
4. Data tampil di component UpcomingReminders
5. Button "Selesai" dan "Batalkan" muncul
