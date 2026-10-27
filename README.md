# 🌍 Wanderlust — Travel & Booking Website

Discover extraordinary destinations, explore exciting trips, and plan your next adventure with **Wanderlust**. This project is a responsive travel website built with React, featuring Firebase authentication and a trip booking system.

## ✨ Features

- **Home Page** — Discover destinations and travel experiences.
- **Trips Listing** — Browse available trips and destinations.
- **Trip Details** — View trip descriptions, prices, duration, ratings, highlights, and itineraries.
- **User Authentication** — Register and sign in using Firebase Authentication.
- **Google Sign-In** — Authenticate using a Google account.
- **Protected Routes** — Restrict booking and booking-history pages to authenticated users.
- **Trip Booking** — Submit traveler details, departure dates, number of travelers, and special requests.
- **Dynamic Pricing** — Calculate the estimated total based on the selected trip and traveler count.
- **My Bookings** — View booking history, travel details, estimated totals, and booking status.
- **Responsive Design** — Layouts designed for desktop, tablet, and mobile devices.
- **Loading & Error Pages** — Display loading indicators and handle routing errors.
- **Navigation** — Navigate between the Home, Trips, About Us, Contact, Login, Register, Booking, and My Bookings pages.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Development server and build tool |
| React Router | Client-side routing and protected pages |
| React Bootstrap | Responsive UI components |
| Bootstrap | Layout and styling utilities |
| React Icons | Icons throughout the interface |
| Firebase Authentication | Email/password and Google sign-in |
| Cloud Firestore | Store and retrieve booking records |
| CSS3 | Custom styling, layouts, and responsive design |

## 📁 Project Structure

```text
Travel-project-react/
├── public/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Trips.jsx
│   │   │   ├── TripDetail.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   └── MyBookings.jsx
│   │   ├── ui/
│   │   │   └── Loading.jsx
│   │   └── ...
│   ├── config/
│   │   └── firebase.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── Data/
│   │   └── trips.js
│   ├── Routes/
│   │   ├── Mainlayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

*Note: The structure above describes the expected organization based on the project code. Your actual filenames and folders may differ.*

## 🚀 Getting Started

### 1. Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm
- A Firebase project

### 2. Clone the Repository

```bash
git clone <your-repository-url>
cd Travel-project-react
```

Replace `<your-repository-url>` with your Git repository URL.

### 3. Install Dependencies

```bash
npm install
```

If any packages are missing, install the required dependencies:

```bash
npm install react react-dom react-router-dom
npm install react-bootstrap bootstrap react-icons firebase
npm install -D vite @vitejs/plugin-react
```

### 4. Configure Firebase

Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

Enable the following services:

1. **Authentication**
   - Enable Email/Password.
   - Enable Google sign-in.
2. **Cloud Firestore**
   - Create a Firestore database.
   - Configure appropriate security rules for booking documents.

### 5. Configure Environment Variables

Create a `.env` file in the project root, alongside `package.json`.

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGE_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Replace the placeholder values with the configuration from your Firebase web app.

**Important:** The environment variable names must match those referenced in `src/config/firebase.js`.

Never commit your `.env` file to a public repository.

### 6. Start the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173/
```

### 7. Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🗺️ Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home page | Public |
| `/trips` | Browse available trips | Public |
| `/trips/:id` | View trip details | Public |
| `/aboutUs` | About Wanderlust | Public |
| `/contact` | Contact page | Public |
| `/login` | Sign in | Public |
| `/register` | Create an account | Public |
| `/booking/:id` | Book a selected trip | Authenticated |
| `/myBookings` | View personal bookings | Authenticated |

## 🔐 Authentication & Booking Flow

1. Users browse trips and open a trip's detail page.
2. Users select **Book Your Trip**.
3. Unauthenticated users are redirected to sign in.
4. Authenticated users enter traveler details and choose a departure date.
5. The application calculates an estimated total based on the trip price and number of travelers.
6. The booking request is saved to Cloud Firestore.
7. Users can view their saved bookings on the My Bookings page.

### Booking Status

Booking requests use a status such as `pending` until the trip is confirmed. Submitting a booking request does not itself process a payment or guarantee availability.

## 🎨 Design

Wanderlust uses a nature-inspired visual identity:

- **Forest Green** — `#17231a`
- **Lime Green** — `#d6ff62`
- **Off-White** — `#f7f8f3`
- **Typography** — DM Sans and Playfair Display

The design focuses on readable layouts, destination imagery, clear booking actions, and responsive navigation.

## 🔒 Security Notes

- Configure Firestore Security Rules to ensure users can access only their own booking records.
- Validate booking data and prices on a trusted backend before treating a booking as confirmed.
- Never store passwords directly in Firestore.
- Keep private credentials and service-account keys out of frontend code.
- Restrict Firebase API keys and configure authorized domains appropriately.

## 🔮 Future Improvements

- Online payment integration.
- Booking confirmation emails.
- Booking cancellation and modification.
- Admin dashboard for managing trips and reservations.
- Live trip availability.
- User profile management.
- Reviews and ratings.
- Search, filtering, and destination categories.

## 👩‍💻 Author

**Vaishali Chauhan**

Travel Booking Website built with React, Vite, and Firebase.

---

*Wanderlust — Explore more. Worry less.*
