# Nexent Admin Dashboard

A modern, responsive admin dashboard for managing the Nexent e-commerce platform. Built with React, Vite, and TailwindCSS with DaisyUI components. Provides comprehensive tools for product management, order tracking, customer analytics, and business insights.

## 🚀 Features

- **📊 Dashboard Analytics** - Real-time business metrics, revenue tracking, order statistics
- **🛍️ Product Management** - Create, update, delete products with image uploads
- **📦 Order Management** - View orders, update status, track deliveries
- **👥 Customer Management** - View customer list, purchase history, analytics
- **🔐 Secure Authentication** - Clerk-based authentication with role-based access
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI** - Clean interface with DaisyUI components
- **⚡ Fast Performance** - Vite-powered development and optimized production builds
- **🔄 Real-time Updates** - TanStack Query for efficient data fetching and caching
- **📧 Admin Email Restriction** - Only @nexent.in emails can access admin panel

## 🛠️ Tech Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 7.2
- **Routing**: React Router 7
- **Styling**: TailwindCSS 4 + DaisyUI 5
- **State Management**: TanStack Query (React Query)
- **Authentication**: Clerk
- **HTTP Client**: Axios
- **Error Tracking**: Sentry
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js >= 18.x
- npm or yarn
- Nexent Backend API running
- Clerk account with admin role configured

## 🔧 Installation

### 1. Navigate to admin directory
```bash
cd admin/nexent
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# Backend API URL
VITE_API_URL=http://localhost:3000

# Sentry (Error Tracking)
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
VITE_SENTRY_AUTH_TOKEN=xxxxx
```

### 4. Start development server
```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:5173`

## 📁 Project Structure

```
admin/nexent/
├── src/
│   ├── assets/              # Static assets (images, icons)
│   ├── components/          # Reusable UI components
│   │   ├── DashboardStats.jsx
│   │   ├── OrdersTable.jsx
│   │   ├── PageLoader.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductsTable.jsx
│   │   └── Sidebar.jsx
│   ├── layout/              # Layout components
│   │   └── DashboardLayout.jsx
│   ├── lib/                 # Utilities and configurations
│   │   └── axios.js         # Axios instance configuration
│   ├── pages/               # Page components
│   │   ├── CustomerPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── OrdersPage.jsx
│   │   └── ProductsPage.jsx
│   ├── App.css              # Global styles
│   ├── App.jsx              # Main app component with routing
│   ├── index.css            # Tailwind imports
│   └── main.jsx             # React entry point
├── public/                  # Public assets
├── index.html               # HTML template
├── package.json
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
└── eslint.config.js         # ESLint configuration
```

## 🔐 Authentication

### Admin Access Requirements:
- Must sign in with a **@nexent.in** email address
- Other email domains are restricted from accessing admin features
- Clerk handles authentication and user session management

### Login Flow:
1. Navigate to `/login`
2. Click "Continue with Google" (or other OAuth provider)
3. Sign in with your @nexent.in email
4. Automatically redirected to dashboard upon successful authentication

## 📊 Dashboard Features

### 1. Dashboard Page (`/dashboard`)
**Overview Analytics:**
- Total Revenue (real-time)
- Total Orders count
- Total Products in catalog
- Total Registered Users
- Revenue trend chart
- Recent orders list
- Top-selling products

**API Endpoint:** `GET /api/admin/stats`

### 2. Products Page (`/products`)
**Features:**
- View all products in a searchable table
- Add new products with image uploads (up to 3 images)
- Edit existing products (name, description, price, stock, category)
- Delete products
- Category filtering
- Real-time stock tracking
- Return policy configuration (returnable, refundable, return days)

**Product Form Fields:**
- Name
- Description
- Price
- Stock quantity
- Category (electronics, fashion, home, beauty, sports, books, toys, food, other)
- Images (up to 3)
- Return Policy:
  - Returnable (Yes/No)
  - Refundable (Yes/No)
  - Return Days (0-30)

**API Endpoints:**
- `GET /api/admin/products` - Fetch all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### 3. Orders Page (`/orders`)
**Features:**
- View all orders from all customers
- Filter by order status
- Update order status
- View order details (products, customer info, shipping address)
- Track payment information
- Order timeline

**Order Statuses:**
- Pending
- Processing
- Shipped
- Delivered
- Cancelled

**Order Information Displayed:**
- Order ID
- Customer name and email
- Order date
- Total amount
- Payment method
- Shipping address
- Products ordered (with quantities and prices)
- Current status

**API Endpoints:**
- `GET /api/admin/orders` - Fetch all orders
- `PATCH /api/admin/orders/:orderId/status` - Update order status

### 4. Customers Page (`/customers`)
**Features:**
- View all registered customers
- Customer statistics
- Total orders per customer
- Total spent per customer
- Registration date
- Contact information

**Customer Information Displayed:**
- Name
- Email
- Phone (if provided)
- Profile image
- Registration date
- Total orders
- Total amount spent
- Wishlist count
- Saved addresses

**API Endpoint:** `GET /api/admin/customers`

## 🎨 UI Components

### DashboardStats Component
Displays key business metrics in card format with icons and trend indicators.

### ProductsTable Component
- Sortable columns
- Pagination
- Search functionality
- Quick actions (Edit, Delete)
- Image preview
- Stock indicators (Low stock warnings)

### OrdersTable Component
- Status badges (color-coded)
- Expandable row details
- Quick status update dropdown
- Customer information
- Payment status indicators

### ProductForm Component
- Multi-image upload with preview
- Form validation
- Category dropdown
- Return policy toggles
- Real-time preview

### Sidebar Component
- Navigation menu
- Active route highlighting
- User profile section
- Logout button
- Responsive mobile menu

