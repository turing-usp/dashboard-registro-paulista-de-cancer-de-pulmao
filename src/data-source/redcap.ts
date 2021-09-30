import { csvParse, autoType } from 'd3-dsv'
import { promises as fs } from "fs";

export const redcapData = async (): Promise<RedcapRecord[]> => {
    const data = await fs.readFile('./data-source/data.csv')
    return csvParse(data.toString(), autoType)
}

let data: RedcapRecord[] | null = null
export const redcapCachedData = async (): Promise<RedcapRecord[]> => {
    if (data == null) {
        data = await redcapData()
    }
    return data
}

export type RedcapRecord = any
export default redcapCachedData