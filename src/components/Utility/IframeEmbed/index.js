import { Grid, Card } from "@nextui-org/react";

export default function IframeEmbed({ id }) {
    return (


        <Card isHoverable variant="bordered" css={{ m: 4 }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <style>
                    {`
                @media (max-width: 600px) {
                  iframe {
                    width: 100%;
                    height: 300px;
                  }
                }
              `}
                </style>
                <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed?listType=playlist&list=UUvdcBgHnd2WgJoP1irXxg1g${id ? `&index=${id}` : ""}&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </Card>





    )
}