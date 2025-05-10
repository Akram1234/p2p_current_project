import { useReducer } from "react";
import {formatCurrency} from './utils';
import {contacts, pays, activity} from "@/app/lib/placeholder-data";
import type { Activity } from './definitions'

const ITEMS_PER_PAGE = 6;
function getRandomMillis(max: number) {
  return Math.random() * max * 1000
}

export async function fetchActivity(): Promise<Activity[]> {
  try {
    // simulate latency
    await new Promise((r) => setTimeout(r, getRandomMillis(3)))

    const now = new Date()

    // build an array of the last 12 months, oldest first
    const result: Activity[] = []
    for (let i = 11; i >= 0; i--) {
      // monthOffset = how many months before now
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthLabel = d.toLocaleString('default', { month: 'short' })  // e.g. "May"
      const year       = d.getFullYear()
      const monthIndex = d.getMonth()

      // count pays whose date falls in this year & month
      const count = pays.reduce((sum, p) => {
        const pd = new Date(p.date)
        return pd.getFullYear() === year && pd.getMonth() === monthIndex
          ? sum + 1
          : sum
      }, 0)

      result.push({ month: monthLabel, activity: count })
    }

    return result
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch activity data.')
  }
}

export async function fetchLatestPays(count = 5) {
  try {
    await new Promise((resolve) => setTimeout(resolve, getRandomMillis(3)))
    console.log('ALL PAYS:', pays.length, pays.slice(-5));
  

    const recent= pays
      .sort((a, b) => Number(b.id) - Number(a.id))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count)
      .map((p) => {
        const receiver = contacts.find((c) => c.id === p.receiverId)
        return {
          id:        p.id,
          name:      receiver?.name      || '',
          email:     receiver?.email     || '',
          image_url: receiver?.image_url || '',
          amount:    formatCurrency(p.amount),
        }
      })
      return recent
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest pays.')
  }
}

export async function fetchCardData() {
  try {
    // simulate parallel fetches
    await Promise.all([
      new Promise((r) => setTimeout(r, getRandomMillis(3))),
      new Promise((r) => setTimeout(r, getRandomMillis(3))),
      new Promise((r) => setTimeout(r, getRandomMillis(3))),
    ])

    const numberOfPays     = pays.length
    const numberOfContacts = contacts.length
    const paidPays    = pays.reduce((sum, p) => (p.status === 'completed' ? sum + p.amount : sum), 0)
    const pendingPays = pays.reduce((sum, p) => (p.status === 'pending'   ? sum + p.amount : sum), 0)

    const totalPaidPays    = parseFloat(paidPays.toFixed(2))
    const totalPendingPays = parseFloat(pendingPays.toFixed(2))

    return {
      numberOfContacts,
      numberOfPays,
      totalPaidPays,
      totalPendingPays,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}

export async function fetchFilteredPays(query: string, currentPage: number) {
  try {
    await new Promise((resolve) => setTimeout(resolve, getRandomMillis(3)))

    const lcQuery = query.trim().toLowerCase()
    let filtered = pays.filter((p) => {
      const r = contacts.find((c) => c.id === p.receiverId)
      if (!r) return false
      return (
        r.name.toLowerCase().includes(lcQuery) ||
        r.email.toLowerCase().includes(lcQuery) ||
        (p.description ?? '').toLowerCase().includes(lcQuery)
      )
    })

    filtered.sort((a,b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    const pageSet = filtered.slice(offset, offset + ITEMS_PER_PAGE)

    return pageSet.map((p) => {
      const r = contacts.find((c) => c.id === p.receiverId)!
      return {
        id:         p.id,
        contact_id: r.id,
        name:       r.name,
        email:      r.email,
        image_url:  r.image_url,
        date:       p.date,
        amount:     p.amount,
        status:     p.status === 'completed' ? 'paid' : 'pending',
        description:p.description,
      }
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch pays.')
  }
}


export async function fetchPaysPages(query: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, getRandomMillis(3)))

    const lcQuery = query.trim().toLowerCase()
    const total = pays.filter((p) => {
      const r = contacts.find((c) => c.id === p.receiverId)
      if (!r) return false
      return (
        r.name.toLowerCase().includes(lcQuery) ||
        r.email.toLowerCase().includes(lcQuery) ||
        (p.description ?? '').toLowerCase().includes(lcQuery)
      )
    }).length

    return Math.ceil(total / ITEMS_PER_PAGE)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of pays.')
  }
}

export async function fetchPayById(id: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, getRandomMillis(3)))
    return pays.find((p) => p.id === id)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch pay.')
  }
}

export async function fetchContacts() {
  try {
    await new Promise((resolve) => setTimeout(resolve, getRandomMillis(3)))
    return contacts
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all contacts.')
  }
}

export async function fetchFilteredContacts(query: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, getRandomMillis(3)))

    const lcQuery = query.trim().toLowerCase()
    const filtered = contacts.filter((c) =>
      c.name.toLowerCase().includes(lcQuery) ||
      c.email.toLowerCase().includes(lcQuery)
    )

    return filtered.map((c) => {
      const related     = pays.filter((p) => p.receiverId === c.id)
      const total_pays   = related.length
      const total_paid   = related.filter((p) => p.status === 'completed').length
      const total_pending= related.filter((p) => p.status === 'pending').length

      return {
        id:            c.id,
        name:          c.name,
        email:         c.email,
        image_url:     c.image_url,
        total_pays,
        total_pending,
        total_paid,
      }
    })
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch contact table.')
  }
}