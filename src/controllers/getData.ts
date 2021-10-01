import { Storage } from 'aws-amplify';
import init from './configure';

import { csvParse, autoType } from 'd3-dsv'

export type RedcapRecord = any
type S3Object = {
    Body: Blob
}

export const getRedcapS3 = async (): Promise<Blob> => {
    init();
    const s3Object = await Storage.get("redcap.csv", { download: true }) as S3Object;
    console.log(s3Object)
    return s3Object.Body
}

export const redcapData = async (): Promise<RedcapRecord[]> => {
    let redcapFileContent = sessionStorage.getItem('redcap');
    if (redcapFileContent == null) {
        const file = await getRedcapS3()
        redcapFileContent = await file.text()
    }
    const table: RedcapRecord[] = csvParse(redcapFileContent.toString(), autoType)
    return table
}