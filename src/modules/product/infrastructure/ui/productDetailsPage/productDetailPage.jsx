import {PageContainer} from "../shared/pageContainer.jsx";
import {useFindById} from "../useFindById.js";
import {ProductDetail} from "./productDetail.jsx";
import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {BreadCrumbContext} from "../../../../../App.jsx";

export const ProductDetailPage = () => {
    let {id} = useParams();
    const {productDetail} = useFindById(id);
    const {updateBreadcrumb} = useContext(BreadCrumbContext);

    useEffect(() => {
        updateBreadcrumb({id, label: productDetail?.fullName});
    }, [id, productDetail?.brand, productDetail?.model, updateBreadcrumb]);

    return (
        <PageContainer>
            <ProductDetail productDetail={productDetail}/>
        </PageContainer>
    );
}