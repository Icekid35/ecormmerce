# E-Commerce Platform  

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS, offering a seamless shopping experience with features like user authentication, a dynamic product showcase, and database management powered by Prisma.  

## Live Demo  
Check out the live site: [E-Commerce Platform](https://ecormmerce-psi.vercel.app/)  

## Features  
✅ User authentication with Google OAuth.  
✅ Dynamic carousel for showcasing products.  
✅ Optimized for performance using Next.js SSR and SSG.  
✅ Styled with Tailwind CSS for a responsive UI.  
✅ Prisma ORM for efficient database interaction.  
✅ Interactive user notifications powered by React Hot Toast.  

## Tech Stack  
- **Next.js** – Framework for server-rendered React applications.  
- **TypeScript** – For type-safe code.  
- **Tailwind CSS** – Utility-first CSS framework.  
- **Prisma** – Database ORM for schema management.  
- **Google OAuth** – User authentication.  
- **Additional tools:** `canvas-confetti`, `dotenv`, `Embla Carousel`, and more.  

## Getting Started  

Follow these steps to set up the project locally:  

### Prerequisites  
- **Node.js** (version 18 or higher)  
- **npm** or **yarn**  
- **A configured database** (refer to Prisma setup)  

### Installation  
#### 1. Clone the repository:  
```bash
git clone https://github.com/Icekid35/ecormmerce.git
cd ecormmerce
```
#### 2. Install dependencies:  
```bash
npm install
```
#### 3. Set up environment variables:  
- Create a `.env` file in the project root.  
- Add your database connection string and other variables (e.g., Google OAuth keys).  

#### 4. Generate Prisma client:  
```bash
npx prisma generate
```
#### 5. Start the development server:  
```bash
npm run dev
```

## Project Structure  
📁 **/pages** – Contains application routes.  
📁 **/components** – Reusable UI components.  
📁 **/prisma** – Database schema and migrations.  
📁 **/public** – Static assets (e.g., images, icons).  

## Deployment  
The project is deployed on **Vercel**.  
For deployment, ensure the `.env` variables are configured on the **Vercel dashboard**.  

## Contributing  
Contributions are welcome! 🚀  
1. Fork the repository.  
2. Create a feature branch.  
3. Submit a pull request.  

## License  
This project is licensed under the **MIT License**.  

## Acknowledgments  
- **Next.js**  
- **Tailwind CSS**  
- **Prisma**  
- **Vercel**  
