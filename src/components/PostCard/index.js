import { Fragment } from "react";
import parse from 'html-react-parser';

export default function PostCard({ props }) {

    // props.attributes.title
    // props.attributes.content
    // props.attributes.tiers[]
    // props.attributes.url
    // props.attributes.published_at
    // props.id

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl m-10">
            <figure>

            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.attributes.title}</h2>
                {/* // TO:DO Match Tier to post before showing description.. */}
                <ul>
                    {parse(props.attributes.content)}
                </ul>



                <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-primary">View Now</button>
                </div>
                <p>{props.attributes.published_at}</p>
            </div>
        </div>
    )
}