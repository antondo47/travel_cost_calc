'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TripSearchSchema, TripCost, APIError } from '@/types';

// Use the Zod *input* type for the form (children is optional), not the output type
type FormValues = z.input<typeof TripSearchSchema>;

interface SearchFormProps {
  onResults: (data: TripCost) => void;
  onLoading: (loading: boolean) => void;
  onError: (message: string) => void;
}

export default function SearchForm({ onResults, onLoading, onError }: SearchFormProps) {
  const today = new Date();
  const defaultDeparture = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const defaultReturn = new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(TripSearchSchema),
    defaultValues: {
      origin: 'MSP',
      destination: 'JFK',
      departureDate: defaultDeparture,
      returnDate: defaultReturn,
      adults: 2,
      children: 0,
      activityTypes: '',
      activityBudgetUSD: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    onLoading(true);
    onError('');
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        const err = json as APIError;
        const detail = err.details ? ` — ${err.details}` : '';
        onError((err.error ?? 'Something went wrong. Please try again.') + detail);
      } else {
        onResults(json as TripCost);
      }
    } catch {
      onError('Network error. Please check your connection and try again.');
    } finally {
      onLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From (IATA code)
          </label>
          <input
            {...register('origin')}
            placeholder="MSP"
            maxLength={3}
            onChange={(e) => setValue('origin', e.target.value.toUpperCase())}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.origin && (
            <p className="text-red-500 text-xs mt-1">{errors.origin.message}</p>
          )}
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To (IATA code)
          </label>
          <input
            {...register('destination')}
            placeholder="JFK"
            maxLength={3}
            onChange={(e) => setValue('destination', e.target.value.toUpperCase())}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.destination && (
            <p className="text-red-500 text-xs mt-1">{errors.destination.message}</p>
          )}
        </div>

        {/* Departure date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departure date
          </label>
          <input
            {...register('departureDate')}
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.departureDate && (
            <p className="text-red-500 text-xs mt-1">{errors.departureDate.message}</p>
          )}
        </div>

        {/* Return date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Return date
          </label>
          <input
            {...register('returnDate')}
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.returnDate && (
            <p className="text-red-500 text-xs mt-1">{errors.returnDate.message}</p>
          )}
        </div>

        {/* Adults */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adults
          </label>
          <input
            {...register('adults', { valueAsNumber: true })}
            type="number"
            min={1}
            max={9}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.adults && (
            <p className="text-red-500 text-xs mt-1">{errors.adults.message}</p>
          )}
        </div>

        {/* Children */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Children
          </label>
          <input
            {...register('children', { valueAsNumber: true })}
            type="number"
            min={0}
            max={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Activity preferences (optional) */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Activities (optional)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What do you want to do?
            </label>
            <input
              {...register('activityTypes')}
              placeholder="museums, food tours, hiking"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">Comma-separated, e.g. museums, food, hiking</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity budget (USD)
            </label>
            <input
              {...register('activityBudgetUSD', { valueAsNumber: true })}
              type="number"
              min={1}
              placeholder="e.g. 300"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
      >
        {isSubmitting ? 'Calculating...' : 'Calculate Trip Cost'}
      </button>
    </form>
  );
}
