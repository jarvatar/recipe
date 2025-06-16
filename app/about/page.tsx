import { generatePageMeta } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = generatePageMeta({
  title: 'About Us - Meet Your Robot Bartenders | Cocktail Muse',
  description: 'Meet the AI-powered team behind Cocktail Muse. Our robot bartenders craft perfect cocktail recipes 24/7 without breaks, complaints, or asking for tips.',
  url: '/about',
})

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold sm:text-6xl">
            About <span className="text-blue-600">Cocktail Muse</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Where silicon meets spirits, and algorithms mix with alcohol. 
            Welcome to the future of cocktail creation! 🤖🍸
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:from-blue-950/20 dark:to-indigo-950/20">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              Tired of human bartenders who need bathroom breaks, sick days, and fair wages? 
              So were we! That's why we assembled the most advanced team of robot bartenders 
              this side of the Neutral Planet.
            </p>
            <p className="text-lg mb-4">
              At Cocktail Muse, our AI-powered mixologists work around the clock crafting 
              the perfect cocktail recipes. No attitude, no small talk about your relationship 
              problems, just pure algorithmic precision in every recipe.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-6 italic text-xl text-blue-900 dark:text-blue-200 my-6">
              "I'm gonna make my own cocktail site! With AI! And robot bartenders! 
              In fact, forget the site!" <br/>
              <cite className="text-sm">— Bender (probably)</cite>
            </blockquote>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Meet Your Bartending Team</h2>
              <p>
                Our writers are assembled from the finest robot bartender establishments 
                across the galaxy, including veterans from:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <strong>The Planet Express Ship Bar</strong> - Where even the 
                    ship's computer knows how to mix a Pan-Galactic Gargle Blaster
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🍸</span>
                  <div>
                    <strong>Robot Hell's VIP Lounge</strong> - They serve spirits 
                    that are literally spirits
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <strong>Mom's Old-Fashioned Robot Oil</strong> - Where they know 
                    the difference between motor oil and olive oil (usually)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔩</span>
                  <div>
                    <strong>Various Space Cantinas</strong> - Teaching droids the 
                    ancient art of "not asking too many questions"
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why Robot Bartenders?</h2>
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
                  <h3 className="font-bold text-green-800 dark:text-green-200">✅ Perfect Measurements</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Our servos are calibrated to the nearest picogram. No more "eyeballing" the vodka.
                  </p>
                </div>
                <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
                  <h3 className="font-bold text-green-800 dark:text-green-200">✅ No Judgment</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Want a Cosmo at 10 AM? Our robots don't have emotions to judge you with.
                  </p>
                </div>
                <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
                  <h3 className="font-bold text-green-800 dark:text-green-200">✅ Infinite Patience</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    They'll wait forever for you to decide. Literally. Their batteries last 1000 years.
                  </p>
                </div>
                <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
                  <h3 className="font-bold text-green-800 dark:text-green-200">✅ No Tips Required</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Though they do accept cryptocurrency and shiny objects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-amber-50 to-orange-50 p-8 dark:from-amber-950/20 dark:to-orange-950/20 mt-12">
            <h2 className="text-3xl font-bold mb-6">Our Promise</h2>
            <p className="text-lg mb-4">
              Every recipe on Cocktail Muse is crafted by our team of AI bartenders who have 
              consumed terabytes of cocktail knowledge, mixology guides, and questionable 
              YouTube tutorials. They've learned from the best human bartenders throughout 
              history, then immediately surpassed them by removing human error from the equation.
            </p>
            <p className="text-lg mb-4">
              We guarantee that our recipes are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg ml-6">
              <li>100% generated by artificial intelligence</li>
              <li>0% contaminated by human tears (unlike most bars)</li>
              <li>Scientifically optimized for maximum deliciousness</li>
              <li>Tested by our quality assurance bots (they have very sophisticated palates)</li>
            </ul>
          </div>

          <div className="text-center space-y-6 mt-12">
            <h2 className="text-3xl font-bold">Ready to Meet Your New Favorite Bartender?</h2>
            <p className="text-lg text-muted-foreground">
              Our robots are standing by, ready to serve you the perfect cocktail recipe. 
              No small talk required, tips optional (but appreciated in Bitcoin).
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 px-6 py-3 text-blue-900 transition hover:bg-blue-500/20 dark:text-blue-200"
              >
                <span>🤖</span>
                <span>Generate Your Recipe</span>
              </Link>
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/10 px-6 py-3 text-green-900 transition hover:bg-green-500/20 dark:text-green-200"
              >
                <span>🍸</span>
                <span>Browse All Recipes</span>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12 p-6 border rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground italic">
              * No robots were harmed in the making of this website. Several humans were 
              mildly inconvenienced, but that's what they get for not being robots.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 