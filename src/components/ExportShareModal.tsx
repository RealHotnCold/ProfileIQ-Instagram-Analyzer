import React, { useState } from 'react';
import { BusinessIntelligenceResult } from '../types';
import { 
  X, 
  Copy, 
  Download, 
  Check, 
  FileText, 
  Code, 
  Table, 
  Printer, 
  Share2 
} from 'lucide-react';

interface ExportShareModalProps {
  report: BusinessIntelligenceResult;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportShareModal: React.FC<ExportShareModalProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  const [activeFormat, setActiveFormat] = useState<'markdown' | 'json' | 'csv'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate Markdown Executive Dossier
  const generateMarkdown = () => {
    return `# PROFILEIQ INTELLIGENCE DOSSIER
Target: ${report.profile.display_name.value} (@${report.profile.handle})
Generated: ${new Date(report.created_at).toLocaleString()}
Engine: Google Gemini Flash | Status: ${report.status.toUpperCase()}

---

## 1. PROFILE IDENTITY & EXECUTIVE SUMMARY
- **Business Name**: ${report.business.name}
- **Primary Category**: ${report.business.category}
- **Subcategory**: ${report.business.subcategory}
- **Website**: ${report.profile.website.value} (${report.profile.website.basis})
- **Location**: ${report.profile.location?.value || 'Global / Unspecified'}

### Instagram Bio:
${report.profile.bio.value}

### Executive Synthesis:
${report.business.detailed_description}

---

## 2. BUSINESS SIGNAL STRENGTH
- **Product Clarity**: ${report.business_signals.product_clarity_score}/100
- **Service Clarity**: ${report.business_signals.service_clarity_score}/100
- **Brand Positioning**: ${report.business_signals.brand_positioning_score}/100
- **Content Evidence**: ${report.business_signals.content_evidence_score}/100
- **Overall Evidence Quality**: ${report.business_signals.overall_evidence_quality_score}/100

---

## 3. COMMERCIAL CATALOG & OFFERINGS
${report.products.map((p, idx) => `
### Product ${idx + 1}: ${p.name}
- **Description**: ${p.description}
${p.price_indicator ? `- **Price**: ${p.price_indicator}` : ''}
- **Basis**: ${p.basis} (Confidence: ${p.confidence}%)
${p.evidence ? `- **Evidence**: "${p.evidence}"` : ''}
`).join('\n')}

${report.services.map((s, idx) => `
### Service ${idx + 1}: ${s.name}
- **Description**: ${s.description}
- **Basis**: ${s.basis} (Confidence: ${s.confidence}%)
${s.evidence ? `- **Evidence**: "${s.evidence}"` : ''}
`).join('\n')}

---

## 4. BRAND POSITIONING & ARCHETYPE
- **Positioning Statement**: ${report.brand_positioning.statement}
- **Brand Archetype**: ${report.brand_positioning.archetype || 'N/A'}
- **Tone of Voice**: ${report.brand_positioning.tone_of_voice?.join(', ') || 'N/A'}
- **Key Differentiators**:
${report.brand_positioning.differentiators.map(d => `  - ${d}`).join('\n')}

---

## 5. TARGET AUDIENCE SEGMENTS
${report.target_audience.map((a, i) => `
### Segment ${i + 1}: ${a.segment} (${a.basis} | Confidence: ${a.confidence}%)
- **Supporting Evidence**: ${a.supporting_evidence}
${a.pain_points && a.pain_points.length > 0 ? `- **Pain Points**: ${a.pain_points.join(', ')}` : ''}
${a.buying_triggers && a.buying_triggers.length > 0 ? `- **Buying Triggers**: ${a.buying_triggers.join(', ')}` : ''}
`).join('\n')}

---

## 6. CONTENT STRATEGY & THEMES
${report.content_intelligence.theme_distribution.map(t => `- **${t.theme}**: ${t.percentage}%`).join('\n')}

- **Keywords**: ${report.content_intelligence.keywords.join(', ')}
- **Hashtags**: ${report.content_intelligence.hashtags.join(' ')}

---

## 7. STRATEGIC AI ADVISORY
${report.insights.map((ins, i) => `
### Insight ${i + 1}: ${ins.headline} [${ins.impact} Impact]
- **Analysis**: ${ins.analysis}
- **Recommendation**: ${ins.actionable_recommendation}
`).join('\n')}

---

## 8. EVIDENCE INVENTORY (${report.evidence.length} CITATIONS)
| ID | Type | Field | Value | Source |
| :--- | :--- | :--- | :--- | :--- |
${report.evidence.map(e => `| ${e.id} | ${e.type} | ${e.field} | "${e.value.replace(/\|/g, '-').slice(0, 70)}..." | ${e.source_title} |`).join('\n')}

---

## 9. PIPELINE BOUNDARIES & LIMITATIONS
${report.limitations.map(l => `- **${l.limitationType || (l as any).limitation_type}**: ${l.description} (Impact: ${l.impactOnConfidence || (l as any).impact_on_confidence})`).join('\n')}
`;
  };

  // Generate CSV Summary
  const generateCSV = () => {
    let csv = "Section,Field,Value,Basis,Confidence\n";
    csv += `"Profile","Handle","@${report.profile.handle}","observed",100\n`;
    csv += `"Profile","Display Name","${report.profile.display_name.value}","${report.profile.display_name.basis}",${report.profile.display_name.confidence}\n`;
    csv += `"Business","Category","${report.business.category}","${report.business.basis}",${report.business.confidence}\n`;
    csv += `"Business","Subcategory","${report.business.subcategory}","${report.business.basis}",${report.business.confidence}\n`;
    
    report.products.forEach(p => {
      csv += `"Product","${p.name.replace(/"/g, '""')}","${p.description.replace(/"/g, '""')}","${p.basis}",${p.confidence}\n`;
    });

    report.evidence.forEach(e => {
      csv += `"Evidence","${e.field}","${e.value.replace(/"/g, '""')}","${e.type}",100\n`;
    });

    return csv;
  };

  const getExportText = () => {
    if (activeFormat === 'markdown') return generateMarkdown();
    if (activeFormat === 'csv') return generateCSV();
    return JSON.stringify(report, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeFormat === 'markdown' ? 'md' : activeFormat === 'csv' ? 'csv' : 'json';
    const mime = activeFormat === 'markdown' ? 'text/markdown' : activeFormat === 'csv' ? 'text/csv' : 'application/json';
    const blob = new Blob([getExportText()], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profileiq-dossier-${report.profile.handle || 'intelligence'}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-slate-800">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Export Intelligence Dossier</h3>
              <p className="text-xs text-slate-500">Target: @{report.profile.handle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs">
          <div className="flex space-x-1.5">
            <button
              onClick={() => setActiveFormat('markdown')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-medium transition ${
                activeFormat === 'markdown'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown Brief</span>
            </button>

            <button
              onClick={() => setActiveFormat('json')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-medium transition ${
                activeFormat === 'json'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Full JSON Schema</span>
            </button>

            <button
              onClick={() => setActiveFormat('csv')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-medium transition ${
                activeFormat === 'csv'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>CSV Spreadsheet</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition shadow-xs"
              title="Print Dossier"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="p-4 flex-1 overflow-y-auto bg-slate-50 font-mono text-xs text-slate-800">
          <pre className="whitespace-pre-wrap leading-relaxed">
            {getExportText()}
          </pre>
        </div>
      </div>
    </div>
  );
};
