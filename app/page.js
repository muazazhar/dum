"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import Link from "next/link"
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { useUserStore } from "@/lib/store"
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const baseURL = "http://127.0.0.1:5000"

export default function Home() {
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter()
  const { user, setUser } = useUserStore()
  useEffect(() => {
    console.log('user', user);
    if (user != null) router.push('/dashboard', { scroll: false })
  }, [user])

  // const { data, error } = useSWR('http://127.0.0.1:5000/test', fetcher)
  // console.log(data,)

  const handleSignup = async () => {
    console.log('data', password, username)
    try {
      await fetch(`${baseURL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password,
          username: username
        })
      }).then(res => res.json())
        .then(json => {
          console.log(' register response.data.', json);
          setUser(json.user)
          setPassword('')
          setUsername('')
          // setUser(json.user)
          router.push('/dashboard', { scroll: false })

        })
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSignin = async () => {
    console.log('data', password, username)
    try {
      await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password,
          username: username
        })
      }).then(res => res.json())
        .then(json => {
          console.log(' login response.data.', json);
          setUser(json.user)

          setPassword('')
          setUsername('')
          router.push('/dashboard', { scroll: false })
        })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">

      <h1 className="text-4xl font-semibold">Cloud Storage solution for easy access to your content</h1>
      <div className="flex items-center justify-between w-1/4 py-8">

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="absolute right-10 top-10">Admin</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
              <DialogDescription>
                Enter you account details to Login.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" type="text" className="col-span-3" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right" >
                  Password
                </Label>
                <Input id="password" className="col-span-3" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" />
              </div>
            </div>
            <DialogFooter>
              <Link
                href="/admin"
              >
                <Button type="submit">Login
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Sign In</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
              <DialogDescription>
                Enter you account details to Login.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" type="email" className="col-span-3" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right" >
                  Password
                </Label>
                <Input id="password" className="col-span-3" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSignin}>Login</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Sign Up</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign Up</DialogTitle>
              <DialogDescription>
                Enter your details to create account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">

              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="username" value={username} className="col-span-3" onChange={(e) => setName(e.target.value)} placeholder="Name" />
              </div> */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Username
                </Label>
                <Input id="name" type="text" className="col-span-3" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right" >
                  Password
                </Label>
                <Input id="password" className="col-span-3" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" />
              </div>
            </div>
            <DialogFooter>
              {/* <Link
                href="/home"
              > */}
              <Button type="submit" onClick={handleSignup}>
                Create account</Button>
              {/* </Link> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
