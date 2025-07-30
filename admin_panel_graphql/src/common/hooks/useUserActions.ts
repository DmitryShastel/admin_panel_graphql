'use client';
import { useState } from 'react';

export const useUserActions = () => {
    const [openActionModal, setOpenActionModal] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const handleOpenActionModal = (userId: string, event: React.MouseEvent) => {
        const buttonRect = event.currentTarget.getBoundingClientRect();
        setModalPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX
        });
        setOpenActionModal(openActionModal === userId ? null : userId);
        setSelectedUserId(Number(userId))
    };

    const closeActionModal = () => {
        setOpenActionModal(null);
    };

    return {
        openActionModal,
        modalPosition,
        selectedUserId,
        handleOpenActionModal,
        closeActionModal
    };
};