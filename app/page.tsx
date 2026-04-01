import JsonEditor from '@/components/JsonEditor';

export const metadata = {
  title: 'JSON Formatter AI — Format, Validate & Explain JSON with AI',
  description: 'Free online JSON formatter with AI-powered explanations and JSON Schema generation. Format, minify, validate, and understand any JSON instantly.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Nav */}
      <header className="border-b border-slate-800/50 bg-[#0a0e1a]/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white leading-none">
              <span className="text-indigo-400">{ }</span> JSON Formatter AI
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Free · No signup · Instant</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-full font-medium">Free</span>
            <span className="px-3 py-1.5 bg-slate-800 text-slate-400 text-xs rounded-full">Powered by GPT-4o-mini</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-900/30 border border-indigo-700/40 rounded-full text-xs text-indigo-300 mb-6">
          🤖 Now with AI — understand any JSON in seconds
        </div>
        <h2 className="text-4xl font-bold mb-4 leading-tight">
          JSON,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Explained by AI
          </span>
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Paste any JSON — format it, validate it, get a JSON Schema, or have AI explain it in plain English.
        </p>
      </section>

      {/* Tool */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <JsonEditor />
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🔍', title: 'JSON Validator', desc: 'Instant validation with clear error messages. Know exactly what went wrong and where.' },
            { icon: '🤖', title: 'AI Explanations', desc: "Don't understand an API response? Get a plain-English breakdown of any JSON structure instantly." },
            { icon: '📐', title: 'JSON Schema', desc: 'Auto-derive JSON Schema (Draft-07) from your data. Perfect for documentation and type generation.' },
            { icon: '⚡', title: 'Instant Format', desc: 'One-click JSON formatting with proper indentation. Paste, click, copy — done.' },
            { icon: '📦', title: 'Minify JSON', desc: 'Compress JSON to its smallest form. Remove all whitespace for efficient data transmission.' },
            { icon: '🔒', title: '100% Private', desc: 'Your JSON is processed and discarded immediately. We never store your data.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="text-white font-semibold mb-1.5">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / SEO */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { q: 'What is JSON?', a: 'JSON (JavaScript Object Notation) is a lightweight data format used to store and exchange data. It is easy for humans to read and write, and easy for machines to parse and generate.' },
            { q: 'Why use an online JSON formatter?', a: 'Online JSON formatters help developers debug, pretty-print, and validate JSON data. Our tool goes further with AI-powered explanations for JSON newcomers.' },
            { q: 'Is my data stored?', a: 'No. Your JSON is processed in real-time and never stored on any server. Once you close the page, your data is gone.' },
          ].map(({ q, a }) => (
            <div key={q} className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
              <h4 className="text-white font-medium mb-2">{q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-xs">
        <p>JSON Formatter AI — Free online JSON tools powered by AI.</p>
      </footer>
    </main>
  );
}
