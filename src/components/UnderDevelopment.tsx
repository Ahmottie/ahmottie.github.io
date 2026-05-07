import { Github, Linkedin, FileText } from "lucide-react";

export function UnderDevelopment() {
  return (
    <div className="w-full bg-yellow-50 border-b border-yellow-200 p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-yellow-800">
        <p className="font-medium text-center md:text-left">
          🚧 This website is currently under development. Information shown here may not be accurate.
        </p>

        <div className="flex items-center gap-6 shrink-0">
          <a href="YOUR_LINKEDIN_URL" target="_blank" className="flex items-center gap-1 hover:underline">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="YOUR_GITHUB_URL" target="_blank" className="flex items-center gap-1 hover:underline">
            <Github size={16} /> GitHub
          </a>
          <a href="YOUR_CV_URL" target="_blank" className="flex items-center gap-1 hover:underline">
            <FileText size={16} /> CV
          </a>
        </div>
      </div>
    </div>
  );
}