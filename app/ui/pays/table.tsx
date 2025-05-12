export const dynamic = 'force-dynamic'; 

import Image from 'next/image'
import Link from 'next/link'
import { UpdatePay, DeletePay } from '@/app/ui/pays/buttons'
import { fetchFilteredPays } from '@/app/lib/data'
import { formatCurrency } from '@/app/lib/utils'
import { Console } from 'console';

export interface PaysTableRow {
  id: string
  contact_id: string
  name: string
  email: string
  image_url: string
  date: string
  amount: number
  status: 'paid' | 'pending'
  description?: string
}

export default async function PaysTable({
  query,
  currentPage,
  totalPages,
}: {
  query: string
  currentPage: number
  totalPages?: number
}) {
  const raw = await fetchFilteredPays(query, currentPage)
  raw.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const pays: PaysTableRow[] = raw.map((p) => ({
    id:          p.id,
    contact_id:  p.contact_id,
    name:        p.name,
    email:       p.email,
    image_url:   p.image_url,
    date:        p.date,
    amount:      p.amount,
    status:      p.status as 'paid' | 'pending',
    description: p.description,
  }))
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile List View */}
          <div className="md:hidden space-y-4">
            {pays.map((pay) => (
              <div key={pay.id} className="w-full rounded-md bg-white p-4 shadow">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Image
                        src={pay.image_url}
                        width={28}
                        height={28}
                        alt={`${pay.name}'s profile picture`}
                        className="rounded-full"
                      />
                      <p className="font-medium">{pay.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{pay.email}</p>
                  </div>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div><strong>Amount:</strong> {formatCurrency(pay.amount)}</div>
                  <div><strong>Date:</strong> {new Date(pay.date).toLocaleDateString()}</div>
                  <div><strong>Status:</strong> {pay.status}</div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <UpdatePay id={pay.id} />
                  <DeletePay id={pay.id} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg bg-gray-100 text-left text-sm font-medium">
              <tr>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pays.map((pay) => (
                <tr key={pay.id} className="border-b last:border-none text-sm">
                  <td className="whitespace-nowrap px-4 py-3 flex items-center gap-2">
                    <Image
                      src={pay.image_url}
                      width={28}
                      height={28}
                      alt={`${pay.name}'s profile picture`}
                      className="rounded-full"
                    />
                    <span>{pay.name}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{pay.email}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">{formatCurrency(pay.amount)}</td>
                  <td className="whitespace-nowrap px-4 py-3">{new Date(pay.date).toLocaleDateString()}</td>
                  <td className="whitespace-nowrap px-4 py-3 capitalize">{pay.status}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center flex justify-center gap-2">
                    <UpdatePay id={pay.id} />
                    <DeletePay id={pay.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls: only Previous, current page, Next */}
          {totalPages && (
            <div className="mt-4 flex justify-center items-center gap-4">
              <Link
                href={`/dashboard/pays?query=${encodeURIComponent(query)}&page=${Math.max(
                  currentPage - 1,
                  1
                )}`}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                aria-disabled={currentPage === 1}
              >
                Previous
              </Link>

              <span className="text-sm font-medium">
                {currentPage} of {totalPages}
              </span>

              <Link
                href={`/dashboard/pays?query=${encodeURIComponent(query)}&page=${Math.min(
                  currentPage + 1,
                  totalPages
                )}`}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                aria-disabled={currentPage === totalPages}
              >
                Next
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
