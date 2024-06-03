'use client';

import { NotificationFeedPopover, NotificationIconButton } from '@knocklabs/react'
import { useRef, useState } from 'react'
import React from 'react'
import NotificationProvider from "@/lib/providers/notifications";
const Notification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
  return (
    <>
    <NotificationProvider>
    <NotificationIconButton
        ref={notifButtonRef}
        onClick={(e) => setIsVisible(!isVisible)}
    />
    <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
    />
    </NotificationProvider>
</>
  )
}

export default Notification