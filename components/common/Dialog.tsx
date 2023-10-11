// 'use client'

// import { Dialog, Portal } from '@ark-ui/react'
// import { useState } from 'react'

// export type DialogProps = {}

// export const Dialog = (props: DialogProps) => {
//     const [isOpen, setIsOpen] = useState(false)
//     return (
//         <>
//             <button onClick={() => setIsOpen(true)}>Open Dialog</button>
//             <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
//                 <Portal>
//                     <Dialog.Backdrop />
//                     <Dialog.Container>
//                         <Dialog.Content>
//                             <Dialog.Title>Dialog Title</Dialog.Title>
//                             <Dialog.Description>Dialog Description</Dialog.Description>
//                             <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
//                         </Dialog.Content>
//                     </Dialog.Container>
//                 </Portal>
//             </Dialog.Root>
//         </>
//     )
// }
