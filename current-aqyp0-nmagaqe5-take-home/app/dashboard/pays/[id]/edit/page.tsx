// app/dashboard/pays/[id]/edit/page.tsx

import Breadcrumbs from '@/app/ui/pays/breadcrumbs'
import EditPayForm from '@/app/ui/pays/edit-form'
import { fetchPayById, fetchContacts } from '@/app/lib/data'

// Dynamic edit page for a specific pay
export default async function Page({ params }: any) {
  const { id } = params
  const [pay, contacts] = await Promise.all([
    fetchPayById(id),
    fetchContacts(),
  ])

  if (!pay) {
    return <p className="p-4">Payment not found.</p>
  }

  return (
    <main className="p-6 space-y-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pays', href: '/dashboard/pays' },
          { label: 'Edit Pay', href: `/dashboard/pays/${id}/edit`, active: true },
        ]}
      />

      <section>
        <h1 className="text-2xl font-semibold">Edit Payment</h1>
        <EditPayForm pay={pay} contacts={contacts} />
      </section>
    </main>
  )
}
