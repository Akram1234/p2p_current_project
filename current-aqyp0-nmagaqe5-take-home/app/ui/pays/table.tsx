// app/ui/pays/table.tsx

'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UpdatePay, DeletePay } from '@/app/ui/pays/buttons'
import { fetchFilteredPays } from '@/app/lib/data'
import { formatCurrency } from '@/app/lib/utils'

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

export default function PaysTable({
  query,
  currentPage,
  totalPages,
}: {
  query: string
  currentPage: number
  totalPages?: number
}) {
  const [pays, setPays] = useState<PaysTableRow[]>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    setLoading(true)
    fetchFilteredPays(query, currentPage)
      .then((data: PaysTableRow[]) => {
        let filtered = data
        // apply date filters
        if (startDate) {
          const start = new Date(startDate)
          filtered = filtered.filter((p) => new Date(p.date) >= start)
        }
        if (endDate) {
          const end = new Date(endDate)
          filtered = filtered.filter((p) => new Date(p.date) <= end)
        }
        // sort by date
        filtered.sort((a, b) => {
          const da = new Date(a.date).getTime()
          const db = new Date(b.date).getTime()
          return sortOrder === 'asc' ? da - db : db - da
        })
        setPays(filtered)
      })
      .finally(() => setLoading(false))
  }, [query, currentPage, startDate, endDate, sortOrder])

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Loading...</p>
  }

  return (
    <div className="mt-6 flow-root">
      {/* Filters */}
      <div className="flex flex-col gap-4 px-4 mb-4">
        <div className="flex flex-wrap gap-4">
          {/* Date From */}
          <div>
            <label className="block text-sm font-medium">
              From:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block rounded-md border-gray-300 shadow-sm"
              />
            </label>
          </div>
          {/* Date To */}
          <div>
            <label className="block text-sm font-medium">
              To:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block rounded-md border-gray-300 shadow-sm"
              />
            </label>
          </div>
          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium">
              Sort by Date:
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="mt-1 block rounded-md border-gray-300 shadow-sm"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </label>
          </div>
        </div>
      </div>

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
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {formatCurrency(pay.amount)}
                  </td>
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

          {/* Pagination Controls */}
          {totalPages && (
            <div className="mt-4 flex justify-center items-center gap-2">
              <Link
                href={`?query=${encodeURIComponent(query)}&page=${currentPage - 1}`}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                aria-disabled={currentPage === 1}
              >Previous</Link>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`?query=${encodeURIComponent(query)}&page=${page}`}
                  className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >{page}</Link>
              ))}

              <Link
                href={`?query=${encodeURIComponent(query)}&page=${currentPage + 1}`}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                aria-disabled={currentPage === totalPages}
              >Next</Link>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
