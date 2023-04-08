import { TYPE_TO_KOREAN } from "config/Config"
import { Gallery_Item } from "domain/gallery_item"



const FilteredHanbok = (hanbokList: Gallery_Item[], keyword: string) => {
    if (keyword === 'all') {
        return hanbokList
    }else if (keyword) {
        let filtered:Gallery_Item[] = []
        hanbokList.map((item: Gallery_Item) => {
            if (item.customer_type?.includes(TYPE_TO_KOREAN(keyword))) {
                filtered.push(item)
            }
        })
        return filtered
    }else {
        return hanbokList
    }
}

export { FilteredHanbok }