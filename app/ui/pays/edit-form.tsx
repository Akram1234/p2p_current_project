'use client'

import { ContactField, PayForm } from '@/app/lib/definitions'
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Button } from '@/app/ui/button'
import { updatePay } from '@/app/lib/actions'

export default function EditPayForm({
  pay,
  contacts,
}: {
  pay: PayForm
  contacts: ContactField[]
}) {
  return (
    <form action={updatePay} method="post" className="space-y-6">
      {/* Hidden fields: id and sender */}
      <input type="hidden" name="id" value={pay.id} />
      <input type="hidden" name="senderId" value={pay.senderId} />

      <div className="rounded-md bg-gray-50 p-4 md:p-6 space-y-4">
        {/* Recipient */}
        <div>
          <label htmlFor="receiverId" className="block text-sm font-medium mb-1">
            Choose recipient
          </label>
          <div className="relative">
            <select
              id="receiverId"
              name="receiverId"
              required
              defaultValue={pay.receiverId}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>
                Select a contact
              </option>
              {contacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount (USD)
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              required
              defaultValue={pay.amount}
              placeholder="0.00"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date & Time
          </label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            required
            defaultValue={(() => {
              const d = new Date(pay.date)
              const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
              return local.toISOString().slice(0, 16)
            })()}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            defaultValue={pay.description || ''}
            placeholder="e.g. Rent, Utilities, Dinner..."
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
          />
        </div>

        {/* Status */}
        <fieldset>
          <legend className="block text-sm font-medium mb-1">Status</legend>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked={pay.status === 'pending'}
                className="h-4 w-4 text-gray-600 focus:ring-2"
              />
              <span className="ml-2 flex items-center gap-1 text-sm font-medium bg-gray-100 px-3 py-1.5 rounded-full">
                Pending <ClockIcon className="h-4 w-4" />
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value="completed"
                defaultChecked={pay.status === 'completed'}
                className="h-4 w-4 text-gray-600 focus:ring-2"
              />
              <span className="ml-2 flex items-center gap-1 text-sm font-medium bg-green-500 text-white px-3 py-1.5 rounded-full">
                Completed <CheckIcon className="h-4 w-4" />
              </span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/pays"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}
