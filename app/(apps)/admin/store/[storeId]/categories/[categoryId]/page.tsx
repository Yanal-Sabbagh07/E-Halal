import React from 'react';

import {getCategoryById} from "@/data/categories";
import {CreateUpdateCategoryForm} from "@/app/(apps)/admin/store/[storeId]/categories/[categoryId]/components/create-update-category-form";
import {getBillboardsByStoreId} from "@/data/billboard";

interface ICategoryPageProps {
    params: { storeId: string ,categoryId: string,  }
}

const CategoryPage = async ({params} : ICategoryPageProps) => {
    const category = await getCategoryById(params.categoryId);
    const storeBillboards = await getBillboardsByStoreId(params.storeId);
    return (
        <div className={"flex-col"}>
            <div className={"flex-1 space-y-4 pt-6 pb-6"}>
                {params.categoryId && <CreateUpdateCategoryForm billBoards={storeBillboards} storeId={params.storeId} category={category}/>}
            </div>
        </div>
    );
};

export default CategoryPage;
