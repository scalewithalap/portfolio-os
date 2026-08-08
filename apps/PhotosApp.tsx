import { Image } from 'lucide-react';
import { useEcosystemStore } from '../store/useEcosystemStore';
import LazyImage from '../components/LazyImage';

export default function PhotosApp() {
  const { systemTheme } = useEcosystemStore();
  const isLight = systemTheme === 'light';

  const photos = [
    { id: 1, title: 'Vibe44 AI Platform', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, title: 'OpenUI Interface', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, title: 'Zero Headache Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, title: 'Make Me Sound Copilot', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, title: 'Soothly Workflow Canvas', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, title: 'Freecom Storefront', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop' },
  ];

  return (
    <div className={`flex flex-col h-full w-full p-6 overflow-y-auto font-sans transition-colors duration-200 ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#18181b]'
    }`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-lg">
          <Image className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className={`text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Photos & Showcase</h1>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-white/50'}`}>Production UI Screenshots & Project Visuals (Lazy Loaded)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className={`group relative rounded-xl overflow-hidden border shadow-lg transition-colors ${
            isLight ? 'bg-white border-slate-200' : 'bg-white/5 border-white/10'
          }`}>
            <LazyImage 
              src={photo.url} 
              alt={photo.title} 
              containerClassName="w-full h-40"
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end pointer-events-none z-20">
              <span className="text-xs font-semibold text-white">{photo.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
