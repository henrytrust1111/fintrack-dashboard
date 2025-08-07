import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const summaryData = [
  {
    title: 'Total Balance',
    value: '$12,345',
    change: '+5%',
    positive: true,
  },
  {
    title: 'Total Credits',
    value: '$7,890',
    change: '+3%',
    positive: true,
  },
  {
    title: 'Total Debits',
    value: '$4,455',
    change: '-2%',
    positive: false,
  },
  {
    title: 'Transactions',
    value: '150',
    change: '+10%',
    positive: true,
  },
]

export default function SummaryCards() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <Card key={index} className="bg-[#34616f1e] border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {item.title}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className={`text-xs ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                {item.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
