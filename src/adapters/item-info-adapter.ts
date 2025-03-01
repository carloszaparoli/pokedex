import { ItemInfoResponse } from "@/types/api-response";
import { ItemInfo } from "@/types/pokemon";

export const itemInfoAdapter = (response: ItemInfoResponse): ItemInfo => {
  return {
    name: response.name,
    image: response.sprites.default,
  };
};
