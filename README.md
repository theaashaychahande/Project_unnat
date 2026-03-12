# Project Unnat

## Overview
Project Unnat is a professional web application built using TypeScript, React, and Tailwind CSS. It is designed to provide a clean and responsive interface for both citizens and administrators to manage complaints efficiently. The application features role-based dashboards and a user-friendly authentication flow.

## Features

### Authentication Flow
- Landing page with Login and Register options.
- Simple registration form with fields for Name, Email, Password, and Role (Citizen/Admin).
- Login form with Email and Password.
- Role-based routing to respective dashboards after login.

### Citizen Dashboard
- **Responsive Design**: Fully optimized for mobile and desktop views.
- **Navbar**: Displays the user's name and a logout button.
- **Complaint Submission Form**:
  - Fields: Complaint Title, Description, Location, Urgency Level (Low/Medium/High/Critical), and Photo Upload.
  - Submit button to add complaints.
- **Complaint List**: Displays the user's submitted complaints as cards with the following details:
  - Title
  - Date
  - Urgency Badge (color-coded: Low=Green, Medium=Yellow, High=Orange, Critical=Red)
  - Status Badge (Pending/In Progress/Resolved)

### Admin Dashboard
- **Desktop-Only Design**: Optimized for larger screens.
- **Sidebar Navigation**:
  - Sections: Overview and Complaints Queue.
- **Overview Section**:
  - Total Users Registered.
  - Total Complaints Submitted.
  - Complaints Breakdown by Urgency.
- **Complaints Queue**:
  - Table displaying all complaints with columns for:
    - User Name
    - Title
    - Location
    - Urgency
    - Date
    - Status
  - Filters for Urgency Level and Status.
  - Status Update Button for each complaint.

## Design
- **Color Scheme**: Deep navy blue, white, and orange accent.
- **Typography**: Strong sans-serif font for a professional look.
- **Animations**: Smooth transitions for page navigation and interactive elements.
- **Urgency Badges**: Color-coded for quick identification of complaint priority.

## Technology Stack
- **Frontend**: React with TypeScript.
- **Styling**: Tailwind CSS for utility-first styling.
- **Build Tool**: Vite for fast development and optimized builds.

## Folder Structure
- `src/`
  - `pages/`: Contains the main components for authentication, citizen dashboard, and admin dashboard.
  - `App.tsx`: Main application file with routing setup.
  - `index.css`: Global styles for the application.

## Purpose
Project Unnat aims to streamline the complaint management process for citizens and administrators, providing a clean and efficient platform for communication and resolution.
