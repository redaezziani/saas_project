import { useState, useRef, useEffect, ReactNode } from "react"
import {
    KnockProvider,
    KnockFeedProvider,
    NotificationIconButton,
    NotificationFeedPopover,
} from "@knocklabs/react"
import { getUserSession } from "@/(auth)/lib/auth"

// Required CSS import, unless you're overriding the styling

const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState()

    const getUser = async () => {
        const user = await getUserSession()
        setCurrentUser(user)
    }

    useEffect(() => {
        getUser()
        console.log(currentUser)
    }, [])

    return (
        <KnockProvider
            apiKey={"pk_test_H2gr6rGfDjQXbcAJKzuVwzYiJ4ecPjcdS9bAOg99Kxg"}
            userId={"clwuxhcae0007i1c8hwy530is"}
        >
            <KnockFeedProvider feedId={"80c061c6-4895-43dd-b498-51cff3281754"}>
                {children}
            </KnockFeedProvider>
        </KnockProvider>
    )
}

export default NotificationProvider
