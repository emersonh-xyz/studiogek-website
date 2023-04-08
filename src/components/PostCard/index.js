import { Fragment } from "react";
import parse from 'html-react-parser';
import { useRouter } from "next/router";

export default function PostCard({ props }) {

    // props.attributes.title
    // props.attributes.content
    // props.attributes.tiers[]
    // props.attributes.url
    // props.attributes.published_at
    // props.id

    const router = useRouter();

    function getDate() {
        const pastDate = new Date(props.attributes.published_at);
        const timeSince = Date.now() - pastDate.getTime();
        const seconds = Math.floor(timeSince / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `Posted ${days} day${days > 1 ? 's' : ''} and ${hours % 24} hour${hours % 24 > 1 ? 's' : ''} ago`;
        } else {
            return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
    }


    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl m-10">
            <figure>

            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.attributes.title}</h2>
                {/* // TO:DO Match Tier to post before showing description.. */}

                {parse(props.attributes.content)}

                {getDate()}


                <div className="card-actions justify-end">
                    <button onClick={() => {
                        router.push({
                            pathname: '/post/[pid]',
                            query: { pid: props.id }
                        })
                    }}
                        className="btn btn-sm ">Read More</button>
                </div>

            </div>
        </div>
    )
}