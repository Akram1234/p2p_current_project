import Table from '@/app/ui/contacts/table'
import { PaysTableSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>
}) {
  const { query = '' } = searchParams ? await searchParams : {}

  return (
    <div className="w-full">
      <Suspense key={query} fallback={<PaysTableSkeleton />}>
        <Table query={query} />
      </Suspense>
    </div>
  )
}
