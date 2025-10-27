import { useState } from "react";

export default function CodeRunnerPage() {
  const [code, setCode] = useState('// Contoh: console.log("Halo")');
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState<string>("");

  const run = () => {
    // IMPORTANT: Frontend-only apps cannot safely execute arbitrary server-side code.
    // This mock shows how a UI for code execution could look.
    // In production, send the code to a sandboxed backend service and display the response.
    if (language === "javascript") {
      try {
        // eslint-disable-next-line no-eval
        // WARNING: eval is dangerous. This is only a demo and should NOT be used in production.
        // We'll sandbox by capturing console.log
        let logs: string[] = [];
        // tslint:disable-next-line: no-console
        const original = console.log;
        // @ts-ignore
        console.log = (...args: any[]) => logs.push(args.join(" "));
        // @ts-ignore
        eval(code);
        // @ts-ignore
        console.log = original;
        setOutput(logs.join("\n") || "Tidak ada output");
      } catch (err: any) {
        setOutput(String(err));
      }
    } else {
      setOutput("Execution for this language must be handled on the server.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Perintah Eksekusi (Mock)</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-3 px-3 py-2 rounded border"
          >
            <option value="javascript">JavaScript (demo)</option>
            <option value="python">Python (server-side)</option>
          </select>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="w-full rounded-lg border p-3 font-mono text-sm"
          />

          <div className="mt-3 flex gap-2">
            <button
              onClick={run}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Jalankan
            </button>
            <button
              onClick={() => setOutput("")}
              className="px-4 py-2 border rounded"
            >
              Bersihkan Output
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Output</h3>
          <pre className="text-sm font-mono text-slate-700 whitespace-pre-wrap">
            {output}
          </pre>
          <p className="text-xs text-slate-400 mt-3">
            Catatan: Eksekusi aman untuk bahasa non-JavaScript harus dilakukan
            di backend yang ter-sandbox.
          </p>
        </div>
      </div>
    </div>
  );
}
