'use client';

import { useState } from 'react';

type Tab = 'format' | 'minify' | 'validate' | 'schema' | 'ai';

export default function JsonEditor() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('format');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'format', label: 'Format' },
    { id: 'minify', label: 'Minify' },
    { id: 'validate', label: 'Validate' },
    { id: 'schema', label: 'JSON Schema' },
    { id: 'ai', label: 'AI Explain' },
  ];

  const doAction = async (action: string) => {
    setError('');
    setOutput('');
    setAiResponse('');

    if (action !== 'ai' && action !== 'schema') {
      try {
        const parsed = JSON.parse(input);
        if (action === 'format') setOutput(JSON.stringify(parsed, null, 2));
        if (action === 'minify') setOutput(JSON.stringify(parsed));
        if (action === 'validate') setOutput('✅ Valid JSON');
      } catch (e: unknown) {
        setError(`❌ Invalid JSON: ${(e as Error).message}`);
      }
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: input }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      if (action === 'schema') setOutput(JSON.stringify(data.schema, null, 2));
      if (action === 'ai') setAiResponse(data.explanation);
    } catch {
      setError('Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-900/80 rounded-xl p-1 border border-slate-800">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); setOutput(''); setError(''); setAiResponse(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Paste JSON here... e.g. {"name": "Alice", "age": 30}'
        className="w-full h-44 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-y mb-4"
      />

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-300 text-sm font-mono">
          {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500 font-medium">Output</span>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              📋 Copy
            </button>
          </div>
          <pre className="w-full h-64 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm font-mono text-slate-300 overflow-auto">
            {output}
          </pre>
        </div>
      )}

      {/* AI Response */}
      {activeTab === 'ai' && aiResponse && (
        <div className="mb-4">
          <span className="text-xs text-indigo-400 font-medium mb-2 block">🤖 AI Explanation</span>
          <div className="w-full p-6 bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-700/40 rounded-xl text-slate-200 text-sm leading-relaxed">
            {aiResponse}
          </div>
        </div>
      )}

      {/* Empty state */}
      {activeTab === 'ai' && !aiResponse && !loading && (
        <div className="p-8 text-center text-slate-600 text-sm border border-dashed border-slate-700 rounded-xl mb-4">
          Paste JSON and click <strong className="text-indigo-400">Explain with AI</strong> for a plain-English breakdown.
        </div>
      )}

      {/* Action button */}
      <button
        onClick={() => doAction(activeTab)}
        disabled={loading || (!input.trim() && (activeTab === 'format' || activeTab === 'minify'))}
        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-all"
      >
        {loading ? '🤖 Thinking...' : tabs.find((t) => t.id === activeTab)?.label + ' →'}
      </button>
    </div>
  );
}
