# API Documentation

## Setup Database

Jalankan command berikut untuk setup database:

```bash
cd backend
npm run setup-db
```

## API Endpoints

### Activities

#### GET /api/activities

Mendapatkan semua activities yang tersedia

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "message": "Activities fetched successfully",
  "activities": [
    {
      "id": 1,
      "title": "Shape Sorting",
      "description": "Learn to identify and sort different shapes",
      "category": "cognitive",
      "difficulty": "easy",
      "duration": 15,
      "age_group": "2-3 years",
      "age_group_min": 2,
      "age_group_max": 3,
      "icon": "🔵",
      "isMilestone": true
    }
  ]
}
```

#### POST /api/activities/start

Memulai activity (pindah ke upcoming reminders)

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "childId": 1,
  "activityId": 1
}
```

#### PUT /api/activities/complete

Menyelesaikan activity

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "childId": 1,
  "activityId": 1
}
```

#### PUT /api/activities/cancel

Membatalkan activity

**Headers:**

```
Authorization: Bearer <token>
```

**Body:**

```json
{
  "childId": 1,
  "activityId": 1
}
```

#### GET /api/activities/reminders/:childId

Mendapatkan upcoming reminders untuk child tertentu

**Headers:**

```
Authorization: Bearer <token>
```

#### GET /api/activities/progress/:childId

Mendapatkan progress data untuk child tertentu

**Headers:**

```
Authorization: Bearer <token>
```

### Notifications

#### GET /api/notifications

Mendapatkan semua notifications untuk user

**Headers:**

```
Authorization: Bearer <token>
```

#### PUT /api/notifications/:notificationId/read

Mark notification as read

**Headers:**

```
Authorization: Bearer <token>
```

#### PUT /api/notifications/read-all

Mark all notifications as read

**Headers:**

```
Authorization: Bearer <token>
```

#### DELETE /api/notifications/clear-all

Clear all notifications

**Headers:**

```
Authorization: Bearer <token>
```

## Database Schema

### Tables:

1. **activities** - Master data activities
2. **child_activities** - Tracking activity progress per child
3. **notifications** - User notifications
4. **child_milestones** - Milestone achievements

## Flow Aplikasi

1. **Start Activity**: User klik "Start Activity" di RecommendedActivities

   - Frontend call `POST /api/activities/start`
   - Activity masuk ke database sebagai status 'pending'
   - Activity muncul di UpcomingReminders

2. **Complete Activity**: User klik "Selesai" di UpcomingReminders

   - Frontend call `PUT /api/activities/complete`
   - Status activity berubah ke 'completed'
   - Notification otomatis dibuat
   - Jika milestone, notification achievement juga dibuat
   - Progress child bertambah

3. **Cancel Activity**: User klik "Batalkan" di UpcomingReminders
   - Frontend call `PUT /api/activities/cancel`
   - Status activity berubah ke 'cancelled'
   - Activity hilang dari UpcomingReminders
   - Activity bisa dimulai lagi dari RecommendedActivities
