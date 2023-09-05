import writer from "./writer.js";
import reader from "./reader.js";

export const encode = (data) => {
    return writer(data);
}

export const decode = (data) => {
    return reader(data);
}
