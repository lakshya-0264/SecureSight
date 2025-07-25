# SecureSight

SecureSight is a modern CCTV monitoring dashboard that supports up to 3 live camera feeds. It leverages intelligent incident tracking (e.g., unauthorized access, gun threats) and presents them with an interactive 24-hour timeline UI.

## 🚀 Live Demo

🌐 [Live Site](https://secure-sight-ls.vercel.app)

## 📁 Public Repository

🔗 [GitHub Repository](https://github.com/lakshya-0264/SecureSight)

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router) + TailwindCSS
- **Database**: Neon Postgres
- **ORM**: Prisma
- **Deployment**: Vercel

## Environment Variables

Create a `.env` file and add the following:

### Development
```bash
NODE_ENV=development
DATABASE_URL=your_neon_development_database_url
```

### Production
```bash
NODE_ENV=production
DATABASE_URL=your_neon_production_database_url
```

## Deployment Instructions

```bash
# 1. Clone the repo
git clone https://github.com/lakshya-0264/SecureSight
cd securesight

# 2. Install dependencies
npm install

# 3. Set up .env file
# Add .env file as described above

# 4. Push schema to Neon
# Development
npx prisma migrate dev --name init
# Production (Vercel CLI)
npx prisma migrate deploy 

# 5. Optional: Seed your dev database
# Make sure you have NODE_ENV=development in your .env file
npm run seed

# 6. Start development
npm run dev
```

For production deployment on Vercel:
- Set `DATABASE_URL` and `NODE_ENV` in the Vercel dashboard
- Deploy using GitHub integration or Vercel CLI
- To Seed in production, There is a different API endpoint.

## Tech Decisions

- **Next.js App Router**: Better routing, layout management, and file-based structure
- **Neon DB**: Scalable Postgres with branching support for dev & prod
- **Prisma**: Type-safe database queries and schema migrations
- **TailwindCSS**: Utility-first CSS for rapid UI development
- **Lucide Icons**: Modern icons for events and camera indicators
- **Avatars**: We have used [Liara Avatar API](https://avatar-placeholder.iran.liara.run/) for user avatars.  
  Example usage:
  ```html
  <img src="https://avatar.iran.liara.run/username?username=Lakshya+Singhal" alt="User Avatar" width="40" height="40"/>


## Future Improvements

- Add Admin Authentication
- Add user role-based access controls
- Add video thumbnails per event
- Enable real-time socket integration for live events
- Camera stream preview
- Fullscreen timeline view

## Contact

For any queries related to setup, deployment, or contributions, feel free to reach out:

- Send us an [Email](mailto:lakshyasinghal2320@gmail.com)
- GitHub Issues: [https://github.com/lakshya-0264/SecureSight/issues](https://github.com/your-username/your-repo/issues)
- Website: [https://secure-sight-ls.vercel.app](https://secure-sight-ls.vercel.app)


---

© 2025 SecureSight. All right reserved.