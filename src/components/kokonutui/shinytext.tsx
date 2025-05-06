export default function Shinytext() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative px-4 py-2 overflow-hidden">
        <div className="text-sm text-gray-400 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent  border-[2px] border-white/5 rounded-3xl w-fit ">
          <h1 className="shimmer-text">
            Powering AI transformation for everyone
          </h1>
        </div>
      </div>
      <style>{`
                .shimmer-text {
                    --shimmer-color-start: #334155;
                    --shimmer-color-mid: #94a3b8;
                    background: linear-gradient(
                        90deg,
                        var(--shimmer-color-start) 0%,
                        var(--shimmer-color-start) 40%,
                        var(--shimmer-color-mid) 50%,
                        var(--shimmer-color-start) 60%,
                        var(--shimmer-color-start) 100%
                    );
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: shimmer 2.5s infinite linear;
                }

                @media (prefers-color-scheme: dark) {
                    .shimmer-text {
                        --shimmer-color-start: #f1f5f9;
                        --shimmer-color-mid: #9333EA;
                    }
                }

                @keyframes shimmer {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }
            `}</style>
    </div>
  );
}
