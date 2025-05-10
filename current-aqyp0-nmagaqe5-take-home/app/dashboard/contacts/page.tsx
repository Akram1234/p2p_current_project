import Table from '@/app/ui/contacts/table'
import { PaysTableSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'

type SearchParams = { query?: string }

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams | Promise<SearchParams>
}) {
  const { query = '' } = await searchParams

  return (
    <div className="w-full">
      <Suspense key={query} fallback={<PaysTableSkeleton />}>
        <Table query={query} />
      </Suspense>
    </div>
  )
}
