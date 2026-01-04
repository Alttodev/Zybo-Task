This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Setup Instructions

Clone the repo

git clone https://github.com/your-username/Zybo-Project.git
cd Zybo-Project


Install dependencies

npm install


Add environment variables
Create a .env.local file in the root:

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
API_URL=https:https://skilltestnextjs.evidam.zybotechlab.com


Run the project

npm run dev


Tech Decisions

Next.js – Fast performance with server-side rendering and easy file-based routing

Tailwind CSS – Quick and consistent styling using utility-first classes

NextAuth.js – Simple and secure authentication handling

React Hook Form – Efficient form handling with minimal re-renders and built-in validation

Zustand – Lightweight and easy global state management

GSAP – Smooth animations for hover effects and transitions

Axios – Clean and reliable API request handling

Component-based Architecture – Reusable, modular, and well-organized UI components
