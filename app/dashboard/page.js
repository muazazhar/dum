"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Viewer } from "@/components/ui/avatar"
import { DetailsView, FileManagerComponent, NavigationPane, Toolbar, Inject } from '@syncfusion/ej2-react-filemanager';
import { useUserStore } from "@/lib/store"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { redirect } from 'next/navigation'
import { Progress } from "@/components/ui/progress"

import { useToast } from "@/components/ui/use-toast"

import { useState } from "react";
import { useRouter } from "next/navigation"
const baseURL = "http://127.0.0.1:5000"


export default function Home() {

    const [file, setFile] = useState()
    const [storage, setStorage] = useState(45)
    const [bandwidth, setBandwidth] = useState(15)
    const { toast } = useToast()
    const { user } = useUserStore()
    // const router = useRouter()
    const { push } = useRouter();
    console.clear()
    console.log("user", user);
    let hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    let ajaxSettings = {
        url: hostUrl + "api/FileManager/FileOperations",
        getImageUrl: hostUrl + "api/FileManager/GetImage"
    };
    const handleLogout = async () => {
        try {
            await fetch(`${baseURL}/logout`,).then(res => res.json())
                .then(json => {
                    console.log(' logout response.data.', json);
                    push('/',)

                })
        } catch (error) {
            console.log('error', error)
        }
    }
    async function uploadFile() {
        if (!file) toast({
            title: "Select a File",
            variant: "destructive",
            // description: "Select a File",
        })
        if (file?.size > 10099999) toast({
            title: "Too large file",
            variant: "destructive",
            description: "File size must be less than 10 mb",
        })
        var formdata = new FormData();
        formdata.append("files", file[0]);
        formdata.append("user_id", user.id);

        var requestOptions = { method: 'POST', body: formdata };

        const response = await fetch(`${baseURL}/upload_document`, requestOptions);
        const result = await response.text();
        console.log('result', result);
        console.log('file', file);
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-10 ">


            <Sheet>
                <SheetTrigger className="absolute right-20 top-10"><Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>My Account</SheetTitle>
                        <SheetDescription>
                            Account details are given below.
                        </SheetDescription>
                    </SheetHeader>


                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Name
                            </Label>
                            <Input id="name" value={user?.username} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-left">
                                Password
                            </Label>
                            <Input id="password" value="@peduarte" type="password" className="col-span-3" />
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save Changes</Button>
                            </SheetClose>
                        </SheetFooter>

                        <h3 className="scroll-m-20 text-base font-medium tracking-tight">
                            Usage Limits
                        </h3>
                        <h3 className="scroll-m-20 text-base font-normal tracking-tight">
                            {(user?.storage_used)}% storage used
                        </h3>
                        <Progress value={user?.storage_used} />
                        <h3 className="scroll-m-20 text-base font-normal tracking-tight">
                            {(user?.bandwidth_used)}% bandwidth used
                        </h3>
                        <Progress value={user?.bandwidth_used} />
                    </div>


                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" onClick={handleLogout}>Logout</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>


            <Breadcrumb className="p-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        {/* <Link
                            href="/home"
                        >Home</Link> */}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Bread</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            <div className="border-2 rounded border-blue-500 min-h-72 w-3/5">
                {/* <FileManagerComponent id="file" view="LargeIcons" ajaxSettings={ajaxSettings} >
                    <Inject services={[NavigationPane, DetailsView, Toolbar]} />
                </FileManagerComponent> */}
            </div>
            <div className="flex col items-center w-3/5 justify-between mt-5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="file">Select File</Label>
                    <Input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    {file ? <h4>{((file?.size / 1024) / 1024).toFixed(1)} mb</h4> : ''}
                </div>
                <Button variant="outline" onClick={uploadFile}>Upload</Button>
            </div >
        </main >
    );
}
