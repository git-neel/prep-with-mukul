# MasterMukul - Firebase Edition

React + Firebase app for online math tuition landing page with demo booking.

---

## 🚀 Quick Start (30 seconds)

```bash
# Install dependencies
npm install

# For local development (Vite frontend only)
cd client && npm run dev

# For Firebase emulator testing (separate terminal)
npx firebase emulators:start --project=demo-project

# For production deployment
npm run build
firebase deploy
```

---

## 📚 Full Documentation

See [README_FIREBASE.md](./README_FIREBASE.md) for complete Firebase deployment guide.

---

## 🏗️ Project Structure

```
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # UI components (shadcn)
│   │   ├── lib/            # Utilities (Firebase, React Query)
│   │   └── App.tsx         # Main app
│   └── vite.config.ts      # Vite configuration
│
├── functions/              # Cloud Functions (serverless API)
│   ├── src/index.ts        # API endpoints
│   ├── package.json        # Function dependencies
│   └── tsconfig.json       # TypeScript config
│
├── shared/                 # Shared schemas & types
│   └── schema.ts           # Zod validation schemas
│
├── firebase.json           # Firebase configuration
├── firestore.rules         # Database security rules
├── .firebaserc             # Firebase project ID
├── .env.example            # Environment template
└── README_FIREBASE.md      # Complete deployment guide
```

---

## 🎯 Key Features

✅ **Demo Booking Form**
- React Hook Form + Zod validation
- Real-time form validation
- Success/error notifications

✅ **Responsive Design**
- Mobile-first layout
- Dark mode support
- Tailwind CSS styling

✅ **Serverless Backend**
- Cloud Functions API
- Firestore database
- Automatic scaling
- Zero cost (free tier)

---

## 💻 Development

### Frontend Development

```bash
cd client
npm run dev
# Opens http://localhost:5173
```

### Local Firebase Testing

```bash
# Terminal 1: Start frontend dev server
cd client && npm run dev

# Terminal 2: Start Firebase emulators
npx firebase emulators:start --project=demo-project
```

Then update `.env.local` to use emulator URL:
```
VITE_API_BASE=http://localhost:5001/demo-project/us-central1
```

---

## 🚀 Deployment to Firebase

### 1. Setup Firebase

```bash
# Create Firebase project at firebase.google.com
# Get Project ID from Project Settings

# Update .firebaserc with your project ID
# Update .env.local with Firebase credentials
```

### 2. Build & Deploy

```bash
npm install && cd functions && npm install && cd ..
npm run build
npx firebase deploy
```

**Your app will be live at**: `https://YOUR_PROJECT_ID.web.app`

---

## 📋 Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in with your Firebase credentials from [Firebase Console](https://console.firebase.google.com):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE=https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net
```

---

## 🧪 Testing

### Test Form Submission

1. Visit `http://localhost:5173` (or Firebase URL in production)
2. Click "Book Demo"
3. Fill in form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Grade: 10
   - Message: Test

4. Click Submit
5. Success message should appear

### Verify Data Saved

**Local (Firestore Emulator)**:
- Visit http://localhost:4000 (Firestore Emulator UI)
- Check `demoBookings` collection

**Production (Firebase Console)**:
- Visit https://console.firebase.google.com
- Go to Firestore > Collections > demoBookings

---

## 📊 Cost

### Free Tier (Included)
- ✅ 40,000 writes/day
- ✅ 50,000 reads/day
- ✅ 5GB functions invocations
- ✅ Unlimited hosting

### Your Usage
- Demo bookings: 100-500/month
- **Cost: $0/month** ✅

---

## 🛠️ Available Commands

### Development
```bash
npm run dev          # Start Vite dev server
npm run build        # Build frontend + functions
npm run check        # TypeScript check
```

### Firebase
```bash
npx firebase deploy              # Deploy to Firebase
npx firebase functions:log       # View function logs
npx firebase emulators:start     # Start local emulators
```

---

## 📝 Architecture

**Before**: Express + PostgreSQL (manual server management)
**After**: Cloud Functions + Firestore (serverless & automatic)

Benefits:
- ✅ No server to manage
- ✅ Automatic scaling
- ✅ Lower cost ($0 vs $30-50/month)
- ✅ Global CDN
- ✅ Built-in security

---

## 🆘 Troubleshooting

### "Module not found" error
```bash
npm install
cd functions && npm install && cd ..
npm run build
```

### "CORS error" when submitting form
- Check browser console (F12) for actual error
- Verify Cloud Functions are deployed: `npx firebase functions:log`
- Check `.env.local` has correct API base URL

### "Cannot find Firebase project"
```bash
# Check your project ID
npx firebase use --list

# Set correct project
npx firebase use YOUR_PROJECT_ID
```

---

## 📚 More Information

- **Full Firebase Guide**: [README_FIREBASE.md](./README_FIREBASE.md)
- **Vite Documentation**: https://vitejs.dev
- **Firebase Docs**: https://firebase.google.com/docs
- **React Documentation**: https://react.dev

---

## 🔐 Security

### Firestore Rules
- Public read access (for admin use)
- Unauthenticated writes (demo booking form)
- For production: Add authentication

### Cloud Functions
- Automatic DDoS protection
- Sandboxed execution
- CORS configured

---

## 📞 Support

For detailed setup and deployment instructions, see [README_FIREBASE.md](./README_FIREBASE.md)

---

**Created**: January 2026
**Framework**: React 18 + Firebase
**Database**: Firestore (NoSQL)
**Cost**: Free tier (covers up to 40K+ bookings/month)
