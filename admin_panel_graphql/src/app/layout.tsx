'use client'
import {ReactNode} from 'react'
import '@/styles/_index.scss'
import Providers from "../app/providers"
import {Header} from "@/common/components/Header/Header";
import {AppSidebar} from "@/common/components/AppSidebar/AppSidebar";

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        {/*<Header/>*/}
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
