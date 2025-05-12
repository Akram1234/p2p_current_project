import Search from '@/app/ui/search'
import Table from '@/app/ui/pays/table'
import { CreatePay } from '@/app/ui/pays/buttons'
import { lusitana } from '@/app/ui/fonts'
import { PaysTableSkeleton } from '@/app/ui/skeletons'
import { fetchPaysPages } from '@/app/lib/data'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>
}) {
  const { query = '', page = '1' } = searchParams ? await searchParams : {}
  const currentPage = Number(page) || 1

  const totalPages = await fetchPaysPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pays</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search pays..." />
        <CreatePay />
      </div>

      {/* Table now includes its own pagination footer */}
      <Suspense key={query + currentPage} fallback={<PaysTableSkeleton />}>
        <Table
          query={query}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>

      {/* Show filters and table fields in one page */}
      {/* No additional wrapper needed—Table component now renders full columns: Contact, Email, Amount, Date, Status, Description, Actions */}

    </div>
  )
}
