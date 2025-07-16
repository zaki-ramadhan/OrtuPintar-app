# 🎯 OrtuPintar - Smart Child Development Platform

A modern web application designed to help parents track and monitor their child's developmental milestones through structured activities and progress tracking.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)

## 🌟 Overview

OrtuPintar is a responsive web platform that helps parents actively participate in their child's developmental journey. The application provides age-appropriate activities, milestone tracking, and progress analytics.

### Key Benefits

- **Personalized Activities** - Age-appropriate content based on child's developmental stage
- **Progress Tracking** - Visual insights into developmental achievements
- **Multi-Child Support** - Manage multiple children with individual tracking
- **Mobile-Friendly** - Responsive design for all devices

## ✨ Features

### 👶 Child Management

- Add and manage child profiles
- Automatic age calculation
- Individual progress tracking

### 🎯 Activity System

- Age-appropriate activity recommendations
- Activities organized by developmental categories:
     - Motor Skills, Cognitive, Language, Social, Creative, Physical
- Daily activity reminders
- Completion tracking and progress monitoring

### 📊 Milestone Tracking

- Developmental milestone suggestions
- Progress indicators across categories
- Achievement celebration system

### 📱 User Experience

- Responsive design for desktop, tablet, and mobile
- Clean and intuitive interface
- Real-time progress updates

## 🚀 Tech Stack

### Frontend

- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **MySQL** (v8.0 or higher)

### Installation

1. **Clone the Repository**

      ```bash
      git clone https://github.com/zaki-ramadhan/OrtuPintar-app.git
      cd ortupintar-app
      ```

2. **Install Dependencies**

      ```bash
      # Backend
      cd backend
      npm install

      # Frontend
      cd ../frontend
      npm install
      ```

3. **Database Setup**

      ```bash
      # Create database
      mysql -u root -p
      CREATE DATABASE ortupintar_db;
      ```

4. **Environment Configuration**

      Create `.env` files with your configuration:

      **Backend (.env)**

      ```env
      DB_HOST=localhost
      DB_USER=your_username
      DB_PASSWORD=your_password
      DB_NAME=ortupintar_db
      JWT_SECRET=your_jwt_secret
      PORT=[BACKEND_PORT]
      ```

      **Frontend (.env)**

      ```env
      VITE_API_URL=http://localhost:[BACKEND_PORT]/api
      ```

      > **Security Note:** Configure your own port numbers for backend and API connections. Avoid using default ports in production environments.

## 🎮 Usage

### Development Mode

1. **Start Backend**

      ```bash
      cd backend
      npm run dev
      ```

2. **Start Frontend**
      ```bash
      cd frontend
      npm run dev
      ```

Access the application at `http://localhost:5173`

### Available Scripts

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build

**Backend:**

- `npm run dev` - Start development server
- `npm start` - Start production server

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
      ```bash
      git checkout -b feature/new-feature
      ```
3. **Make your changes**
4. **Commit your changes**
      ```bash
      git commit -m "Add new feature"
      ```
5. **Push and create a Pull Request**

### Guidelines

- Follow existing code style
- Write clear commit messages
- Test your changes
- Update documentation as needed

## 👥 Team Developers

### Core Development Team

This project is actively developed and maintained by a dedicated team of developers committed to creating high-quality educational tools for child development.

#### How to Join the Team

Interested in contributing as a core developer? We welcome passionate developers who share our mission of empowering parents with smart tools for child development.

**Requirements for Core Contributors:**

- Strong experience with React.js and Node.js
- Understanding of child development principles
- Commitment to code quality and best practices
- Ability to work collaboratively in a team environment

**Contact Information:**

- For team inquiries: ortupintar.team@gmail.com
- GitHub Issues: Use our issue tracker for technical discussions
- Development Guidelines: Follow our coding standards and review process

#### Current Contributors

Our core development team consists of three dedicated developers:

- [@zaki-ramadhan](https://github.com/zaki-ramadhan)
- [@akbarryyaan](https://github.com/akbarryyaan)
- [@Fiqryoa](https://github.com/Fiqryoa)

#### Recognition

Special thanks to all contributors who have helped make OrtuPintar a valuable tool for families:

- **Child Development Consultant:** Dr. Rina Handayani - Professional guidance on developmental milestones
- **Beta Testers:** Parent community who provided valuable feedback during development
- **Contributors:** All developers who submitted pull requests and reported issues

> **Note:** If you're a team member and would like your information updated in this section, please contact the project lead or submit a pull request.

## 🆘 Support

### Getting Help

If you encounter issues:

1. Check existing documentation
2. Search for similar issues
3. Create a new issue with:
      - Clear description
      - Steps to reproduce
      - Expected vs actual behavior

---

**OrtuPintar** - Empowering parents with smart tools for child development.

_Built with ❤️ for families_
