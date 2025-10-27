import { useState } from "react";

export default function MultimediaPage() {
  const [mediaUrl, setMediaUrl] = useState(
    "https://www.w3schools.com/html/mov_bbb.mp4"
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Multimedia</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <video controls src={mediaUrl} className="w-full rounded" />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <label className="block text-sm font-medium">URL Media</label>
          <input
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            className="w-full px-3 py-2 rounded border mt-2"
          />
          <p className="text-xs text-slate-400 mt-2">
            Preview video / audio / gambar di sini.
          </p>
        </div>
      </div>
    </div>
  );
}
