import { Search, FileX } from 'lucide-react'

interface EmptyStateProps {
  searchQuery?: string
  type?: 'search' | 'no-data'
}

export default function EmptyState({ searchQuery, type = 'search' }: EmptyStateProps) {
  if (type === 'search') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500 text-center max-w-md">
          {searchQuery ? (
            <>
              We couldn't find any transactions matching{' '}
              <span className="font-medium text-gray-900">"{searchQuery}"</span>. 
              Try adjusting your search terms.
            </>
          ) : (
            "No transactions match your search criteria. Try different keywords."
          )}
        </p>
        <div className="mt-4 text-sm text-gray-400">
          <p>Search by transaction remark, amount, or type</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FileX className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
      <p className="text-gray-500 text-center max-w-md">
        When you start making transactions, they'll appear here.
      </p>
    </div>
  )
}
