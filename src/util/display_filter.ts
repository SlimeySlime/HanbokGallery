import { TYPE_TO_KOREAN } from "config/Config"
import { Gallery_Item } from "domain/gallery_item"
import { Rental_Item } from "domain/rental_item"

const CustomerFilteredHanbok = (hanbokList: Gallery_Item[], keyword: string) => {
    if (keyword === 'all') {
        return hanbokList
    }else if (keyword) {
        let filtered:Gallery_Item[] = []
        hanbokList?.map((item: Gallery_Item) => {
            if (item.customer_type?.includes(TYPE_TO_KOREAN(keyword))) {
                filtered.push(item)
            }
        })
        return filtered
    }else {
        return hanbokList
    }
}
const HanboknameFilteredHanbok = (hanbokList: Gallery_Item[], keyword: string) => {
    if (keyword) {
        let filtered:Gallery_Item[] = []
        hanbokList?.map((item: Gallery_Item) => {
            if (item.hanbok_name1?.includes(TYPE_TO_KOREAN(keyword)) || 
                item.hanbok_name2?.includes(TYPE_TO_KOREAN(keyword)) ||
                item.hanbok_name3?.includes(TYPE_TO_KOREAN(keyword)) ) {
                filtered.push(item)
            }
        })
        return filtered
    }else {
        return hanbokList
    }
}

const AVAILABLE_ITEM = (rentalItems: Rental_Item[]) => {
    const hanbokMap = new Map<string, Rental_Item>()    // Hanbok_Item -> Rental_Item
    rentalItems?.map((item) => {
        hanbokMap.set(item.hanbok_barcode!, item)
    })

    let unavailMap = new Map<string, Rental_Item>()
    rentalItems?.map((item) => {
        if (item.hanbok_barcode) {
            if (!unavailMap.has(item.hanbok_barcode) && item.hanbok_barcode) {
                unavailMap.set(item.hanbok_barcode, {
                    ...item,
                    count : 0
                })
            }
            let rental_item: Rental_Item = unavailMap.get(item.hanbok_barcode)!
            rental_item.count += 1
            rental_item.available = (rental_item.count >= rental_item.stock)
            unavailMap.set(item.hanbok_barcode, rental_item)
        }
    })
    return unavailMap
}

const AVAILABLE_GALLERY_ITEM = (rental_item_map: Map<string, Rental_Item>, gallery_item: Gallery_Item[]) => {
    // const filteredGalleryItem = CustomerFilteredHanbok(galleryData, type!)
    console.log('check gallery_item to filtered_list', gallery_item)
    const filtered_list = gallery_item?.map((hanbok) => {
        // TODO - barcode 1,2,3,4
        if (rental_item_map.has(hanbok.hanbok_barcode1)){   
            const rental_item = rental_item_map.get(hanbok.hanbok_barcode1)
            console.log(`item.${hanbok.hanbok_name1} is ${rental_item!.count} / ${rental_item!.stock }`)
            return {
                ...hanbok,
                unavailable : rental_item!.available
            }
        }else{
            console.log(`${hanbok.hanbok_name1} not in rental`)
            return {
                ...hanbok,
                unavailable : false
            } 
        }
    })
    return filtered_list
}

export { CustomerFilteredHanbok, HanboknameFilteredHanbok, AVAILABLE_ITEM, AVAILABLE_GALLERY_ITEM }