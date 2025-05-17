# 🍳 AI Recipe Generator

Transform any ingredients into perfect air fryer recipes with AI guidance. Built with Next.js, TypeScript, and OpenAI.

[Live Demo](https://recipes.magicspaceseo.com/) | [Purchase Template](https://magicspace.co/courses/programmatic-seo)

**NEW: Watch the full setup tutorial!** ➡️ [https://www.youtube.com/watch?v=U43GbuD7lT4](https://www.youtube.com/watch?v=U43GbuD7lT4) ⬅️

![Recipe Generator Screenshot](https://recipes.magicspaceseo.com/og?path=/&title=Perfect%20Air%20Fryer%20Recipes&emoji=🍳)

## ✨ Features

- 🤖 AI-powered recipe generation
- 📱 Responsive, mobile-first design
- 🌙 Dark/light mode
- 🖼️ Auto-generated recipe images
- 🔍 SEO optimized with structured data
- ⚡️ Built with Next.js 14 and TypeScript

## 🚀 Quick Start

1. **Install Dependencies**
```bash
# Install bun (recommended)
curl -fsSL https://bun.sh/install | bash

# Clone and setup
git clone https://github.com/magicspace-seo/programmatic-seo.git
cd examples/recipes
bun install
```

2. **Set Up Environment**

Create a `.env` file with:
```bash
# Database (Required)
DATABASE_URL="postgres://..."

# OpenAI (Required)
OPENAI_API_KEY="sk-..."

# Image Generation (Optional)
REPLICATE_API_TOKEN="r8_..."

# Vercel Blob Storage (Optional)
BLOB_READ_WRITE_TOKEN="vercel_..."
```

3. **Start Development Server**
```bash
bun dev
```

Visit `http://localhost:3000` to see your app!

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Vercel)
- **AI**: OpenAI GPT-4, Replicate
- **Deployment**: Vercel
- **Image Storage**: Vercel Blob

## 🔧 Configuration

### Database Setup

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to Storage → Create Database → PostgreSQL
3. Copy connection string to `.env`

### OpenAI Setup

1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create new key
3. Add to `.env` as `OPENAI_API_KEY`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Platform](https://vercel.com)
- [OpenAI API](https://platform.openai.com/docs)
- [Replicate](https://replicate.com/docs)

## 📝 License

This project is licensed under the MagicSpace SEO License - see the [LICENSE.md](../../LICENSE.md) file for details. **Purchase required for use**. [Buy Now](https://magicspace.co/courses/programmatic-seo)
