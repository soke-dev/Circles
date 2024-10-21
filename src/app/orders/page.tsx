import { Avatar } from 'src/components/avatar'
import { Button } from 'src/components/button'
import { Heading } from 'src/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/table'
import type { Metadata } from 'next'
import { getOrders } from '../data'

export const metadata: Metadata = {
  title: 'Orders',
}

export default async function Orders() {
  let orders = await getOrders()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Transactions History</Heading>
        <Button className="-my-0.5">Create order</Button>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Joined Date</TableHeader>
            <TableHeader>Name</TableHeader>
            {/* <TableHeader>Saved</TableHeader> */}
            <TableHeader className="text-right">Amount Saved</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              {/* <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell> */}
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
