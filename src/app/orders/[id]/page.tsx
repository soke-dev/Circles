import { Avatar } from 'src/components/avatar'
import { Badge } from 'src/components/badge'
import { Button } from 'src/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from 'src/components/description-list'
import { Divider } from 'src/components/divider'
import { Heading, Subheading } from 'src/components/heading'
import { Link } from 'src/components/link'
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RefundOrder } from './refund'
import { getCircle } from '@/lib/circle'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let circle = await getCircle(params.id)

  return {
    title: circle.name && `Circle`,
  }
}

export default async function Order({ params }: { params: { id: string } }) {
  let cirle = await getCircle(params.id)

  if (!cirle) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/orders" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Transaction History
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Order #{cirle.id}</Heading>
          <Badge color="lime">Successful</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>US{cirle.totalSaved}</span>
            </span>

            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{(cirle.createdAt as any)?.toDate()}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <RefundOrder outline amount={cirle.totalSaved.toString()}>
              Refund
            </RefundOrder>
            <Button>Resend Invoice</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Summary</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Customer</DescriptionTerm>
          <DescriptionDetails>{cirle.name}</DescriptionDetails>
          <DescriptionTerm>Event</DescriptionTerm>
          <DescriptionDetails>
            <Link href={cirle.image} className="flex items-center gap-2">
              <Avatar src={cirle.image} className="size-6" />
              <span>{cirle.name}</span>
            </Link>
          </DescriptionDetails>
          <DescriptionTerm>Amount</DescriptionTerm>
          <DescriptionDetails>US{cirle.totalSaved}</DescriptionDetails>
          <DescriptionTerm>Amount after exchange rate</DescriptionTerm>
          <DescriptionDetails>
            US{cirle.totalSaved} &rarr; CA{cirle.totalSaved}
          </DescriptionDetails>
          <DescriptionTerm>Fee</DescriptionTerm>
          <DescriptionDetails>CA{cirle.totalSaved}</DescriptionDetails>
          <DescriptionTerm>Net</DescriptionTerm>
          <DescriptionDetails>CA{cirle.totalSaved}</DescriptionDetails>
        </DescriptionList>
      </div>

    </>
  )
}
