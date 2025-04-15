# Burger-Hut
Burger Hut is a full-stack web app for online burger ordering. Users can browse menus, customize orders, manage carts, and track orders. Admins can manage products, categories, and customer orders. Built with Spring Boot, Angular, MySQL, and secured with JWT.

🎯 Key Features:
👤 User Side:
User registration and login with role-based access

Browse burgers by category (Veg, Non-Veg, Special, Combo)

View detailed product descriptions and images

Add burgers to cart with quantity selection

View and update cart items

Secure checkout and order placement

View past orders and order status

🛠️ Admin Side:
Admin authentication

Add, update, and delete burger items

Manage categories and pricing

View all customer orders with status updates (Processing, Delivered, Cancelled)

Manage customer details and order history

💻 Tech Stack:
🔧 Backend:
Java 17

Spring Boot

Spring Security with JWT for authentication

Spring Data JPA

MySQL Database

🎨 Frontend:
Angular 18

Angular Material / Bootstrap for responsive UI

Reactive Forms and HTTPClient for API integration

☁️ Additional Features:
RESTful API architecture

Responsive design for mobile and desktop views

Custom exception handling for API responses

Input validation on both frontend and backend

Docker support (optional for deployment)

Kafka-based notification system (optional for advanced messaging)

📌 Sample User Roles:
Admin: Full access to manage products and orders

User: Can browse menu, place orders, and manage their profile

📦 Modules:
Authentication Module

Product Management

Cart Management

Order Processing

Admin Dashboard

User Profile & Order History

