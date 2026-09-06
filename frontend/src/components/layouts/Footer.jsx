import { BookOpen, Globe, Code2, Share2, Heart } from 'lucide-react';
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex sm:flex-row flex-col gap-10 pb-12 border-b border-gray-800">

                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-white text-xl tracking-tight">
                                Notex<span className="text-purple-500">.</span>
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 max-w-sm md:w-full leading-relaxed">
                            The open note-sharing community built for students and developers. Upload your study material, share knowledge, and access thousands of verified study guides.
                        </p>
                        <div className="flex items-center gap-4 text-gray-400 pt-2">
                            <a href="#" className="hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Code2 className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links Column 1 */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Browse Notes</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Upload Material</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Popular Subjects</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Top Contributors</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <p>© {new Date().getFullYear()} Notex Inc. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for learners worldwide
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;