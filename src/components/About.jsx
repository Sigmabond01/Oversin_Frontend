import { Lightbulb, Target, Trophy, Users } from "lucide-react";

const features = [
    {
        icon: Target,
        title: "Precision Training",
        description: 'Every workout crafted with scientific precision and warrior intensity'
    },
    {
        icon: Users,
        title: "Unbreakable Bond",
        description: "A global brotherhood of warriors supporting each others journey."
    },
    {
        icon: Trophy,
        title: "Victory Mindset",
        description: "Mental fortitude forged through consistent wins, no matter how small"
    },
    {
        icon: Lightbulb,
        title: "Enlightened Path",
        description: "Knowledge and wisdom illuminating your transformation journey"
    },
]

export default function About() {
    return (
        <section className="bg-black text-white py-20 relative overflow-hidden">            
            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl mb-6">
                        FORGED IN
                        <span className="text-red-500 ml-4 inline-block animate-pulse">
                            FIRE
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Born from the belief that every person has an untapped warrior within.
                        <span className="text-red-500 text-3xl mx-2">OVERSIN</span> 
                        is not just a fitness app—it is your forge for transformation.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {features.map(({ icon: Icon, title, description}, i) => (
                        <div 
                            key={i} 
                            className="group text-center p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-red-600/30 to-red-800/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Icon className="w-10 h-10 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl mb-4 group-hover:text-red-300 transition-colors duration-300">
                                {title}
                            </h4>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}