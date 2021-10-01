import { csvParse, autoType } from 'd3-dsv'

export type RedcapRecord = any

export const getRedcapS3 = async (): Promise<string> => {
    return ""
}

export const redcapData = async (): Promise<RedcapRecord[]> => {
    let redcapFileContent = sessionStorage.getItem('redcap');
    if (redcapFileContent == null) {
        redcapFileContent = await getRedcapS3()
    }
    const table: RedcapRecord[] = csvParse(redcapFileContent.toString(), autoType)
    return table
}