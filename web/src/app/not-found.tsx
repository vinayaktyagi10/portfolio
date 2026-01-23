import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-terminal-black text-terminal-green font-mono p-4 flex flex-col items-start justify-center text-sm md:text-base selection:bg-terminal-red selection:text-white z-50 relative">
      <div className="max-w-3xl space-y-2">
        <p className="text-terminal-red font-bold">KERNEL PANIC: VFS: Unable to mount root fs on unknown-block(4,0,4)</p>
        <p>Pid: 1337, comm: http_worker Not tainted 6.8.0-rc1-portfolio #1</p>
        <p>Call Trace:</p>
        <div className="pl-4 text-terminal-dim space-y-1">
            <p>[&lt;ffffffff8100&gt;] ? navigate_to_page+0x40/0x90</p>
            <p>[&lt;ffffffff8101&gt;] ? find_route+0x20/0x50</p>
            <p>[&lt;ffffffff8102&gt;] ? render_404+0x10/0x30</p>
            <p>[&lt;ffffffff8103&gt;] ? panic+0x0f/0x20</p>
        </div>
        <br />
        <p className="text-white">---[ end Kernel panic - not syncing: Requested resource not found ]---</p>
        <br />
        <p className="animate-pulse">_</p>
        
        <div className="mt-12 p-4 border border-terminal-red/50 bg-terminal-red/10">
          <p className="text-terminal-red font-bold mb-2">!!! SYSTEM HALTED !!!</p>
          <p className="mb-4 text-terminal-dim">The requested URL was not found on this server.</p>
          
          <Link 
            href="/" 
            className="inline-block px-6 py-2 bg-terminal-green text-terminal-black font-bold hover:bg-terminal-green/90 transition-colors"
          >
            [ REBOOT SYSTEM ]
          </Link>
        </div>
      </div>
    </div>
  );
}
