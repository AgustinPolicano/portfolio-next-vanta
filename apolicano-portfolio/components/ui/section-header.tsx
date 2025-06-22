import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({ title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 h-[120px] flex flex-col justify-center ${className}`}>
      <h2 className="text-4xl font-bold mb-4">
        {title} <span className="text-red-500"></span>
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
} 