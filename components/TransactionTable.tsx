"use client"

import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import EmptyState from './EmptyState'

interface Transaction {
  id: string
  date: string
  remark: string
  amount: number
  currency: string
  type: 'Credit' | 'Debit'
}

const sampleTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01', remark: 'Salary', amount: 3000, currency: 'USD', type: 'Credit' },
  { id: '2', date: '2023-10-02', remark: 'Groceries', amount: -150, currency: 'USD', type: 'Debit' },
  { id: '3', date: '2023-10-03', remark: 'Gym Membership', amount: -50, currency: 'USD', type: 'Debit' },
  { id: '4', date: '2023-10-04', remark: 'Dinner', amount: -40, currency: 'USD', type: 'Debit' },
  { id: '5', date: '2023-10-05', remark: 'Movie Tickets', amount: -30, currency: 'USD', type: 'Debit' },
  { id: '6', date: '2023-10-06', remark: 'Rent', amount: -1200, currency: 'USD', type: 'Debit' },
  { id: '7', date: '2023-10-07', remark: 'Utilities', amount: -100, currency: 'USD', type: 'Debit' },
  { id: '8', date: '2023-10-08', remark: 'Car Payment', amount: -400, currency: 'USD', type: 'Debit' },
  { id: '9', date: '2023-10-09', remark: 'Insurance', amount: -200, currency: 'USD', type: 'Debit' },
]

type SortField = 'date' | 'remark' | 'amount' | 'currency' | 'type'
type SortDirection = 'asc' | 'desc'

interface TransactionTableProps {
  searchQuery: string
}

export default function TransactionTable({ searchQuery }: TransactionTableProps) {
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  // Filter transactions based on search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return sampleTransactions

    const query = searchQuery.toLowerCase().trim()
    return sampleTransactions.filter((transaction) => {
      return (
        transaction.remark.toLowerCase().includes(query) ||
        transaction.type.toLowerCase().includes(query) ||
        transaction.currency.toLowerCase().includes(query) ||
        Math.abs(transaction.amount).toString().includes(query) ||
        transaction.date.includes(query)
      )
    })
  }, [searchQuery])

  // Sort filtered transactions
  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'date') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (sortField === 'amount') {
        aValue = Math.abs(aValue)
        bValue = Math.abs(bValue)
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredTransactions, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      className="h-auto p-0 font-medium text-left justify-start hover:bg-transparent"
      onClick={() => handleSort(field)}
    >
      <span className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
        )}
      </span>
    </Button>
  )

  const formatAmount = (amount: number) => {
    return amount >= 0 ? `$${amount.toLocaleString()}` : `-$${Math.abs(amount).toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // Show empty state if no transactions after filtering
  if (sortedTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <EmptyState searchQuery={searchQuery} type="search" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {searchQuery && (
        <div className="px-4 py-3 bg-blue-50 border-b border-gray-200">
          <p className="text-sm text-blue-700">
            Showing {sortedTransactions.length} result{sortedTransactions.length !== 1 ? 's' : ''} for{' '}
            <span className="font-medium">"{searchQuery}"</span>
          </p>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-32">
                <SortButton field="date">Date</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="remark">Remark</SortButton>
              </TableHead>
              <TableHead className="text-right">
                <SortButton field="amount">Amount</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="currency">Currency</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="type">Type</SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell>{transaction.remark}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatAmount(transaction.amount)}
                </TableCell>
                <TableCell>{transaction.currency}</TableCell>
                <TableCell>
                  <div className="w-[74px] h-[28px] flex items-center justify-center bg-[#34616f1e] p-2 rounded-3xl gap-2">
                    <div
                      className={`w-[6px] h-[6px] rounded-full ${
                        transaction.type === 'Credit' ? 'bg-green-500' : 'bg-[#C6381B]'
                      }`}
                    />
                    <span className={transaction.type === 'Credit' ? 'text-[#1B2528]' : 'text-[#1B2528]'}>
                      {transaction.type}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
