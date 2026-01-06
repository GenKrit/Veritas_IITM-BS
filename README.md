# Veritas Society – Web Platform

A full-stack, role-based web platform built for Veritas Society, designed to manage events, team members, editorial content, and internal administration with strong access control and clean separation between public and admin features.

This project focuses on real-world system design, secure authentication, role-based authorization, and scalable content management, rather than demo-only features.

## 🌐 Overview

Veritas Society is a discussion- and discourse-focused academic society.
This platform serves two purposes:

1.Public Website

- Showcase events, team members, and Veritas Speaking Digest (VSD)

- Read-only, SEO-friendly, and fast

2.Admin Panel

- Manage events, team structure, and editorial content

- Role-based access with approval workflow

- Secure, server-validated actions

## ✨ Core Features
1.Public Side

- Public Events listing with full event details

- Public Team page (department-wise, HOD highlighted)

- Public Veritas Speaking Digest (VSD)

- Server-rendered pages for fast load & SEO

- Automatic revalidation after admin updates

2.Admin Side

- Secure admin authentication

- Role-based access control

- Admin approval workflow

- Event creation, editing, publishing

- Team management by department

- VSD content management

- Protected API routes (server-side permission checks)

## 👥 Admin Roles & Permissions

The system uses strict role-based authorization, enforced on the server, not the UI.

### Roles
🛡️ SUPER_ADMIN

- Full system access

- Create, approve, remove admins

- Assign and change admin roles

- Manage all events, teams, and content

- Override permissions where required

### 🏢 DEPARTMENT_ADMIN

- Manage events

- Manage team members for assigned departments

- Cannot manage admins

### ✍️ CONTENT_ADMIN

- Manage Veritas Speaking Digest (VSD)

- Manage editorial content

- Limited event access (content-related only)

⚠️ Permissions are enforced in backend APIs.
UI restrictions are not trusted as security boundaries.

## 🔐 Authentication & Security Design

- Server-side session authentication (cookie-based)

- Passwords stored using bcrypt hashing

- Admin approval required before login

- Self-role modification is prevented

- Founder / Super Admin protections enforced

- Login Rules

- Admin account must exist

- Admin must be approved

- Password must match bcrypt hash

- Session expiry enforced server-side

## 🧠 Architecture Overview
### Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js (App Router)    |
| Language   | TypeScript              |
| Database   | PostgreSQL              |
| ORM        | Prisma                  |
| Styling    | Tailwind CSS            |
| Auth       | Custom server-side auth |
| Deployment | Vercel                  |

## 🗂️ Project Structure

```bash
veritas-website/
├─ app/
│  ├─ (public)/              # Public pages
│  │  ├─ page.tsx
│  │  ├─ events/
│  │  ├─ team/
│  │  └─ vsd/
│  │
│  ├─ admin/
│  │  ├─ (protected)/
│  │  │  ├─ dashboard/
│  │  │  ├─ events/
│  │  │  ├─ team/
│  │  │  ├─ vsd/
│  │  │  └─ admins/
│  │  └─ login/
│  │
│  └─ api/
│     └─ admin/
│        ├─ auth/
│        ├─ events/
│        ├─ admins/
│        ├─ team/
│        └─ vsd/
│
├─ lib/
│  ├─ auth/
│  │  ├─ admin.ts
│  │  ├─ permissions.ts
│  │  ├─ session.ts
│  │
│  ├─ events/
│  ├─ team/
│  └─ vsd/
│
├─ prisma/
│  └─ schema.prisma
│
└─ README.md
```

## Z Database Design (High Level)
### Key Models

- AdminUser
- AdminSession
- Event
- TeamDepartment
- TeamMember
- VSDEntry

### Design Choices

- Foreign keys for referential integrity
- Ordered lists for team members & VSD
- Explicit approval flags for admins
- No soft deletes for admins (explicit removal)

## 🧾 Events System
### Admin Capabilities

- Create, edit, delete events
- Set status: Upcoming / Live / Completed
- Add registration links, documents, cover images
- Publish immediately
- Public Side
- All active events are visible
- Full event details page
- Conditional CTAs (registration / links)

## 👥 Team Management
### Structure

- Departments (e.g., Events, Research)
- One HOD per department
- Multiple team members with ordering
- Admin Flow
- Department Admin / Super Admin can edit
- Edit mode required to modify
- Save & Publish updates immediately reflect on public site
- Public Display
- HOD highlighted
- Members ordered and grouped
- Dedicated member profile page

## 🗞️ Veritas Speaking Digest (VSD)

- Editorial content module
- Managed by Content Admin & Super Admin
- Ordered entries
- Editable title, description, links, images
- Public read-only display

## 🔄 Revalidation & Deployment
### Revalidation Strategy

- Pages are statically rendered where possible
- Admin mutations trigger revalidation
- Public pages update immediately after publish

### Deployment
- Hosted on Vercel

## 🎯 Design Philosophy

- Backend is the source of truth
- Permissions enforced server-side
- UI never trusted for authorization

## 📌 Future Enhancements

- Password reset flow
- Audit logs for admin actions
- Rate limiting on auth routes
- Email notifications
- Analytics dashboard

## 📄 License

Internal project for Veritas Society.
Educational and organizational use only.



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
