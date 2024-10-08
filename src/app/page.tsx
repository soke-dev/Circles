import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOrders } from '@/data'

export function Stat({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}

export default async function Home() {
  let orders = await getRecentOrders()

  return (
    <>
      <Heading>Good afternoon, Soke</Heading>
      <div className="mt-8 flex items-end justify-between">
      <div> <Button>Connect Wallet</Button></div>
     
        <Subheading>Circles overview</Subheading>
        
        <div>
          
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
   
      

      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Circles Balance" value="$117,566" change="+4.5%" />
        <Stat title="Total Circles Created" value="55" change="+0.5%" />
        <Stat title="Total Cirle Members" value="239" change="+4.5%" />
        <Stat title="Your Total Saved" value="$589" change="+21.2%" />
      </div>
      <Subheading className="mt-14">Highest Savers</Subheading>
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
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              
                {/* <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div> */}
           
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
