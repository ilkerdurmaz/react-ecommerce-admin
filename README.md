## React-Redux E-Commerce Project
This is a web application that demonstrates E-commerce website using React and Redux.
The application has two different sections. The shopping pages that normal users view and the administration page that the administrator can view by logging in from /admin url.

**You can log-in admin page with "admin@admin.com" and "123456" password in the DEMO**

## [DEMO](https://react-ecommerce-admin-5bm3.vercel.app/)

### Shopping Pages (Products, My Orders, Shopping Cart)

#### Products
The application loads products from the Firestore database and displays them on "Products" page. On this page, users can filter products according to their categories, make various sorting and add them to the cart. In addition, as in many parts of the application, users can click on the name of the product and go to the product detail page.

![productsGIF](https://user-images.githubusercontent.com/14932895/191798842-fe7e0e63-ccea-4aa0-89af-5712317fd546.gif)

#### Shopping Cart
The application stores the products added to the cart in localStorage and lists them on this page.
On this page, users can delete the products or place an order. After the user places an order, the application will send the order data to Firestore and user will redirect to the "My Orders" page.

![cartGIF](https://user-images.githubusercontent.com/14932895/191799579-4e7921b9-f515-4b45-9845-edcc7c88b793.gif)

#### My Orders 
On this page, the application loads user's orders from the Firestore and lists them. After the admin sets this order as "delivered", the user can rate the products on this page.

![myordersGIF](https://user-images.githubusercontent.com/14932895/191800047-2c588be8-e8c4-4e44-a7e3-a4fb5ec40ab7.gif)

### Admin Page Sections (Dashboard, Orders, Products)

#### Dashboard
The application displays time-based sales data, top selling categories and top selling products on this page.

![dashboardGIF](https://user-images.githubusercontent.com/14932895/191800252-7dbb4c12-99b2-42fa-a3e6-a23a21194aba.gif)

#### Orders
The admin can review all orders on this page and mark them as "delivered".


![ordersAdminGIF](https://user-images.githubusercontent.com/14932895/191800495-fc38aed9-22af-4d46-a34a-0a15670e4d8e.gif)


#### Products
On this page, the administrator can view the products in the inventory, add new products and update the its properties.

![productsAdminGIF](https://user-images.githubusercontent.com/14932895/191800716-074a3308-a787-4d90-9ee3-485d82ab6780.gif)


## Getting Started
To get started  you can simply clone this `react-ecommerce-admin` repository and install the dependencies.

Clone the `react-ecommerce-admin` repository using git:

```bash
git clone https://github.com/ilkerdurmaz/react-ecommerce-admin.git
cd react-ecommerce-admin
```

Install dependencies with this command:
```bash
npm install
```

Run the application with this command:
```bash
npm start
```

You need to create .env file in the root directory and configure the Firebase keys:
```bash
REACT_APP_API_KEY = (apiKey)
REACT_APP_AUTH_DOMAIN = (authDomain)
REACT_APP_PROJECT_ID = (projectId)
REACT_APP_STORE_BUCKET = (storeBucket)
REACT_APP_MESSAGING_SENDER_ID = (messagingSenderId)
REACT_APP_API_ID = (apiId)
```

### Tech Stack

* [React.js](https://reactjs.org/)
* [React-Redux](https://react-redux.js.org/)
* [React Router](https://reactrouter.com)
* [Firebase](https://firebase.google.com/)
* [React Icons](https://react-icons.github.io/react-icons/)
* [React-Bootstrap](https://react-bootstrap.github.io/)
* [Recharts](https://recharts.org/)
