import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Plus, Search, Music, Link as LinkIcon, Trash2, Eye } from 'lucide-react';

const initialReleases = [
  {
    id: '1',
    title: 'Midnight Groove',
    artist: 'DJ Luna',
    isrc: 'US-AAA-24-00001',
    platforms: ['Spotify', 'Apple Music'],
    date: '2024-03-01',
    status: 'Tracked',
  },
  {
    id: '2',
    title: 'Sunrise Anthem',
    artist: 'The Early Birds',
    isrc: 'US-AAA-24-00002',
    platforms: ['Spotify', 'YouTube'],
    date: '2024-02-15',
    status: 'Tracked',
  },
];

export default function TrackNewRelease() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [releases, setReleases] = useState(initialReleases);
  const [form, setForm] = useState({ title: '', artist: '', isrc: '', platforms: '', date: '' });
  const [formError, setFormError] = useState('');
  const [viewRelease, setViewRelease] = useState(null as typeof initialReleases[0] | null);

  const filtered = releases.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.artist.toLowerCase().includes(search.toLowerCase())
  );

  function handleAddRelease() {
    if (!form.title || !form.artist || !form.isrc) {
      setFormError('Title, artist, and ISRC are required.');
      return;
    }
    setReleases(prev => [
      {
        id: (Date.now() + Math.random()).toString(),
        title: form.title,
        artist: form.artist,
        isrc: form.isrc,
        platforms: form.platforms.split(',').map(p => p.trim()).filter(Boolean),
        date: form.date || new Date().toISOString().slice(0, 10),
        status: 'Tracked',
      },
      ...prev,
    ]);
    setForm({ title: '', artist: '', isrc: '', platforms: '', date: '' });
    setFormError('');
    setOpen(false);
  }

  function handleDeleteRelease(id: string) {
    setReleases(prev => prev.filter(r => r.id !== id));
    if (viewRelease && viewRelease.id === id) setViewRelease(null);
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Track New Release</h1>
            <p className="text-muted-foreground">Track royalties, splits, and recoupables for an existing song already distributed</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="harmony-gradient text-white font-semibold"><Plus className="h-4 w-4 mr-2" /> Add Existing Release</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Music className="h-5 w-5 text-primary" /> Add Existing Release</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <Input placeholder="Song Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                <Input placeholder="Artist Name" value={form.artist} onChange={e => setForm(f => ({ ...f, artist: e.target.value }))} />
                <Input placeholder="ISRC Code" value={form.isrc} onChange={e => setForm(f => ({ ...f, isrc: e.target.value }))} />
                <Input placeholder="Platform Links (comma separated)" value={form.platforms} onChange={e => setForm(f => ({ ...f, platforms: e.target.value }))} />
                <Input type="date" placeholder="Release Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                {formError && <div className="text-red-600 text-sm">{formError}</div>}
                <Button className="w-full harmony-gradient text-white mt-2" onClick={handleAddRelease}>Save Release</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or artist..."
              className="pl-10 bg-background border-border/50 w-full h-9 text-sm"
            />
          </div>
        </div>
        <div className="rounded-xl border border-muted/20 bg-muted/10">
          <table className="w-full text-left">
            <thead>
              <tr className="text-muted-foreground text-xs border-b">
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Artist</th>
                <th className="py-3 px-4 font-semibold">ISRC</th>
                <th className="py-3 px-4 font-semibold">Platforms</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">No releases found.</td>
                </tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20 transition">
                    <td className="py-3 px-4 font-medium">{r.title}</td>
                    <td className="py-3 px-4">{r.artist}</td>
                    <td className="py-3 px-4">{r.isrc}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 flex-wrap">
                        {r.platforms.map(p => (
                          <span key={p} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs"><LinkIcon className="h-3 w-3" />{p}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">{r.date}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block rounded px-2 py-0.5 bg-green-100 text-green-700 text-xs">{r.status}</span>
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setViewRelease(r)}><Eye className="h-4 w-4 mr-1" />View</Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteRelease(r.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* View Release Modal */}
        <Dialog open={!!viewRelease} onOpenChange={v => !v && setViewRelease(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Music className="h-5 w-5 text-primary" /> Release Details</DialogTitle>
            </DialogHeader>
            {viewRelease && (
              <div className="space-y-2 mt-2">
                <div className="font-bold text-lg">{viewRelease.title}</div>
                <div className="text-muted-foreground">{viewRelease.artist}</div>
                <div className="text-xs">ISRC: {viewRelease.isrc}</div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {viewRelease.platforms.map(p => (
                    <span key={p} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs"><LinkIcon className="h-3 w-3" />{p}</span>
                  ))}
                </div>
                <div className="text-xs mt-2">Release Date: {viewRelease.date}</div>
                <div className="text-xs mt-1">Status: <span className="inline-block rounded px-2 py-0.5 bg-green-100 text-green-700 text-xs">{viewRelease.status}</span></div>
                <div className="mt-4 text-muted-foreground text-sm">(Splits, recoupables, and contracts coming soon!)</div>
              </div>
            )}
            <DialogClose asChild>
              <Button variant="outline" className="w-full mt-4">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 