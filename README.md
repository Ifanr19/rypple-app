# rypple-app
Final Project PPPL 

# How to run the project locally 
🟢 **STEP 1: Run the Laravel Backend**

1.1 Open a terminal and go to your Laravel folder: 
 
```bash
cd /Users/ifan/Documents/PPPL/rypple-app/backend
````

1.2 Ensure dependencies are installed:

```bash
composer install
```

1.3 Set up your environment file:

```bash
cp .env.example .env
php artisan key:generate
```

If you're using SQLite, make sure `DB_CONNECTION=sqlite` and `DB_DATABASE` points to an actual `.sqlite` file (see earlier steps).

1.4 Run Laravel’s development server:

```bash
php artisan serve
```

✅ Laravel backend will now run at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

🔵 **STEP 2: Run the Next.js Frontend**

Open a new terminal window or tab, then:

2.1 Go to your frontend folder:

```bash
cd /Users/ifan/Documents/PPPL/rypple-app/frontend
```

2.2 Install dependencies (only once):

```bash
npm install
```

2.3 Make sure you have `.env.local` set up:

```bash
touch .env.local
```

Inside it:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

2.4 Start the frontend:

```bash
npm run dev
```

✅ Your frontend will now run at: [http://localhost:3000](http://localhost:3000)

---

🔄 **STEP 3: Test the Fullstack Connection**

3.1 In Laravel (`routes/api.php`):

```javascript
Route::get('/hello', function () {
    return ['message' => 'Hello from Laravel!'];
});
```

3.2 In Next.js (`frontend/pages/index.js` or `frontend/app/page.js`):

```javascript
'use client'; // Only for App Router

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hello`)
      .then(res => setMessage(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return <h1>{message || 'Loading...'}</h1>;
}
```

✅ Now visit [http://localhost:3000](http://localhost:3000) and you should see:
*"Hello from Laravel!"*

---

🔐 **STEP 4: CORS Configuration (If Not Already Done)**

In `backend/config/cors.php`:

```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
```

Then restart Laravel server if needed.

---

🔁 **Every Time You Work Locally**

Open two terminals:

1. Terminal 1 (Laravel API):

```bash
cd ~/Documents/PPPL/rypple-app/backend
php artisan serve
```

2. Terminal 2 (Next.js frontend):

```bash
cd ~/Documents/PPPL/rypple-app/frontend
npm run dev
```
