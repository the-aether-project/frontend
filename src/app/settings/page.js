"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SettingsPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/settings/security');
    }, [router]);

    return null;
};

export default SettingsPage;