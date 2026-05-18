# Client

Frontend for the van reservation system.

## Stack

- React 19
- Vite
- Tailwind CSS 4
- React Router
- Zustand
- Axios
- React Hook Form
- Zod

## Main Features

- Login and registration
- Protected user routes
- Protected admin routes
- Password reset enforcement via profile page
- Van booking page
- Booking history page
- Admin booking management
- Admin user management

## Routes

- `/` login
- `/register` register
- `/home` user home
- `/home/booking` booking form
- `/home/history` booking history
- `/profile` profile and password update
- `/admin` admin dashboard
- `/admin/manage` admin booking management
- `/admin/users` admin user management

## Environment

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3333/api
```

## Run

```bash
cd client
npm install
npm run dev
```

## Notes

- Auth state is stored with Zustand and persisted in local storage.
- API requests use the shared Axios instance in `src/services/axios.instance.js`.
- If the backend runs on a different port, update `VITE_API_BASE_URL`.
