// app/ui/pays/pagination.tsx

'use client'

import Link from 'next/link'
import React from 'react'
import { generatePagination } from '@/app/lib/utils'

interface PaginationProps {
  totalPages: number
  currentPage: number
  query?: string
}

export default function Pagination({ totalPages, currentPage, query = '' }: PaginationProps) {
  const pages = generatePagination(currentPage, totalPages)

  if (totalPages <= 1) return null

  return (
    <nav className="inline-flex items-center space-x-1">
      {/* Previous Button */}
      <Link
        href={`/dashboard/pays?query=${encodeURIComponent(query)}&page=${Math.max(currentPage - 1, 1)}`}
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        aria-disabled={currentPage === 1}
      >
        Previous
      </Link>

      {/* Page Numbers */}
      {pages.map((page, idx) => (
        typeof page === 'number' ? (
          <Link
            key={idx}
            href={`/dashboard/pays?query=${encodeURIComponent(query)}&page=${page}`}
            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            {page}
          </Link>
        ) : (
          <span key={idx} className="px-3 py-1">...</span>
        )
      ))}

      {/* Next Button */}
      <Link
        href={`/dashboard/pays?query=${encodeURIComponent(query)}&page=${Math.min(currentPage + 1, totalPages)}`}
        className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Link>
    </nav>
  )
}
