import { Text, Spacer, Container } from "@nextui-org/react"
import { Box } from "./Box.js"
import PatreonContent from "@/components/Content/Patreon/index.js";
import YoutubeContent from "@/components/Content/Youtube/index.js";
import ArtContent from "@/components/Content/FanArt/index.js";

export const Content = () => (
    <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>

        <Container lg gap={0}>

            <PatreonContent />

            <YoutubeContent />

            <ArtContent />

        </Container>
    </Box>
);