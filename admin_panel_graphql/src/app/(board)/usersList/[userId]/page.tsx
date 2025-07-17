'use client'
import {useParams, useRouter} from "next/navigation";
import {UserProfile} from "@/features/UserProfile";
import {useEffect} from "react";

export default function UserPage() {
    const params = useParams()
    const router = useRouter()
    const userId = params.userId

    useEffect(() => {
        if (userId) {
            router.push(`${userId}`)
        }
    }, [userId, router])


    return (
        <div>
            <UserProfile/>
        </div>
    );
}
