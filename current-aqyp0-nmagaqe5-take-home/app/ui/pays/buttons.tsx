import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePay ,updatePay} from '@/app/lib/actions'
export function CreatePay() {
  return (
    <Link
      href="/dashboard/pays/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Pay</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

interface ButtonProps {
  id: string
}

export function UpdatePay({ id }: ButtonProps) {
  return (
    <Link
     href={`/dashboard/pays/${id}/edit`}
     className="text-gray-600 hover:text-gray-800"
     aria-label="Edit payment"
  >
     <PencilIcon className="h-5 w-5" />
    </Link>
 )
}


export function DeletePay({ id }: ButtonProps) {
  return (
    <form action={deletePay} method="post">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-800"
        aria-label="Delete payment"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </form>
  )
}
