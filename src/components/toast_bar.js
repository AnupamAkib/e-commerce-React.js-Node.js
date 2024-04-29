import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function msg(m, color, closeTime) {
    if (color === 'green') {
        toast.success(m, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: closeTime })
    }
    else if (color ==='red') {
        toast.error(m, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: closeTime })
    }
    else {
        toast.info(m, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: closeTime })
    }
}

export { msg };