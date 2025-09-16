import { FaXTwitter, FaGithub, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t bg-black border-white/10 backdrop-blur-lg text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <img src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026741/oversin2_epheps.png" alt="Oversin Logo" className="w-30 ml-20 h-30 sm:ml-20" />
          <p className="mt-2 text-white/50 text-sm leading-relaxed">
            Oversin is your fitness journey powered by anime-inspired workouts,
            progress tracking, and a strong community. Built to push limits and
            transform lifestyles.
          </p>
        </div>

        <div>
          <h3 className="text-lg text-red-600 mb-4">Content</h3>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>
              <a href="/" className="hover:text-red-400 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/workouts" className="hover:text-red-400 transition-colors duration-200">
                Workouts
              </a>
            </li>
            <li>
              <a href="/nutrition" className="hover:text-red-400 transition-colors duration-200">
                Nutrition
              </a>
            </li>
            <li>
              <a href="/community" className="hover:text-red-400 transition-colors duration-200">
                Community
              </a>
            </li>
            <li>
              <a href="/progress" className="hover:text-red-400 transition-colors duration-200">
                Progress
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-red-600 mb-4">Support</h3>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>
              <a
                href="https://kotonami.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Kotonami
              </a>
            </li>
            <li>
              <a
                href="https://kiban-one.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Kiban
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Sigmabond01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Send Feedback
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Sigmabond01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors duration-200"
              >
                Report Bug
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-red-600 mb-4">Connect</h3>
          <div className="flex space-x-4 mb-6 pl-18">
            <a
              href="https://x.com/Sigmabond01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-red-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              aria-label="Follow us on X (Twitter)"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://github.com/Sigmabond01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-red-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              aria-label="View our GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:smdnoor4966@gmail.com"
              className="text-white/70 hover:text-red-400 transition-colors duration-200 text-xl p-2 rounded-lg hover:bg-white/5"
              aria-label="Email us"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/50 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Oversin. All rights reserved.
          </div>
          <div className="flex space-x-2 text-white/50 text-xs items-center">
            Made by @Sigmabond01 on X(Twitter).
          </div>
        </div>
      </div>
    </footer>
  );
}
