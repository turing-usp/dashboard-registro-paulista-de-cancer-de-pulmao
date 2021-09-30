
import { FunctionComponent } from "react";
import SmartLink from "../SmartLink";

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
            <SmartLink
                href={info.link}
                className="p-4 mt-6 mx-1 text-left border w-80 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
                <h3 className="text-lg font-bold">{info.title} &rarr;</h3>
                <p className="mt-4 text-base">
                    {info.description}
                </p>
            </SmartLink>

        ))}
    </div>
)

export default Cards