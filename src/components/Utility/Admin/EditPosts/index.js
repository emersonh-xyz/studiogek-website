import { Card, Container, Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";



export default function EditPosts() {

    const getAllPosts = async () => {
        const results = await fetch('/api/posts/all')
            .then((res) => res.json())
            .catch((err) => alert(err))
        console.log(results.data)
        setPosts(results.data)
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    const [posts, setPosts] = useState([]);

    return (
        <Grid.Container>

            {posts.map((post) => {
                return (
                    <Grid>
                        <Card>
                            <p>{post.title}</p>
                        </Card>
                    </Grid>
                )
            })}

        </Grid.Container>
    )
}