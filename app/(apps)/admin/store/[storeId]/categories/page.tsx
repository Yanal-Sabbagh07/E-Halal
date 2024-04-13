import React from 'react';
import {format} from "date-fns";
import {getCategoriesByStoreId} from "@/data/categories";
import {CategoryColumn} from "@/app/(apps)/admin/store/[storeId]/categories/components/coulumns";
import {getBillboardById} from "@/data/billboard";
import CategoryLoader from "@/app/(apps)/admin/store/[storeId]/categories/components/CategoryLoader";

interface BillboardPageProps {
    params: {
        storeId: string;
    }
}

const CategoriesPage = async ({params}: BillboardPageProps) => {

    const categories = await getCategoriesByStoreId(params.storeId);
    const formattedCategoris: CategoryColumn[] = [];
    if (categories) {
         await Promise.all(
            categories.map(async (item) => {
                const billboard = await getBillboardById(item.billboardId)
                formattedCategoris.push({
                    id: item.id,
                    name: item.name,
                    createdAt: format(item.createdAt, "do MMMM yyyy"),
                    billboard: billboard ? billboard.imageUrl : "",
                });
            }))
    }
    return (
        <div className={""}>
            <CategoryLoader category={formattedCategoris}/>
        </div>
    );

}
export default CategoriesPage;
