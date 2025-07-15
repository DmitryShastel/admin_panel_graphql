import { ComponentPropsWithoutRef, ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import styles from './radixModal.module.scss'

type RadixModalProps = {
    modalTitle?: ReactNode | string
    onClose: () => void
    open: boolean
    setIsModalInfo?: () => void
} & ComponentPropsWithoutRef<'div'>

export const RadixModal = ({
                               children,
                               modalTitle,
                               onClose,
                               open,
                               setIsModalInfo,
                               ...rest
                           }: RadixModalProps) => (
    <Dialog.Root onOpenChange={onClose} open={open} {...rest}>
        <Dialog.Trigger asChild />
        <Dialog.Portal>
            <Dialog.Overlay className={styles.Overlay} />
            <Dialog.Content
                className={styles.Content}
                onEscapeKeyDown={e => {
                    e.preventDefault() // Отменяем закрытие по ESC
                    if (setIsModalInfo) {
                        setIsModalInfo()
                    } // Показываем модальное окно подтверждения
                }}
                onPointerDownOutside={e => {
                    e.preventDefault() // Отменяем закрытие по клику вне модального окна
                    if (setIsModalInfo) {
                        setIsModalInfo()
                    } // Показываем модальное окно подтверждения
                }}
            >
                <Dialog.Title asChild className={styles.title}>
                    <div>{modalTitle}</div>
                </Dialog.Title>
                <Dialog.Description asChild className={styles.Description}>
                    <div>{children}</div>
                </Dialog.Description>
                <Dialog.Close asChild>
                    {typeof modalTitle === 'string' && (
                        <button className={styles.buttonClose}>
                            X
                        </button>
                    )}
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
)