"use client";
import { ChangeEvent } from 'react';
import { Button } from 'src/components/button';
import { Checkbox, CheckboxField } from 'src/components/checkbox';
import { Divider } from 'src/components/divider';
import { Label } from 'src/components/fieldset';
import { Heading, Subheading } from 'src/components/heading';
import { Input } from 'src/components/input';
import { Select } from 'src/components/select';
import { Text } from 'src/components/text';
import { Textarea } from 'src/components/textarea';



// const isLoading = new Signal(false);


export default function CreateCirclePage() {

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.target);

    console.log(data);

    // isLoading.value = true;

    // const circle: Circle = new Circle({
    //   name: data.get('name') as string,
    //   description: data.get('bio') as string
    // })

    try {

    } catch (error) {

    }

    // isLoading.value = false;
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-4xl">
      <Heading>Create a circle </Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Circle Name</Subheading>
          <Text>Can be named after anything, Family, Organization etc</Text>
        </div>
        <div>
          <Input aria-label="Organization Name" name="name" defaultValue="My Circle" />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Short Description</Subheading>
          <Text>This will be displayed on your circle public profile. Maximum 240 characters.</Text>
        </div>
        <div>
          <Textarea aria-label="Organization Bio" name="bio" />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Circle type</Subheading>
          <Text>Tick if you want your circle to be public</Text>
        </div>
        <div className="space-y-4">
          {/* <Input type="email" aria-label="Organization Email" name="email" defaultValue="info@example.com" /> */}
          <CheckboxField>
            <Checkbox name="email_is_public" defaultChecked />
            <Label>Circle can be joined by anyone</Label>
          </CheckboxField>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Duration</Subheading>
          <Text>duration of the circle</Text>
        </div>
        <div>
          <Select aria-label="Organization Name" name="name" defaultValue="My Circle" >
            <option value="12">1 year</option>
            <option value="6">6 months</option>
            <option value="3">3 months</option>
          </Select>
        </div>
      </section>
      <Divider className="my-10" soft />


      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Min Deposit (USDT)</Subheading>
          <Text>min allowed to be deposited per</Text>
        </div>
        <div>
          <Input aria-label="Organization Name" name="name" defaultValue="1" required aria-required />
        </div>
      </section>

      <Divider className="my-10" soft />


      <div className="flex justify-end gap-4">
        <Button type="submit">Create Circle</Button>
      </div>
    </form>
  )
}
