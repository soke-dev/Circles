import { Badge } from 'src/components/badge'
import { Button } from 'src/components/button'
import { Divider } from 'src/components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from 'src/components/dropdown'
import { Heading } from 'src/components/heading'
import { Input, InputGroup } from 'src/components/input'
import { Link } from 'src/components/link'
import { Select } from 'src/components/select'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { getEvents } from '../data'
import { getAllCircles } from '@/lib/circle'

export const metadata: Metadata = {
  title: 'Events',
}

export default async function Events() {
  let circles = await getAllCircles(1, 10)
  console.log(circles[0])
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Circles</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search circles&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by joined</option>
                <option value="date">Sort by trending</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Create Circle</Button>
      </div>
      <ul className="mt-10">
        {circles.map((circle, index) => (
          <>
            <li key={circle.id}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={circle.id} className="flex gap-6 py-6">
                  <div className="w-32 shrink-0">
                    <Link href={"/circles/" + circle.id} aria-hidden="true">
                      <img className="aspect-[3/2] rounded-lg shadow" src={circle.image} alt="" />
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={"/circles/" + circle.id}>{circle.name ?? circle.id}</Link>
                    </div>
                    <div className="text-xs/6 text-zinc-500">
                      {circle.description}
                    </div>
                    <div className="text-xs/6 text-zinc-600">
                      {/* {event.ticketsSold}{event.ticketsAvailable} */}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button color={'lime'}>
                    Join
                  </Button>

                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  )
}
