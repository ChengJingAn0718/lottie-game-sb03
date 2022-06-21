import { prePathUrl } from "../components/CommonFunctions";
import { audioPrifix } from "../components/CommonVariants"

const loadSound = (name, isEffectSound = false) => {
    return new Audio(prePathUrl() + "sounds/" + (isEffectSound ? "effect/" : "main/") + name + ".mp3")
}

export default loadSound

export const returnAudioPath = (name, folderName = null) => {
    return prePathUrl() + "sounds/main/" + (folderName != null ? (folderName + '/') : '') + audioPrifix + name + ".mp3"
}