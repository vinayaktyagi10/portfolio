import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  try {
    // 1. Gather System Metrics
    const uptime = os.uptime(); // in seconds
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const memUsage = Math.round(((totalMem - freeMem) / totalMem) * 100);
    
    // CPU Load (1 min average)
    const load = os.loadavg()[0];
    const cpuUsage = Math.min(Math.round((load / os.cpus().length) * 100), 100);

    // 2. Check Internal Services (Quick internal pings)
    const services = [
      { name: 'authentik', url: 'http://authentik-server:9000' },
      { name: 'gitea', url: 'http://gitea:3000' },
      { name: 'adguard', url: 'http://adguard:3000' },
      { name: 'dozzle', url: 'http://dozzle:8080' },
    ];

    const healthChecks = await Promise.all(
      services.map(async (s) => {
        try {
          const start = Date.now();
          const res = await fetch(s.url, { next: { revalidate: 0 }, signal: AbortSignal.timeout(1000) });
          return { name: s.name, online: res.ok || res.status < 500, latency: Date.now() - start };
        } catch {
          return { name: s.name, online: false, latency: 0 };
        }
      })
    );

    return NextResponse.json({
      system: {
        cpu: cpuUsage,
        mem: memUsage,
        uptime: formatUptime(uptime),
        os: 'Ubuntu 24.04 LTS'
      },
      services: healthChecks,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch telemetry' }, { status: 500 });
  }
}

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}