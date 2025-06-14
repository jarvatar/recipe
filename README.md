# Cocktail Recipe Generator

Transform any ingredients into perfect cocktail recipes with AI guidance. Built with Next.js, TypeScript, and OpenAI.

[Live Demo](https://recipes.magicspaceseo.com/) | [Purchase Template](https://magicspace.co/courses/programmatic-seo)

**NEW: Watch the full setup tutorial!** ➡️ [https://www.youtube.com/watch?v=U43GbuD7lT4](https://www.youtube.com/watch?v=U43GbuD7lT4) ⬅️

![Recipe Generator Screenshot](https://recipes.magicspaceseo.com/og?path=/&title=Perfect%20Air%20Fryer%20Recipes&emoji=🍳)

## Features

- AI-powered cocktail recipe generation
- Beautiful recipe cards with auto-generated images
- SEO-optimized pages for each recipe
- Responsive design
- Dark mode support

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI GPT-4 for recipe generation
- **Images**: Replicate AI for cocktail photography
- **Styling**: Tailwind CSS
- **Components**: Radix UI primitives

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables (see `.env.example`)
4. Run database migrations: `npx prisma migrate dev`
5. Seed the database: `npx prisma db seed`
6. Start the development server: `npm run dev`

## Environment Variables

```env
DATABASE_URL="your-postgresql-connection-string"
OPENAI_API_KEY="your-openai-api-key"
REPLICATE_API_TOKEN="your-replicate-api-token"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

## License

MIT
