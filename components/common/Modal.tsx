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
                    background: 'rgba(0 0 0 / 0.5)',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    display: 'grid',
                    placeItems: 'center',
                    overflowY: 'auto',
                })}
            >
                <Dialog.Content
                    className={css({
                        minH: '100vh',
                        maxW: '100vw',
                        pointerEvents: 'auto'
                    })}
                >
                    <div className={css({ p: '6', cursor: 'pointer', position: 'fixed', top: '0', right: '0', zIndex: 100 })}>
                        <Dialog.Close className={css({ cursor: 'pointer' })}>
                            <X size={36} weight="light" fill="foreground" />
                        </Dialog.Close>
                    </div>

                    {children}
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}

Modal.Button = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent
