import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Reaction() {


    useEffect(() => {

    }, [])

    const router = useRouter();
    const { id } = router.query;

    return <div>Dynamic route with ID: {id}</div>;
}