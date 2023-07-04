import { Text, Spacer, Container } from "@nextui-org/react"
import { Box } from "./Box.js"
import PatreonContent from "@/components/Content/Patreon/index.js";
import YoutubeContent from "@/components/Content/Youtube/index.js";
import ArtContent from "@/components/Content/FanArt/index.js";

export const Content = () => (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>

        <Container lg gap={0}>

            <PatreonContent />

            {/*Lets just hide this section until I find a better fix*/}

            <YoutubeContent />

            <ArtContent />

            <Container gap={0} css={{ m: 0, p: 20, w: "100%" }}>
                <Text css={{ ta: "center" }}>© 2023 Studio Gek. All Rights Reserved.</Text>
            </Container>

        </Container>
    </Box>
);