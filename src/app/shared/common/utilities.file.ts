
export const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export class UtilitiesFile {

    static formatSize(bytes: number, decimals = 2): string {
        if (bytes === 0) {
            return '0 Byte';
        }

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }



    static base64ToArrayBuffer(base64): Uint8Array {
        const binaryString =  window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array( len );
        for (let i = 0; i < len; i++)        {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }


}
