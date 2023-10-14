import { css } from '@/styled-system/css'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

export default function Modal({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: ReactNode }) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog.Root>
    )
}

function ModalContent({ children }: { children: ReactNode }) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay
                className={css({
                    pos: 'fixed',
                    inset: '0',
                    bgColor: 'black/50',
                    h: '100vh',
                    w: '100vw'
                })}
            />
            <Dialog.Content
                className={css({
                    pos: 'fixed',
                    inset: '0',
                    minH: '100vh',
                    h: '100%',
                    w: '100vw',
                    maxW: '100vw',
                    overflowY: 'auto'
                    // height: `calc(100vw * ${ratio})`,
                })}
            >
                <div className={css({ p: '6', cursor: 'pointer', position: 'fixed', top: '0', right: '0', zIndex: 100 })}>
                    <Dialog.Close className={css({ cursor: 'pointer' })}>
                        <X size={36} weight="light" fill="foreground" />
                    </Dialog.Close>
                </div>

                {children}
            </Dialog.Content>
        </Dialog.Portal>
    )
}

Modal.Button = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent
