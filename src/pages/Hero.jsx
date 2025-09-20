import { Star} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import About from '../components/About.jsx';
import Features from '../components/Features.jsx';
import Footer from '../components/Footer.jsx';
import Highlight from '../components/Highlight.jsx';

export default function OversinHero() {
  return (
    <div className="absolute inset-0 bg-cover bg-center font-cinzel text-xl bg-no-repeat bg-[url(https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758330374/meliodas_baittq.webp)]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl pr-4">
                <div className="inline-flex items-center bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 mb-6">
                  <Star className="w-4 h-4 text-red-400 mr-2 fill-current" />
                  <span className="text-red-400 text-sm">Unleash Your Inner Warrior</span>
                </div>

                <h1 className="text-6xl font-sin md:text-6xl lg:text-8xl text-white mb-6 leading-[0.9] tracking-[0.11em]">
                  BREAK YOUR
                  <br />
                  <span className="bg-clip-text text-red-600">
                    SINS
                  </span>
                </h1>

                <div className="text-lg md:text-xl text-gray-300">
                <span>
                  Transform into the warrior you were meant to be. </span>
                  <p>
                  Intense workouts, disciplined nutrition, unbreakable mindset.
                </p>
                </div>
                </div>
            </div>
          </div>
        </div>

      </div>
      <About />
      <Features />
      <Highlight />
      <Footer />
      </div>
    );
}