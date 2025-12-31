// app/admin/(protected)/content/page.tsx
import Link from "next/link";
import { Construction, ArrowLeft, FileText, Newspaper, PenTool } from "lucide-react";

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-linear-to-br from-neutral-200 to-neutral-300 rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Content Management</h1>
          <p className="text-neutral-700">Manage speeches, articles, and research papers</p>
        </div>

        {/* Under Construction Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-12 text-center shadow-lg">
            {/* Animated Icon */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-orange-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-linear-to-br from-orange-100 to-orange-200 p-6 rounded-full">
                <Construction className="w-16 h-16 text-orange-600 animate-bounce" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              Under Construction
            </h2>

            {/* Description */}
            <p className="text-neutral-600 text-lg max-w-md mx-auto mb-8">
              The content management module is currently being developed. Please check back later.
            </p>

            {/* Coming Soon Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <FeatureCard 
                icon={<FileText className="w-6 h-6" />}
                title="Speeches"
                description="Manage speech content"
              />
              <FeatureCard 
                icon={<Newspaper className="w-6 h-6" />}
                title="Articles"
                description="Create & edit articles"
              />
              <FeatureCard 
                icon={<PenTool className="w-6 h-6" />}
                title="Research"
                description="Publish research papers"
              />
            </div>

            {/* Back Button */}
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-neutral-50 border-2 border-neutral-300 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 text-blue-600">
        {icon}
      </div>
      <h3 className="font-bold text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
}
