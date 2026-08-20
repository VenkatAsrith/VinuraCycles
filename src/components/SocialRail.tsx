import React from 'react';

export const SocialRail: React.FC = () => {
  const socials = [
    { label: 'IG', url: '#' },
    { label: 'YT', url: '#' },
    { label: 'TW', url: '#' }
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-slate-500 [writing-mode:vertical-lr] rotate-180 mb-2">
        FOLLOW VINURA
      </span>
      <div className="h-10 w-[1px] bg-white/10"></div>
      {socials.map((social, idx) => (
        <a
          key={idx}
          href={social.url}
          className="text-[10px] font-bold tracking-widest text-slate-500 hover:text-white transition-colors duration-300 py-1"
        >
          {social.label}
        </a>
      ))}
    </div>
  );
};
export default SocialRail;
