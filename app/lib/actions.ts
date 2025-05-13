'use server'                    

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { pays } from './placeholder-data'
import type { Pay } from './definitions'
import { redirect } from 'next/navigation'


const FormSchema = z.object({
  senderId:    z.string(),
  receiverId:  z.string(),
  amount:      z.coerce.number(),
  date:        z.string(),                    
  status:      z.enum(['completed','pending','failed']),
  description: z.string().optional(),
})

export async function createPay(formData: FormData) {
  try {
    const { senderId, receiverId, amount, date, status, description } = FormSchema.parse({
      senderId:    formData.get('senderId'),
      receiverId:  formData.get('receiverId'),
      amount:      formData.get('amount'),
      date:        formData.get('date'),
      status:      formData.get('status'),
      description: formData.get('description'),
    })

    let finalDate = date
    if (date.endsWith('T00:00:00.000Z')) {
      finalDate = new Date().toISOString() // Replace with the current timestamp
    }
    const newPay: Pay = {
      id:          String(pays.length + 1),
      senderId,
      receiverId,
      amount,
      date:         finalDate,
      status,
      description,
    }
    pays.push(newPay)

    revalidatePath('/dashboard/pays')
    revalidatePath('/dashboard')
  } catch (error) {
    console.error('CreatePay Error:', error)
    throw error
  }
}
export async function deletePay(formData: FormData) {
  const id = formData.get('id') as string
  const index = pays.findIndex((p) => p.id === id)
  if (index !== -1) {
    pays.splice(index, 1)
  }

  revalidatePath('/dashboard/pays')
  revalidatePath('/dashboard')
  redirect('/dashboard/pays')
}

export async function updatePay(formData: FormData) {
  const id          = formData.get('id') as string
  const receiverId  = formData.get('receiverId') as string
  const amount      = parseFloat(formData.get('amount') as string)
  const dateStr     = formData.get('date') as string
  const status      = formData.get('status') as string
  const description = formData.get('description') as string | null

  const pay = pays.find((p) => p.id === id)
  if (pay) {
    pay.receiverId  = receiverId
    pay.amount      = amount
    pay.date        = new Date(dateStr).toISOString()
    pay.status      = status as 'completed' | 'pending' | 'failed'
    pay.description = description || undefined
  }

  revalidatePath('/dashboard/pays')
  revalidatePath('/dashboard')
  redirect('/dashboard/pays')
}
