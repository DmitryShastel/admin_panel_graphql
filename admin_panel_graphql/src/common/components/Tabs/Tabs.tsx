import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import style from "./tabs.module.scss";

interface Tab {
    id: string;
    label: string;
    content?: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTabId?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs = [], defaultTabId }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id || '');

    // Синхронизация с URL при загрузке
    useEffect(() => {
        const tabFromUrl = searchParams.get('tab');
        if (tabFromUrl && tabs.some(tab => tab.id === tabFromUrl)) {
            setActiveTab(tabFromUrl);
        } else {
            // Если нет параметра в URL, устанавливаем дефолтную вкладку
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set('tab', defaultTabId || tabs[0]?.id || '');
            router.replace(`?${newSearchParams.toString()}`, { scroll: false });
        }
    }, [searchParams, tabs, defaultTabId, router]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Обновляем URL без перезагрузки страницы
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('tab', tabId);
        router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    };

    if (tabs.length === 0) return null;

    return (
        <div className={style.tabsContainer}>
            <div className={style.tabsHeader}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${style.tabButton} ${activeTab === tab.id ? style.active : ''}`}
                        onClick={() => handleTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {tabs.some(tab => tab.content) && (
                <div className={style.tabContent}>
                    {tabs.find(tab => tab.id === activeTab)?.content}
                </div>
            )}
        </div>
    );
};