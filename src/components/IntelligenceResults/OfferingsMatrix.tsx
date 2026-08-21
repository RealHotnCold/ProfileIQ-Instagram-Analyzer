import React from 'react';
import { BusinessIntelligenceResult } from '../../types';
import { BasisBadge } from './BasisBadge';
import { ShoppingBag, Briefcase, Tag, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

interface OfferingsMatrixProps {
  products: BusinessIntelligenceResult['products'];
  services: BusinessIntelligenceResult['services'];
}

export const OfferingsMatrix: React.FC<OfferingsMatrixProps> = ({ products, services }) => {
  const hasOfferings = products.length > 0 || services.length > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Commercial Offerings & Product/Service Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Identified physical goods, digital products, and billable services
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {products.length} Products • {services.length} Services
        </div>
      </div>

      {!hasOfferings ? (
        <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h4 className="font-bold text-xs text-slate-900">
            No Direct Commercial Catalog Detected
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Insufficient public product or service signals were identified in the verified web footprint.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column 1: Products */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
                Physical & Digital Products ({products.length})
              </span>
            </div>

            {products.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400 italic">
                No distinct standalone products identified.
              </div>
            ) : (
              <div className="space-y-3">
                {products.map(prod => (
                  <div
                    key={prod.id}
                    className="p-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl space-y-2 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-xs text-slate-900">
                        {prod.name}
                      </div>
                      
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {prod.price_indicator && (
                          <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            {prod.price_indicator}
                          </span>
                        )}
                        <BasisBadge basis={prod.basis} showIcon={false} className="text-[9px]" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prod.description}
                    </p>

                    {prod.evidence && (
                      <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-start gap-1">
                        <span className="font-semibold text-slate-600 flex-shrink-0">Evidence:</span>
                        <span className="italic">{prod.evidence}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                Service & Consultation Offerings ({services.length})
              </span>
            </div>

            {services.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400 italic">
                No service offerings identified.
              </div>
            ) : (
              <div className="space-y-3">
                {services.map(serv => (
                  <div
                    key={serv.id}
                    className="p-4 bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl space-y-2 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-xs text-slate-900">
                        {serv.name}
                      </div>

                      <BasisBadge basis={serv.basis} showIcon={false} className="text-[9px]" />
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {serv.description}
                    </p>

                    {serv.evidence && (
                      <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-start gap-1">
                        <span className="font-semibold text-slate-600 flex-shrink-0">Evidence:</span>
                        <span className="italic">{serv.evidence}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
