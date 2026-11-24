# SWEAT.

**Become your own athlete.**

Your personal training app: plans built for your goal, follow-along workout videos with an illustrated trainer, muscle maps, and health tracking. Everything runs in the browser and your data stays on your device.

## Features

- **Personal plan**: pick a goal (muscle, strength, fat loss, fitness or endurance), your level, days per week, session length and equipment. SWEAT builds a weekly split with 4-week blocks and raises weights or reps when you rate sets as easy.
- **Follow-along workout video**: an illustrated trainer in a calm studio or a gym demonstrates each exercise. A ring counts your reps in time with him, a voice counts out loud, and you get rest timers, "Done set", "Skip rest", "+15 s", a playlist of exercises, and a "My pace" mode.
- **30 exercises**, each with a demo you can scrub or slow down, the coaching for each phase, a movement path, step-by-step technique, cues, common mistakes and a muscle map (primary in red, secondary in yellow).
- **Muscle filter**: tap muscles on a body map to find exercises that train them.
- **Daily check-in**: sleep, energy, soreness, stress and resting heart rate give a readiness score, and the day's session switches to a light version when you need it.
- **Body and health**: charts for readiness, weight, sleep and resting heart rate, a muscle recovery map, and calorie, protein and water targets.
- **Food tracker**: log meals from a built-in food list, the Open Food Facts database or a barcode scan. See calories, protein, carbs, fat and fibre, plus 13 vitamins and minerals as a % of your daily needs, with tips for what you're low on and a water tracker.
- **Progress**: sets per week by muscle group, personal records, and session details with a set-by-set log.
- **Garmin**: import `.fit`, `.tcx`, `.gpx` or Garmin Connect `.csv` exports to add heart rate and calories to your sessions.
- **Installable and offline**: add it to your home screen and it works without a connection.

## Use it

1. In this repository go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, then branch **main** and folder **/ (root)**, and press **Save**.
3. After a minute the app is live at `https://<your-username>.github.io/sweat/`.
4. Open that link on your phone:
   - **Android (Chrome)**: open the profile button (top right) → **Install app**, or use the browser menu → *Add to Home screen*.
   - **iPhone (Safari)**: tap **Share → Add to Home Screen**.

## Your data

Your plan, workouts, history and check-ins are saved in your browser on that device. There is no server and nobody else can see them. Use **Profile → Download backup file** regularly, and **Restore from file** to move your data to a new phone or browser.

## Files

- `index.html`: the whole app
- `manifest.webmanifest`, `icons/`: app name and icons for installing
- `sw.js`: offline support

## Turn on accounts and sync (phone ↔ PC)

SWEAT works without an account; data is saved on each device. To get one account that keeps your phone and PC in live sync:

1. Go to https://console.firebase.google.com and create a project (free Spark plan is enough).
2. **Build → Authentication → Get started**, then enable **Email/Password** and **Google**.
3. In Authentication → Settings → Authorized domains, add `btb993.github.io`.
4. **Build → Firestore Database → Create database** (production mode), then on the **Rules** tab paste:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{db}/documents {
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
5. Project settings → **Your apps → Web (</>)**, register the app, and copy the `firebaseConfig` values into `firebase-config.js` (replace `null`).
6. Commit. The welcome screen now offers **Create account / Sign in**, and Profile → Account shows sync status.

Changes sync within a couple of seconds. Bike console photos stay on the device that took them; everything else syncs.
