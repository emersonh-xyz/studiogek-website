import { Loading, Grid } from "@nextui-org/react";

export default function LoadingSpinner() {
    return (
        <Grid.Container alignItems="center" justify="center" >
            <Grid>
                <Loading size="xl" type="points-opacity" />
            </Grid>
        </Grid.Container>
    )
}