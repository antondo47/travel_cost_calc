'use client';

import { ActivitySuggestion } from '@/types';

interface ActivitiesPanelProps {
  activities: ActivitySuggestion[];
  totalBudgetUSD?: number;
}

export default function ActivitiesPanel({ activities, totalBudgetUSD }: ActivitiesPanelProps) {
  if (activities.length === 0) return null;

  const totalEstimated = activities.reduce((sum, a) => sum + a.estimatedTotalCostUSD, 0);
  const withinBudget = totalBudgetUSD === undefined || totalEstimated <= totalBudgetUSD;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">🎯 Suggested Activities</h2>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total estimate</p>
          <p className={`text-base font-bold ${withinBudget ? 'text-green-600' : 'text-amber-600'}`}>
            ${totalEstimated.toFixed(0)}
            {totalBudgetUSD && (
              <span className="text-xs font-normal text-gray-400 ml-1">/ ${totalBudgetUSD} budget</span>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900 truncate">{activity.name}</p>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">${activity.estimatedTotalCostUSD.toFixed(0)}</p>
                  <p className="text-xs text-gray-400">${activity.estimatedCostPerPersonUSD.toFixed(0)}/person</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{activity.notes}</p>
              <p className="text-xs text-gray-400 mt-0.5">⏱ {activity.durationHours}h</p>
            </div>
          </div>
        ))}
      </div>

      {!withinBudget && (
        <p className="mt-3 text-xs text-amber-600 italic">
          ⚠️ Total exceeds your activity budget by ${(totalEstimated - (totalBudgetUSD ?? 0)).toFixed(0)}
        </p>
      )}
    </section>
  );
}
