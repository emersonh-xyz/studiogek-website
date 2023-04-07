export default function PostCard({ props, tiers }) {

    // props.attributes.title
    // props.attributes.content
    // props.attributes.tiers[]
    // props.attributes.url
    // props.attributes.published_at
    // props.id

    return (
        <div className="">
            <div className="card card-compact w-96 bg-base-100 shadow-xl m-10">
                <figure>
                    <img src="https://c10.patreonusercontent.com/4/patreon-media/p/post/81175747/33e7d94bddc146a3bbae9830e87960ff/eyJ3Ijo2MjB9/1.png?token-time=1682121600&token-hash=NKmgz6PUSAXPkBra-ffqW2hzGKL5o9NWjRv4kKP0kxI%3D" alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{props.attributes.title}</h2>
                    {/* // TO:DO Match Tier to post before showing description.. */}
                    {/* <p>{props.attributes.content}</p> */}
                    {props.attributes.tiers > 0 ?
                        <p>You must be tier #<span className="font-bold">{props.attributes.tiers}</span> to view this post</p>
                        :
                        <p>{props.attributes.content}</p>
                    }

                    <div className="card-actions justify-end">
                        <button className="btn btn-sm btn-primary">View Now</button>
                    </div>
                    <p>{props.attributes.published_at}</p>
                </div>
            </div>
        </div >
    )
}