## 🔄 State Management

### TanStack Query (React Query) Usage:

**Products:**
```javascript
const { data: products, isLoading } = useQuery({
  queryKey: ['admin-products'],
  queryFn: fetchProducts
});
```

**Orders:**
```javascript
const { data: orders } = useQuery({
  queryKey: ['admin-orders'],
  queryFn: fetchOrders
});
```

**Mutations:**
```javascript
const updateProductMutation = useMutation({
  mutationFn: updateProduct,
  onSuccess: () => {
    queryClient.invalidateQueries(['admin-products']);
    toast.success('Product updated!');
  }
});
```

## 📡 API Integration

### Axios Configuration
Located in `src/lib/axios.js`:

```javascript
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// Request interceptor for auth token
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Making API Calls
```javascript
// GET request
const products = await axiosInstance.get('/api/admin/products');

// POST request with FormData (for file uploads)
const formData = new FormData();
formData.append('name', 'Product Name');
formData.append('images', file1);
formData.append('images', file2);
await axiosInstance.post('/api/admin/products', formData);

// PATCH request
await axiosInstance.patch(`/api/admin/orders/${orderId}/status`, {
  status: 'shipped'
});
```

## 🎨 Styling

### TailwindCSS with DaisyUI Themes

**Available Themes:**
- Light (default)
- Dark
- Cupcake
- Corporate

**Custom Classes:**
```css
/* Card */
.card { @apply bg-base-100 shadow-xl rounded-lg p-6; }

/* Button Primary */
.btn-primary { @apply bg-primary text-white hover:bg-primary-focus; }

/* Badge */
.badge-success { @apply bg-success text-white; }
```

**Responsive Design:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Cards */}
</div>
```

## 🔔 Notifications

Using **react-hot-toast** for user feedback:

```javascript
import toast from 'react-hot-toast';

// Success
toast.success('Product created successfully!');

// Error
toast.error('Failed to update order');

// Loading
const loadingToast = toast.loading('Uploading images...');
toast.dismiss(loadingToast);

// Custom
toast('Custom message', { icon: '🎉' });
```

## 🚀 Build and Deployment

### Development Build
```bash
npm run dev
```
Starts Vite dev server at `http://localhost:5173`

### Production Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview Production Build
```bash
npm run preview
```
Serves production build locally for testing

### Deployment Options

#### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### 2. Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

#### 3. Nginx (VPS)
```bash
# Build locally
npm run build

# Upload dist folder to server
scp -r dist/* user@server:/var/www/admin

# Nginx config
server {
  listen 80;
  server_name admin.nexent.com;
  root /var/www/admin;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

#### 4. Docker
```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔒 Security Best Practices

- **Environment Variables**: Never commit `.env` files
- **HTTPS**: Always use HTTPS in production
- **CORS**: Backend configured to allow admin domain only
- **Authentication**: Clerk handles secure session management
- **Authorization**: Backend validates @nexent.in email domain
- **XSS Protection**: React automatically escapes rendered content
- **File Upload**: Backend validates file types and sizes

## ⚡ Performance Optimization

- **Code Splitting**: React Router lazy loading
- **Image Optimization**: Cloudinary handles image compression
- **Bundle Size**: Vite tree-shaking removes unused code
- **Caching**: React Query caches API responses
- **Lazy Loading**: Components loaded on-demand
- **Minification**: Production build automatically minified

## 🐛 Error Handling

### Sentry Integration
Automatically tracks and reports errors:

```javascript
import * as Sentry from "@sentry/react";

// Initialize in main.jsx
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### API Error Handling
```javascript
try {
  await axiosInstance.post('/api/admin/products', data);
  toast.success('Success!');
} catch (error) {
  const message = error.response?.data?.error || 'Something went wrong';
  toast.error(message);
  Sentry.captureException(error);
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login with @nexent.in email
- [ ] Login fails with non-admin email
- [ ] Dashboard loads all statistics
- [ ] Create product with 3 images
- [ ] Edit product details
- [ ] Delete product (confirmation prompt)
- [ ] View all orders
- [ ] Update order status
- [ ] View customer list
- [ ] Search and filter products
- [ ] Responsive design on mobile/tablet
- [ ] Dark mode toggle works

## 📞 Support & Troubleshooting

### Common Issues

**Issue: "Cannot connect to API"**
- Solution: Check `VITE_API_URL` in `.env`
- Ensure backend is running on correct port
- Verify CORS settings in backend

**Issue: "Unauthorized access"**
- Solution: Use @nexent.in email to login
- Check Clerk configuration
- Verify backend auth middleware

**Issue: "Images not uploading"**
- Solution: Check Cloudinary credentials in backend
- Verify file size limits (max 5MB recommended)
- Check network tab for upload errors

**Issue: "Build fails"**
- Solution: Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (requires >= 18.x)

## 📈 Analytics & Monitoring

### Key Metrics to Track:
- Average order value
- Orders per day
- Product views
- Stock turnover rate
- Customer lifetime value
- Revenue trends

### Sentry Dashboard:
Monitor errors, performance, and user sessions at `https://sentry.io`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/admin-improvement`)
3. Commit your changes (`git commit -m 'Add new admin feature'`)
4. Push to the branch (`git push origin feature/admin-improvement`)
5. Open a Pull Request

## 📄 License

ISC License

---

## 🔗 Related Documentation

- [Backend API Documentation](../../backend/README.md)
- [Mobile App Documentation](../../mobile/nexent/README.md)
- [Clerk Documentation](https://clerk.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [TailwindCSS Docs](https://tailwindcss.com)

---

**Built with ❤️ by the Nexent Team**
