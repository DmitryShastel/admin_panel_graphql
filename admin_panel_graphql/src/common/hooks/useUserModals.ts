'use client';
import { useState } from 'react';

export const useUserModals = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openBanModal, setOpenBanModal] = useState(false);
    const [openUnbanModal, setOpenUnbanModal] = useState(false);

    const handleOpenDeleteModal = (userId: number | null) => {
        setOpenDeleteModal(true);
    };

    const handleOpenBanModal = (userId: number | null) => {
        setOpenBanModal(true);
    };

    const handleOpenUnbanModal = (userId: number | null) => {
        setOpenUnbanModal(true);
    };

    const closeAllModals = () => {
        setOpenDeleteModal(false);
        setOpenBanModal(false);
        setOpenUnbanModal(false);
    };

    return {
        openDeleteModal,
        openBanModal,
        openUnbanModal,
        handleOpenDeleteModal,
        handleOpenBanModal,
        handleOpenUnbanModal,
        closeAllModals
    };
};