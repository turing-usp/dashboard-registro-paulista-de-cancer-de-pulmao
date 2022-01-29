import { FunctionComponent } from "react";
import SmartLink from "../SmartLink";
import { Typography, Link, Box, Grid } from '@material-ui/core';

type CardsProps = {
    infos: {
        title: string,
        description: string,
        link: string
    }[]
}

const Cards: FunctionComponent<CardsProps> = ({ infos }) => (
    <div className="flex flex-wrap items-center align-top justify-around max-w-5xl mt-6 sm:w-full">
        {infos.map(info => (
            <Link
                underline="none"
                href={info.link}
            >
                <Typography color="primary" variant="h5">{info.title} &rarr;</Typography>
                <Typography color="secondary">
                    {info.description}
                </Typography>
            </Link>

        ))}
    </div>
)

export default Cards