// components/admin/dashboard/DashboardFooter.tsx
import Link from "next/link";
import { Github, Mail, ExternalLink, Heart, ShieldCheck, FileText, Users, BookOpen, Calendar } from "lucide-react";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-b-4 border-neutral-500 mt-auto">
      <div className="w-full px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-lg font-bold text-neutral-900">Veritas Admin</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-6">
              The internal management portal for Veritas Oratory Society, IIT Madras BS Degree.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/veritas--iitm"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit our GitHub profile"
                className="text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:oratory.society@study.iitm.ac.in"
                title="Send us an email"
                className="text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
              Management
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/admin/events" icon={<Calendar className="w-4 h-4" />} label="Events Manager" />
              <FooterLink href="/admin/content" icon={<FileText className="w-4 h-4" />} label="Content Portal" />
              <FooterLink href="/admin/team" icon={<Users className="w-4 h-4" />} label="Team Directory" />
              <FooterLink href="/admin/vsd" icon={<BookOpen className="w-4 h-4" />} label="VSD Archieve" />
              <FooterLink href="/admin/admins" icon={<ShieldCheck className="w-4 h-4" />} label="Admin Roles" />
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" target="_blank" className="group flex items-center gap-2 text-sm text-neutral-600 hover:text-blue-600 transition-colors">
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-600" />
                  Live Website
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-blue-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-blue-600 transition-colors">
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>

          {/* System Status */}
          <div>
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
              System Status
            </h3>
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-neutral-700">Operational</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-neutral-500 flex justify-between">
                  <span>Version</span>
                  <span className="font-mono text-neutral-700">v1.2.0</span>
                </p>
                <p className="text-xs text-neutral-500 flex justify-between">
                  <span>DB-Server</span>
                  <span className="font-mono text-neutral-700">Asia-South1</span>
                </p>
                <p className="text-xs text-neutral-500 flex justify-between">
                  <span>Server</span>
                  <span className="font-mono text-neutral-700">Vercel</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            © {currentYear} Veritas Oratory Society.
          </p>
          
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <span>Developed with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/GenKrit"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-900 hover:text-blue-600 transition-colors underline decoration-neutral-300 underline-offset-4 hover:decoration-blue-600"
            >
              Shashwat Pandey
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Component for consistency
function FooterLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="group flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-all duration-200 hover:translate-x-1"
      >
        <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors">
          {icon}
        </span>
        {label}
      </Link>
    </li>
  );
}