import {Component, JSX} from "solid-js";

interface VolumeProps {
    volumePercentage: number;
    isMuted: boolean
}

function GetVolumeIcon(volumeProps: VolumeProps): JSX.Element {
    if(volumeProps.isMuted) return <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M768-90 661-197q-22 14-52.5 26.5T552-152v-74q12-5 28.5-11.5T608-250L480-378v187L288-383H144v-192h138L90-768l51-51 678 678-51 51Zm-6-209-52-52q16-29 25-61.5t9-66.5q0-89-53.5-158.5T552-733v-74q117 23 190.5 116T816-479q0 48-14 93.5T762-299ZM638-423l-86-86v-122q45 20 70.5 61.5T648-479q0 14-2 28t-8 28ZM480-581l-93-93 93-93v186Zm-72 216v-85l-72-72-18 19H216v48h102l90 90Zm-36-121Z"/></svg>

    if(volumeProps.volumePercentage < 25) {
        return <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M288-384v-192h144l192-192v576L432-384H288Zm72-72h102l90 90v-228l-90 90H360v48Zm100-24Z"/></svg>
    } else if(volumeProps.volumePercentage < 50) {
        return <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M240-384v-192h144l192-192v576L384-384H240Zm408 55v-302q46 19 71 61t25 90q0 48-25 89.5T648-329ZM504-594l-90 90H312v48h102l90 90v-228Zm-97 114Z"/></svg>
    } else {
        return <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M552-152v-75q86-23 139-93.26 53-70.25 53-159.5 0-89.24-53.5-158.74Q637-708 552-734v-75q116 25 190 117t74 211q0 119-73.5 211.5T552-152ZM144-385v-192h144l192-192v576L288-385H144Zm408 55v-302q45.12 20.4 70.56 61.2Q648-530 648-480.52q0 48.52-25.44 89.23Q597.12-350.59 552-330ZM408-595l-90 90H216v48h102l90 90v-228Zm-91 113Z"/></svg>
    }
}

export const VolumeIcon: Component<VolumeProps> = (props) => {
    return(
        <>
            {GetVolumeIcon(props)}
        </>
    )
}