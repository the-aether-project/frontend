"use client";
// This is a dynamic route page. The file name is wrapped in square brackets [] to indicate that it is a dynamic route.
import React,{use} from 'react'
import useSessionData from '@/hooks/useSessionData';
const Page = ({ params }) => {
    const unwrappedParams = use(params);
    const { session } = useSessionData();
    const checkUser = (username) => {
        if (username === session?.user?.name) {
            return true;
        } else {
            return false;
        }
    };

    const isUserMatch = checkUser(unwrappedParams.username);
    // check if the user who is accessing this page is the same as the username in the URL...If yes then give edit options else not.
    // its like watching other profiles on facebook/instagram and serve as profile page for the user who is logged in.
    return (
        <div>
            <h1>The profile is of {unwrappedParams.username} </h1>
            {isUserMatch ? <h1>Hey you can edit this page</h1> : <h1>Hey you can't edit this page</h1>}
        </div>
    )
}

export default Page
