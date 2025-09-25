import { getKeyStorage } from "./getKeyStorage";
// import { setKeyStorage } from "./setKeyStorage";

export function setProperty(id: number) {
  const propertys: number[] = getKeyStorage("property");
  if (propertys) {
    const findId = propertys.find((e) => e === id);
    if (!findId) {
      // setKeyStorage("property", [...propertys, id]);
    }
  } else {
    // setKeyStorage("property", [id]);
  }
}
