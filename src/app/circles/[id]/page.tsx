import DepositFunds from '@/components/deposit'
import { getCircle } from '@/lib/circle'
import WalletProvider from '@/providers/walletProvider'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Heading, Subheading } from 'src/components/heading'
import { Link } from 'src/components/link'
import { Table, TableBody, TableHead, TableHeader, TableRow } from 'src/components/table'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let circle = await getCircle(params.id)

  return {
    title: circle?.id,
    description: circle?.description,
  }
}

export default async function CirclePage({ params }: { params: { id: string } }) {
  let circle = await getCircle(params.id)


  if (!circle) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Circles
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <img className="aspect-[3/2] rounded-lg shadow" src={circle.image} alt="" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{circle.name}</Heading>
              {/* <Badge color={circle.status === 'You Joined' ? 'lime' : 'zinc'}>{circle.status}</Badge> */}
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {/* {circle}  {circle.time} <span aria-hidden="true"></span> {circle.location} */}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {/* <Button outline>Edit</Button> */}
          <WalletProvider>
            <DepositFunds circleId={circle.id} currency='USDT' min={1} />
          </WalletProvider>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">

      </div>
      <Subheading className="mt-12">Leaderboard</Subheading>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
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
          {/* {circle.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  )
}
