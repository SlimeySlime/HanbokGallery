

export interface Rental_Item {
    
    hanbok_id: string | null;
    hanbok_name: string | null;
    hanbok_type: string | null;
    hanbok_maker: string | null;
    hanbok_barcode: string | null;
    stock: number;

    customer_code: string | null;

    contract_date: string | null;
    event_date: string | null;
    rental_date: string | null;
    return_date: string | null;

    count: number;
    available: boolean;
} 