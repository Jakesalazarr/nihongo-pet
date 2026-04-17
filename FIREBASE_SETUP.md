# Firebase Setup — Required Steps

Your Firebase config is already integrated. You need to enable 2 things in the Firebase Console before it works.

## 1. Enable Google Sign-In

1. Open [Firebase Console](https://console.firebase.google.com/project/nihonggo-pet/authentication/providers)
2. Click **"Get started"** (if first time)
3. Click **Google** in the list
4. Toggle **Enable**
5. Set a support email (your email)
6. Click **Save**

## 2. Add Firestore Security Rules

1. Open [Firestore Rules](https://console.firebase.google.com/project/nihonggo-pet/firestore/rules)
2. Replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

## 3. Authorize your domain

1. Open [Auth Settings](https://console.firebase.google.com/project/nihonggo-pet/authentication/settings)
2. Scroll to **"Authorized domains"**
3. Click **Add domain** and add: `jakesalazarr.github.io`

Once all 3 are done, open the app, go to **Profile tab → ☁️ Sign in with Google** — your pet data will auto-sync across devices.

## How It Works

- Sign in → loads latest data from cloud (or pushes local data if cloud is empty)
- Every action (feed, study, buy, equip) triggers a debounced save (2s)
- Switch devices → sign in → your pet appears with all progress
- Reset Pet → deletes both local AND cloud data

## Data stored per user
- Pet state (type, name, stats, level, outfit)
- Coins & economy
- Study progress (SRS cards, streaks, stats)
- Inventory (owned items)
- Room layout & theme
- Achievements
- Pet diary entries
