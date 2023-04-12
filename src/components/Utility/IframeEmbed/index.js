import { Grid } from "@nextui-org/react";

export default function IframeEmbed({ id }) {
    return (
        <Grid>
            <iframe
                style={{ border: "2px solid" }}
                width="400"
                height="215"
                src={`https://www.youtube.com/embed?listType=playlist&list=UUvdcBgHnd2WgJoP1irXxg1g${id ? `&index=${id}` : ""}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        </Grid>

    )
}